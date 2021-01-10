import { BlueprintPageModel, BlueprintPageInstance } from "../postgres/models";
import { BlueprintPage } from "../types";

const mapBlueprintPageEntityToObject = (entity: BlueprintPageInstance): BlueprintPage => ({
  id: entity.id,
  blueprint_id: entity.blueprint_id ?? null,
  blueprint_book_id: entity.blueprint_book_id ?? null,
  title: entity.title,
  description_markdown: entity.description_markdown,
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  factorioprints_id: entity.factorioprints_id ?? null,
});

export async function getBlueprintPageById(id: string): Promise<BlueprintPage | null> {
  const result = await BlueprintPageModel.findByPk(id).catch(() => null);
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getBlueprintPageByFactorioprintsId(
  id: string
): Promise<BlueprintPage | null> {
  const result = await BlueprintPageModel.findOne({
    where: { factorioprints_id: id },
  }).catch(() => null);
  return result ? mapBlueprintPageEntityToObject(result) : null;
}

export async function getMostRecentBlueprintPages(page = 1): Promise<BlueprintPage[]> {
  const perPage = 10;
  const result =
    (await BlueprintPageModel.findAll({
      order: [["updated_at", "DESC"]],
      limit: perPage,
      offset: (page - 1) * perPage,
      raw: true,
    }).catch(() => null)) || [];
  return result.map(mapBlueprintPageEntityToObject);
}

export async function createBlueprintPage(
  type: "blueprint" | "blueprint_book",
  targetId: string,
  extraInfo: {
    title: string;
    description_markdown: string;
    created_at?: number;
    updated_at?: number;
    factorioprints_id?: string;
  }
) {
  await BlueprintPageModel.create({
    title: extraInfo.title,
    description_markdown: extraInfo.description_markdown,
    factorioprints_id: extraInfo.factorioprints_id,
    blueprint_id: type === "blueprint" ? targetId : undefined,
    blueprint_book_id: type === "blueprint_book" ? targetId : undefined,
    updated_at: extraInfo.updated_at ? new Date(extraInfo.updated_at * 1000) : undefined,
    created_at: extraInfo.created_at ? new Date(extraInfo.created_at * 1000) : undefined,
  });

  console.log(`Created Blueprint Page`);
}
