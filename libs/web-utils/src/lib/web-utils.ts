import * as pako from "pako";
import {
  BlueprintStringData,
  Icon,
  ChildTreeBlueprint,
  isBlueprintBook,
  isBlueprint,
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
    children: child_tree_item.children.map((child, index) => {
      const dataChild = data.blueprint_book.blueprints[index];
      if (child.type === "blueprint" && isBlueprint(dataChild)) {
        return {
          ...child,
          icons: dataChild.blueprint.icons,
        };
      } else if (child.type === "blueprint_book" && isBlueprintBook(dataChild)) {
        return mergeBlueprintDataAndChildTree(dataChild, child);
      } else {
        throw Error("Invalid child tree type");
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
