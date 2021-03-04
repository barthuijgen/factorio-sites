import { blueprint_page } from "@prisma/client";
import { prisma } from "../postgres/database";
import { BlueprintPage } from "../types";

const mapBlueprintPageEntityToObject = (entity: blueprint_page): BlueprintPage => ({
  id: entity.id,
  blueprint_id: entity.blueprint_id ?? null,
  blueprint_book_id: entity.blueprint_book_id ?? null,
  title: entity.title,
  description_markdown: entity.description_markdown || "",
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  factorioprints_id: entity.factorioprints_id ?? null,
  favorite_count: (entity as any).favorite_count || null,
});

export async function getBlueprintPageById(id: string): Promise<BlueprintPage | null> {
  const result = await prisma().blueprint_page.findUnique({ where: { id } });
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getBlueprintPageByUserId(user_id: string): Promise<BlueprintPage[] | null> {
  const results = await prisma().blueprint_page.findMany({ where: { user_id } });
  return results ? results.map((result) => mapBlueprintPageEntityToObject(result)) : null;
}

export async function getBlueprintPageByFactorioprintsId(
  id: string
): Promise<BlueprintPage | null> {
  const result = await prisma().blueprint_page.findFirst({ where: { factorioprints_id: id } });
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getMostRecentBlueprintPages({
  page = 1,
  perPage = 10,
  query,
  order,
}: {
  page: number;
  perPage: number;
  query?: string;
  order: "date" | "favorites" | string;
}): Promise<{ count: number; rows: BlueprintPage[] }> {
  const orderMap: Record<string, string> = {
    date: "updated_at",
    favorites: "favorite_count",
  };
  const result = (
    await prisma().$queryRaw<(blueprint_page & { favorite_count: number })[]>(
      `SELECT *, (SELECT COUNT(*) FROM user_favorites where user_favorites.blueprint_page_id = blueprint_page.id) AS favorite_count
       FROM public.blueprint_page
       WHERE blueprint_page.title ILIKE $1
       ORDER BY ${orderMap[order] || orderMap.date} DESC
       LIMIT $2 OFFSET $3`,
      query ? `%${query}%` : "%",
      perPage,
      (page - 1) * perPage
    )
  ).map((blueprintPage) => ({
    ...blueprintPage,
    created_at: new Date(blueprintPage.created_at),
    updated_at: new Date(blueprintPage.updated_at),
  }));

  return {
    count: result.length,
    rows: result.map(mapBlueprintPageEntityToObject),
  };
}

export async function createBlueprintPage(
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
  const page = await prisma().blueprint_page.create({
    data: {
      user_id: extraInfo.user_id,
      title: extraInfo.title,
      description_markdown: extraInfo.description_markdown,
      factorioprints_id: extraInfo.factorioprints_id,
      blueprint_id: type === "blueprint" ? targetId : undefined,
      blueprint_book_id: type === "blueprint_book" ? targetId : undefined,
      tags: extraInfo.tags ? extraInfo.tags : [],
      updated_at: extraInfo.updated_at ? new Date(extraInfo.updated_at * 1000) : new Date(),
      created_at: extraInfo.created_at ? new Date(extraInfo.created_at * 1000) : new Date(),
    },
  });

  console.log(`Created Blueprint Page`);
  return page;
}
