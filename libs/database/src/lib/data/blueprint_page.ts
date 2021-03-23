import { blueprint_page, user } from "@prisma/client";
import { join, raw, Sql, sqltag } from "@prisma/client/runtime";
import { getBlueprintImageRequestTopic } from "../gcp-pubsub";
import { prisma } from "../postgres/database";
import { BlueprintPage, ChildTree } from "@factorio-sites/types";
import {
  getAllBlueprintsFromChildTree,
  getFirstBlueprintFromChildTree,
} from "@factorio-sites/node-utils";

const mapBlueprintPageEntityToObject = (
  entity: blueprint_page,
  user?: Pick<user, "id" | "username"> | null
): BlueprintPage => ({
  id: entity.id,
  blueprint_id: entity.blueprint_id ?? null,
  blueprint_book_id: entity.blueprint_book_id ?? null,
  user_id: entity.user_id,
  title: entity.title,
  description_markdown: entity.description_markdown || "",
  tags: entity.tags,
  image_hash: entity.image_hash,
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  factorioprints_id: entity.factorioprints_id ?? null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favorite_count: (entity as any).favorite_count || (entity as any).user_favorites?.length || 0,
  user: user ? { id: user.id, username: user.username } : null,
});

export async function getBlueprintPageById(id: string): Promise<BlueprintPage | null> {
  const result = await prisma.blueprint_page.findUnique({ where: { id } });
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getBlueprintPageByUserId(user_id: string): Promise<BlueprintPage[] | null> {
  const results = await prisma.blueprint_page.findMany({ where: { user_id } });
  return results ? results.map((result) => mapBlueprintPageEntityToObject(result)) : null;
}

export async function getBlueprintPageWithUserById(id: string): Promise<BlueprintPage | null> {
  // TODO: the user_favorites join is inefficient because it's only for counting
  // https://github.com/prisma/prisma/issues/5079
  const result = await prisma.blueprint_page.findUnique({
    where: { id },
    include: { user: true, user_favorites: true },
  });
  return result ? mapBlueprintPageEntityToObject(result, result.user) : null;
}

export async function getBlueprintPageByFactorioprintsId(
  id: string
): Promise<BlueprintPage | null> {
  const result = await prisma.blueprint_page.findFirst({ where: { factorioprints_id: id } });
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getUserFavoriteBlueprintPages(user_id: string) {
  const result = await prisma.blueprint_page.findMany({
    where: {
      user_favorites: {
        some: {
          user_id: user_id,
        },
      },
    },
  });
  return result ? result.map((row) => mapBlueprintPageEntityToObject(row)) : [];
}

export async function searchBlueprintPages({
  page = 1,
  perPage = 10,
  query,
  order,
  mode = "AND",
  tags,
  entities,
  items,
  recipes,
  user,
  absolute_snapping,
}: {
  page: number;
  perPage: number;
  query?: string;
  order: "date" | "favorites" | string;
  mode: "AND" | "OR";
  tags?: string[];
  entities?: string[];
  items?: string[];
  recipes?: string[];
  user?: string;
  absolute_snapping?: boolean;
}): Promise<{ count: number; rows: BlueprintPage[] }> {
  const orderMap: Record<string, string> = {
    date: "blueprint_page.updated_at",
    favorites: "favorite_count",
  };

  const conditionals: Sql[] = [];
  const joins: Sql[] = [];
  let requires_blueprint_join = false;

  if (query) {
    conditionals.push(sqltag`blueprint_page.title ILIKE ${`%${query}%`}`);
  }
  if (entities) {
    const matchSql = mode === "AND" ? sqltag`?&` : sqltag`?|`;
    conditionals.push(
      sqltag`blueprint.data -> 'entities' ${matchSql} array[${join(entities)}::text]`
    );
    requires_blueprint_join = true;
  }
  if (items) {
    const matchSql = mode === "AND" ? sqltag`?&` : sqltag`?|`;
    conditionals.push(sqltag`blueprint.data -> 'items' ${matchSql} array[${join(items)}::text]`);
    requires_blueprint_join = true;
  }
  if (recipes) {
    const matchSql = mode === "AND" ? sqltag`?&` : sqltag`?|`;
    conditionals.push(
      sqltag`blueprint.data -> 'recipes' ${matchSql} array[${join(recipes)}::text]`
    );
    requires_blueprint_join = true;
  }
  if (tags) {
    const matchSql = mode === "AND" ? sqltag`@>` : sqltag`&&`;
    conditionals.push(sqltag`blueprint_page.tags ${matchSql} array[${join(tags)}::varchar]`);
  }
  if (user) {
    conditionals.push(sqltag`blueprint_page.user_id = ${user}`);
  }
  if (absolute_snapping) {
    conditionals.push(sqltag`(blueprint.data -> 'absolute_snapping')::boolean = true`);
    requires_blueprint_join = true;
  }
  if (requires_blueprint_join) {
    joins.push(
      sqltag`LEFT JOIN blueprint ON blueprint.id = ANY(blueprint_page.blueprint_ids) OR blueprint.id = blueprint_page.blueprint_id`
    );
  }

  const joinsFragment = joins.length ? sqltag`${join(joins)}` : sqltag``;
  const conditionalFragment = conditionals.length
    ? sqltag`WHERE ${join(conditionals, ` ${mode} `)}`
    : sqltag``;

  try {
    const result = (
      await prisma.$queryRaw<(blueprint_page & { favorite_count: number })[]>`
        SELECT DISTINCT blueprint_page.*, (SELECT COUNT(*) FROM user_favorites where user_favorites.blueprint_page_id = blueprint_page.id) AS favorite_count
        FROM public.blueprint_page
        ${joinsFragment}
        ${conditionalFragment}
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
        ${joinsFragment}
        ${conditionalFragment}`;

    return {
      count: countResult[0].count,
      rows: result.map((row) => mapBlueprintPageEntityToObject(row)),
    };
  } catch (err) {
    console.error(err);
    return {
      count: 0,
      rows: [],
    };
  }
}

export async function createBlueprintPage(
  type: "blueprint" | "blueprint_book",
  targetId: string,
  data: {
    title: string;
    user_id?: string;
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
      user_id: data.user_id || null,
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
    user_id?: string;
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
      user_id: extraInfo.user_id || null,
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

export async function deleteBlueprintPage(blueprintPageId: string) {
  const result = await prisma.blueprint_page.delete({ where: { id: blueprintPageId } });

  return result;
}
