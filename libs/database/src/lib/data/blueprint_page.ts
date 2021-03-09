import { blueprint_page } from "@prisma/client";
import { join, raw, sqltag } from "@prisma/client/runtime";
import { getBlueprintImageRequestTopic } from "../gcp-pubsub";
import { prisma } from "../postgres/database";
import { BlueprintPage, ChildTree } from "@factorio-sites/types";
import { getBlueprintBookById } from "./blueprint_book";
import {
  getAllBlueprintsFromChildTree,
  getFirstBlueprintFromChildTree,
} from "@factorio-sites/node-utils";

const mapBlueprintPageEntityToObject = (entity: blueprint_page): BlueprintPage => ({
  id: entity.id,
  blueprint_id: entity.blueprint_id ?? null,
  blueprint_book_id: entity.blueprint_book_id ?? null,
  title: entity.title,
  description_markdown: entity.description_markdown || "",
  tags: entity.tags,
  image_hash: entity.image_hash,
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  factorioprints_id: entity.factorioprints_id ?? null,
  favorite_count: (entity as any).favorite_count || null,
});

export async function getBlueprintPageById(id: string): Promise<BlueprintPage | null> {
  const result = await prisma.blueprint_page.findUnique({ where: { id } });
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getBlueprintPageByUserId(user_id: string): Promise<BlueprintPage[] | null> {
  const results = await prisma.blueprint_page.findMany({ where: { user_id } });
  return results ? results.map((result) => mapBlueprintPageEntityToObject(result)) : null;
}

export async function getBlueprintPageByFactorioprintsId(
  id: string
): Promise<BlueprintPage | null> {
  const result = await prisma.blueprint_page.findFirst({ where: { factorioprints_id: id } });
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function searchBlueprintPages({
  page = 1,
  perPage = 10,
  query,
  order,
  tags,
  entities,
  items,
  recipes,
}: {
  page: number;
  perPage: number;
  query?: string;
  order: "date" | "favorites" | string;
  tags?: string[];
  entities?: string[];
  items?: string[];
  recipes?: string[];
}): Promise<{ count: number; rows: BlueprintPage[] }> {
  const orderMap: Record<string, string> = {
    date: "blueprint_page.updated_at",
    favorites: "favorite_count",
  };

  const blueprintDataSearch =
    entities || items || recipes
      ? sqltag`LEFT JOIN blueprint ON blueprint.id = ANY(blueprint_page.blueprint_ids) OR blueprint.id = blueprint_page.blueprint_id`
      : sqltag``;
  const entitiesFragment = entities
    ? sqltag`AND blueprint.data -> 'entities' ?& array[${join(entities)}::text]`
    : sqltag``;
  const itemsFragment = items
    ? sqltag`AND blueprint.data -> 'items' ?& array[${join(items)}::text]`
    : sqltag``;
  const recipesFragment = recipes
    ? sqltag`AND blueprint.data -> 'recipes' ?& array[${join(recipes)}::text]`
    : sqltag``;
  const tagsFragment = tags
    ? sqltag`AND blueprint_page.tags @> array[${join(tags)}::varchar]`
    : sqltag``;

  const result = (
    await prisma.$queryRaw<(blueprint_page & { favorite_count: number })[]>`
      SELECT DISTINCT blueprint_page.*, (SELECT COUNT(*) FROM user_favorites where user_favorites.blueprint_page_id = blueprint_page.id) AS favorite_count
      FROM public.blueprint_page
      ${blueprintDataSearch}
      WHERE blueprint_page.title ILIKE ${query ? `%${query}%` : "%"}
      ${entitiesFragment}
      ${itemsFragment}
      ${recipesFragment}
      ${tagsFragment}
      ORDER BY ${raw(orderMap[order] || orderMap.date)} DESC
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
  ).map((blueprintPage) => ({
    ...blueprintPage,
    created_at: new Date(blueprintPage.created_at),
    updated_at: new Date(blueprintPage.updated_at),
  }));

  const countResult = await prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(DISTINCT blueprint_page.id)
      FROM public.blueprint_page
      ${blueprintDataSearch}
      WHERE blueprint_page.title ILIKE ${query ? `%${query}%` : "%"}
      ${entitiesFragment}
      ${itemsFragment}
      ${recipesFragment}
      ${tagsFragment}`;

  return {
    count: countResult[0].count,
    rows: result.map(mapBlueprintPageEntityToObject),
  };
}

export async function createBlueprintPage(
  type: "blueprint" | "blueprint_book",
  targetId: string,
  data: {
    title: string;
    user_id: string | null;
    description_markdown: string;
    tags?: string[];
    image_hash: string;
    created_at?: number;
    updated_at?: number;
    child_tree?: ChildTree;
    factorioprints_id?: string;
  }
) {
  const page = await prisma.blueprint_page.create({
    data: {
      user_id: data.user_id,
      title: data.title,
      description_markdown: data.description_markdown,
      factorioprints_id: data.factorioprints_id,
      blueprint_id: type === "blueprint" ? targetId : undefined,
      blueprint_book_id: type === "blueprint_book" ? targetId : undefined,
      blueprint_ids: data.child_tree ? getAllBlueprintsFromChildTree(data.child_tree) : [],
      tags: data.tags ? data.tags : [],
      image_hash: data.image_hash,
      updated_at: data.updated_at ? new Date(data.updated_at * 1000) : new Date(),
      created_at: data.created_at ? new Date(data.created_at * 1000) : new Date(),
    },
  });

  const blueprintImageRequestTopic = getBlueprintImageRequestTopic();
  if (blueprintImageRequestTopic) {
    if (type === "blueprint") {
      blueprintImageRequestTopic.publishJSON({
        blueprintId: targetId,
      });
    } else if (data.child_tree) {
      const firstBlueprintId = getFirstBlueprintFromChildTree(data.child_tree);
      blueprintImageRequestTopic.publishJSON({
        blueprintId: firstBlueprintId,
      });
    }
  }

  console.log(`Created Blueprint Page`);
  return page;
}

export async function editBlueprintPage(
  blueprintPageId: string,
  type: "blueprint" | "blueprint_book",
  targetId: string,
  extraInfo: {
    title: string;
    user_id: string | null;
    description_markdown: string;
    tags?: string[];
    created_at?: number;
    updated_at?: number;
    factorioprints_id?: string;
  }
) {
  const page = await prisma.blueprint_page.update({
    where: { id: blueprintPageId },
    data: {
      user_id: extraInfo.user_id,
      title: extraInfo.title,
      description_markdown: extraInfo.description_markdown,
      factorioprints_id: extraInfo.factorioprints_id,
      blueprint_id: type === "blueprint" ? targetId : null,
      blueprint_book_id: type === "blueprint_book" ? targetId : null,
      tags: extraInfo.tags ? extraInfo.tags : [],
      updated_at: extraInfo.updated_at ? new Date(extraInfo.updated_at * 1000) : new Date(),
      created_at: extraInfo.created_at ? new Date(extraInfo.created_at * 1000) : new Date(),
    },
  });

  console.log(`Updated Blueprint Page`);
  return page;
}
