import * as pako from "pako";
import {
  BlueprintStringData,
  Icon,
  ChildTreeBlueprint,
  isBlueprintBook,
  isBlueprint,
  BlueprintBookString,
  BlueprintString,
} from "@factorio-sites/types";
import { ChildTreeBlueprintBook } from "@factorio-sites/types";
import { Base64 } from "./base64";

let FactorioWasm: typeof import("factorio-wasm");

async function loadFactorioWasm() {
  if (!FactorioWasm) {
    FactorioWasm = await import("factorio-wasm");
  }
  return FactorioWasm;
}

export function parseBlueprintStringClient(source: string): BlueprintStringData | null {
  try {
    const compressed = atob(source.substring(1));
    const encoded = pako.inflate(compressed);
    const string = new TextDecoder("utf-8").decode(encoded);
    const data = JSON.parse(string);
    return data;
  } catch (reason) {
    console.log("Failed to parse blueprint string", reason);
    return null;
  }
}

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).parseBlueprintString = parseBlueprintStringClient;
}

export function encodeBlueprintClient(data: BlueprintStringData): string {
  const string = JSON.stringify(data);
  const encoded = new TextEncoder().encode(string);
  const compresed = pako.deflate(encoded, { level: 9 });
  return "0" + Base64.encodeU(compresed);
}

export function getFirstBookFromString(string: string): BlueprintString | null {
  const data = parseBlueprintStringClient(string);
  if (!data) return null;
  if (data.blueprint) return data;
  else if (data.blueprint_book) {
    const bpData = data.blueprint_book.blueprints.find((bp) => !!bp.blueprint);
    if (bpData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { index, ...bp } = bpData;
      return bp as BlueprintString;
    }
  }
  return null;
}

interface ChildTreeBlueprintEnriched extends Omit<ChildTreeBlueprint, "icons"> {
  icons: Icon[];
}
export interface ChildTreeBlueprintBookEnriched
  extends Omit<ChildTreeBlueprintBook, "icons" | "children"> {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const breakpoints = ["30em", "48em", "62em", "80em"];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp})`);

export function getLocaleDateFormat(withHours?: boolean) {
  const format = new Date(2013, 11, 31)
    .toLocaleDateString()
    .replace("31", "dd")
    .replace("12", "MM")
    .replace("2013", "yyyy");
  return withHours ? `${format} HH:mm` : format;
}

export async function parseFactorioGameVersion(version: string | number) {
  const factorioWasm = await loadFactorioWasm();
  const result = factorioWasm.parse_game_version(String(version));
  return result.split(".").slice(0, 3).join(".");
}
