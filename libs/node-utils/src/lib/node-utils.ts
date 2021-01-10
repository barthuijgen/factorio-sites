import * as crypto from "crypto";
import * as pako from "pako";
// import * as phin from "phin";
import { BlueprintStringData } from "@factorio-sites/common-utils";

export const parseBlueprintString = async (
  string: string
): Promise<{ hash: string; data: BlueprintStringData; string: string }> => {
  // if (string.startsWith("http:") || string.startsWith("https:")) {
  //   const result = await phin(string);
  //   string = result.body.toString();
  // }

  const hash = crypto.createHash("sha1").update(string).digest("hex");
  const buffer = Buffer.from(string.substr(1), "base64");
  const decoded = pako.inflate(buffer);
  const json = new TextDecoder("utf-8").decode(decoded);
  const data = JSON.parse(json);

  return {
    hash,
    data,
    string,
  };
};

export const encodeBlueprint = async (data: BlueprintStringData): Promise<string> => {
  const json = JSON.stringify(data);
  const encoded = new TextEncoder().encode(json);
  const compressed = pako.deflate(encoded);
  const base64 = Buffer.from(compressed).toString("base64");
  return "0" + base64;
};

export const hashString = (string: string) => {
  return crypto.createHash("sha1").update(string).digest("hex");
};
