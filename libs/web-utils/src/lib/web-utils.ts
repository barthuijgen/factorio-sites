import * as pako from "pako";
import { BlueprintStringData } from "@factorio-sites/common-utils";

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
