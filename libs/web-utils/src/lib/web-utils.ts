import * as pako from "pako";
import {
  BlueprintData,
  BlueprintBookData,
  BlueprintStringData,
} from "@factorio-sites/common-utils";
import { BlueprintBookChild } from "@factorio-sites/types";

export function parseBlueprintStringClient(source: string): BlueprintStringData | null {
  try {
    const encoded = atob(source.substring(1));
    const decoded = pako.inflate(encoded);
    const string = new TextDecoder("utf-8").decode(decoded);
    const data = JSON.parse(string);
    return data;
  } catch (reason) {
    console.log("Failed to parse blueprint string", reason);
    return null;
  }
}

type BlueprintWithId = BlueprintData & { id: string };
type BlueprintBookWithId = Omit<BlueprintBookData, "blueprints"> & {
  id: string;
  blueprints: Array<{ index: number } & BlueprintObjectDataWithId>;
};

interface BlueprintDataWithId {
  blueprint: BlueprintWithId;
  blueprint_book?: never;
}

interface BlueprintBookDataWithId {
  blueprint_book: BlueprintBookWithId;
  blueprint?: never;
}

export type BlueprintObjectDataWithId = BlueprintDataWithId | BlueprintBookDataWithId;

export const isBlueprintBook = (
  data: BlueprintStringData
): data is { blueprint_book: BlueprintBookData } => !!data.blueprint_book;

export const isBlueprintBookWithId = (
  data: BlueprintObjectDataWithId
): data is BlueprintBookDataWithId => !!data.blueprint_book;

export function mergeBlueprintDataAndChildTree(
  data: BlueprintStringData,
  child_tree_item: BlueprintBookChild
): BlueprintObjectDataWithId {
  if (
    !data.blueprint_book ||
    !data.blueprint_book.blueprints ||
    child_tree_item.type !== "blueprint_book"
  ) {
    throw Error("mergeBlueprintDataAndChildTree called with a non-book");
  }
  data;
  return {
    ...data,
    blueprint_book: {
      ...data.blueprint_book,
      id: child_tree_item.id,
      blueprints: data.blueprint_book.blueprints.map<any>((blueprint, index) => {
        const child = child_tree_item.children[index];
        if (blueprint.blueprint) {
          return {
            index: blueprint.index,
            blueprint: { id: child.id, ...blueprint.blueprint },
          };
        } else {
          return mergeBlueprintDataAndChildTree(
            blueprint,
            child_tree_item.children[index] as BlueprintBookChild
          );
        }
      }),
    },
  };
}

export function encodeBlueprintStringClient(data: BlueprintStringData): string {
  const json = JSON.stringify(data);
  const encoded = new TextEncoder().encode(json);
  const compressed = pako.deflate(encoded, { to: "string" });
  const base64 = btoa(compressed);
  return "0" + base64;
}

export function chakraResponsive({
  mobile,
  desktop,
}: {
  mobile: string | null;
  desktop: string | null;
}): Array<string | null> {
  return [mobile, mobile, desktop, desktop];
}
