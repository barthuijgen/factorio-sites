import { BlueprintBookData } from "@factorio-sites/common-utils";
import { encodeBlueprint, hashString } from "@factorio-sites/node-utils";
import { saveBlueprintString } from "../gcp-storage";
import { BlueprintBookModel, BlueprintBookInstance } from "../postgres/models";
import { BlueprintBook, ChildTree } from "../types";
import { createBlueprint } from "./blueprint";

const mapBlueprintBookEntityToObject = (entity: BlueprintBookInstance): BlueprintBook => ({
  id: entity.id,
  // blueprint_ids: entity.blueprint_ids.map((key: any) => key.id),
  // blueprint_book_ids: entity.blueprint_book_ids.map((key: any) => key.id),
  child_tree: entity.child_tree ? entity.child_tree : [],
  blueprint_hash: entity.blueprint_hash,
  label: entity.label,
  description: entity.description,
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  is_modded: entity.is_modded || false,
  factorioprints_id: entity.factorioprints_id,
});

export async function getBlueprintBookById(id: string): Promise<BlueprintBook | null> {
  const result = await BlueprintBookModel.findByPk(id).catch(() => null);
  return result ? mapBlueprintBookEntityToObject(result) : null;
}

export async function getBlueprintBookByHash(hash: string): Promise<BlueprintBook | null> {
  const result = await BlueprintBookModel.findOne({
    where: { blueprint_hash: hash },
  }).catch(() => null);
  return result ? mapBlueprintBookEntityToObject(result) : null;
}

export async function createBlueprintBook(
  blueprintBook: BlueprintBookData,
  extraInfo: {
    tags: string[];
    created_at?: number;
    updated_at?: number;
    factorioprints_id?: string;
  }
): Promise<{ insertedId: string; child_tree: ChildTree }> {
  const string = await encodeBlueprint({ blueprint_book: blueprintBook });
  const blueprint_hash = hashString(string);

  const exists = await getBlueprintBookByHash(blueprint_hash);
  if (exists) {
    const book = await getBlueprintBookById(exists.id);
    if (!book) throw Error("this is impossible, just pleasing typescript");
    return { insertedId: exists.id, child_tree: book.child_tree };
  }

  // Write string to google storage
  await saveBlueprintString(blueprint_hash, string);

  const blueprint_ids = [];
  const blueprint_book_ids = [];
  const child_tree: ChildTree = [];

  // Create the book's child objects
  for (let i = 0; i < blueprintBook.blueprints.length; i++) {
    const blueprint = blueprintBook.blueprints[i];
    if (blueprint.blueprint) {
      const result = await createBlueprint(blueprint.blueprint, extraInfo);
      child_tree.push({
        type: "blueprint",
        id: result.insertedId,
        name: blueprint.blueprint.label,
      });
      blueprint_ids.push(result.insertedId);
    } else if (blueprint.blueprint_book) {
      const result = await createBlueprintBook(blueprint.blueprint_book, extraInfo);
      child_tree.push({
        type: "blueprint_book",
        id: result.insertedId,
        name: blueprint.blueprint_book.label,
        children: result.child_tree,
      });
      blueprint_book_ids.push(result.insertedId);
    }
  }

  const result = await BlueprintBookModel.create({
    label: blueprintBook.label,
    description: blueprintBook.description,
    blueprint_hash: blueprint_hash,
    factorioprints_id: extraInfo.factorioprints_id,
    is_modded: false,
    child_tree,
    updated_at: extraInfo.updated_at ? new Date(extraInfo.updated_at * 1000) : undefined,
    created_at: extraInfo.created_at ? new Date(extraInfo.created_at * 1000) : undefined,
  });

  console.log(`Created Blueprint book ${result.id}`);

  return { insertedId: result.id, child_tree };
}
