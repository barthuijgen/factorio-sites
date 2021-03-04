import { BlueprintBookData } from "@factorio-sites/common-utils";
import { encodeBlueprint, hashString } from "@factorio-sites/node-utils";
import { blueprint_book } from "@prisma/client";
import { saveBlueprintString } from "../gcp-storage";
import { prisma } from "../postgres/database";
import { BlueprintBook, ChildTree } from "../types";
import { createBlueprint } from "./blueprint";

const mapBlueprintBookEntityToObject = (entity: blueprint_book): BlueprintBook => ({
  id: entity.id,
  child_tree: entity.child_tree ? (entity.child_tree as any) : [],
  blueprint_hash: entity.blueprint_hash,
  label: entity.label || "",
  description: entity.description || "",
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  is_modded: entity.is_modded || false,
});

export async function getBlueprintBookById(id: string): Promise<BlueprintBook | null> {
  const result = await prisma().blueprint_book.findUnique({ where: { id } });
  return result ? mapBlueprintBookEntityToObject(result) : null;
}

export async function getBlueprintBookByHash(hash: string): Promise<BlueprintBook | null> {
  const result = await prisma().blueprint_book.findUnique({ where: { blueprint_hash: hash } });
  return result ? mapBlueprintBookEntityToObject(result) : null;
}

export async function createBlueprintBook(
  blueprintBook: BlueprintBookData,
  extraInfo: {
    tags: string[];
    created_at?: number;
    updated_at?: number;
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

  const result = await prisma().blueprint_book.create({
    data: {
      label: blueprintBook.label,
      description: blueprintBook.description,
      blueprint_hash: blueprint_hash,
      is_modded: false,
      child_tree: child_tree as any,
      updated_at: extraInfo.updated_at ? new Date(extraInfo.updated_at * 1000) : new Date(),
      created_at: extraInfo.created_at ? new Date(extraInfo.created_at * 1000) : new Date(),
    },
  });

  console.log(`Created Blueprint book ${result.id}`);

  return { insertedId: result.id, child_tree };
}
