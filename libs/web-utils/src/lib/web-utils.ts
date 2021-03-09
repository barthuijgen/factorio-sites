import * as pako from "pako";
import {
  BlueprintStringData,
  Icon,
  ChildTreeBlueprint,
  isBlueprintBook,
  isBlueprint,
  BlueprintBookString,
} from "@factorio-sites/types";
import { ChildTreeBlueprintBook } from "@factorio-sites/types";

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

interface ChildTreeBlueprintEnriched extends ChildTreeBlueprint {
  icons: Icon[];
}
export interface ChildTreeBlueprintBookEnriched extends ChildTreeBlueprintBook {
  icons?: Icon[];
  children: ChildTreeEnriched;
}

export type ChildTreeEnriched = Array<ChildTreeBlueprintEnriched | ChildTreeBlueprintBookEnriched>;

export function findBlueprintByName(data: BlueprintBookString, name: string) {
  return data.blueprint_book.blueprints.find(
    (bp) =>
      (bp.blueprint && bp.blueprint.label === name) ||
      (bp.blueprint_book && bp.blueprint_book.label === name)
  );
}

export function mergeBlueprintDataAndChildTree(
  data: BlueprintStringData,
  child_tree_item: ChildTreeBlueprintBook
): ChildTreeBlueprintBookEnriched {
  if (!isBlueprintBook(data)) {
    throw Error("mergeBlueprintDataAndChildTree called with data without a blueprint_book");
  }
  return {
    ...child_tree_item,
    icons: data.blueprint_book.icons,
    children: child_tree_item.children.map((child) => {
      const dataChild = findBlueprintByName(data, child.name);
      if (child.type === "blueprint" && dataChild && isBlueprint(dataChild)) {
        return {
          ...child,
          icons: dataChild.blueprint.icons,
        };
      } else if (child.type === "blueprint_book" && dataChild && isBlueprintBook(dataChild)) {
        return mergeBlueprintDataAndChildTree(dataChild, child);
      } else {
        console.error("Invalid child tree type", {
          parent: child_tree_item,
          bp_data: data.blueprint_book,
        });
        return { ...child, icons: [] } as any;
      }
    }),
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
