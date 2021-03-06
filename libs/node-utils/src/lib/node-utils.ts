import { IncomingMessage } from "http";
import * as crypto from "crypto";
import * as pako from "pako";
import * as cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { BlueprintStringData } from "@factorio-sites/common-utils";
import { ChildTree } from "@factorio-sites/types";

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

export const COOKIE_SESSION_NAME = "session-token";
export const COOKIE_SESSION_OPTIONS: cookie.CookieSerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 31536000,
  sameSite: "strict" as const,
  path: "/",
};

export const getSessionToken = (req?: NextApiRequest | IncomingMessage): string | null => {
  if (!req?.headers.cookie) return null;
  const cookies = cookie.parse(req.headers.cookie);
  return cookies[COOKIE_SESSION_NAME] || null;
};

export const setUserToken = (res: NextApiResponse, value: string) => {
  res.setHeader("Set-Cookie", cookie.serialize(COOKIE_SESSION_NAME, value, COOKIE_SESSION_OPTIONS));
};

export const deleteSessionToken = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_SESSION_NAME, "", {
      ...COOKIE_SESSION_OPTIONS,
      maxAge: undefined,
      expires: new Date(0),
    })
  );
};

export function getFirstBlueprintFromChildTree(child_tree: ChildTree): string {
  // First try flat search
  const result = child_tree.find((child) => child.type === "blueprint");
  if (result) return result.id;

  // Recusrive search
  let blueprint_id: string | null = null;
  child_tree.forEach((child) => {
    if (child.type === "blueprint_book") {
      const bp = getFirstBlueprintFromChildTree([child]);
      if (bp) blueprint_id = bp;
    }
  });

  if (!blueprint_id) throw Error("Failed to find blueprint id in child_tree");

  return blueprint_id;
}

export function jsonReplaceErrors(_: string, value: unknown) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce((error, key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error[key] = (value as any)[key];
      return error;
    }, {} as Record<string, unknown>);
  }
  return value;
}
