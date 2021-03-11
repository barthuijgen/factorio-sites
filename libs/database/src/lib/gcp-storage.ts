import { Storage } from "@google-cloud/storage";
import { getEnv } from "./env.util";

const storage = new Storage();

const BLUEPRINT_BUCKET = getEnv("GCP_BLUEPRINT_STRINGS_BUCKET");
const IMAGE_BUCKET = getEnv("GCP_BLUEPRINT_IMAGES_BUCKET");

/*
 * BlueprintString
 */

export async function getBlueprintStringByHash(hash: string): Promise<string | null> {
  if (!BLUEPRINT_BUCKET) throw Error("Missing GCP_BLUEPRINT_STRINGS_BUCKET env variable");
  const [buffer] = await storage.bucket(BLUEPRINT_BUCKET).file(hash).download();
  return buffer ? buffer.toString() : null;
}

export async function saveBlueprintString(hash: string, content: string) {
  if (!BLUEPRINT_BUCKET) throw Error("Missing GCP_BLUEPRINT_STRINGS_BUCKET env variable");
  await storage.bucket(BLUEPRINT_BUCKET).file(hash).save(content);
}

/*
 * BlueprintImage
 */

type sizeType = "original" | "300";

export async function saveBlueprintImage(
  hash: string,
  image: Buffer,
  type: sizeType = "original"
): Promise<void> {
  if (!IMAGE_BUCKET) throw Error("Missing GCP_BLUEPRINT_IMAGES_BUCKET env variable");
  return storage.bucket(IMAGE_BUCKET).file(`${type}/${hash}.webp`).save(image, {
    contentType: "image/webp",
  });
}

export async function hasBlueprintImage(
  hash: string,
  type: sizeType = "original"
): Promise<boolean> {
  if (!IMAGE_BUCKET) throw Error("Missing GCP_BLUEPRINT_IMAGES_BUCKET env variable");
  const [result] = await storage.bucket(IMAGE_BUCKET).file(`${type}/${hash}.webp`).exists();
  return result;
}

export async function getBlueprintByImageHash(
  hash: string,
  type: sizeType = "original"
): Promise<Buffer> {
  if (!IMAGE_BUCKET) throw Error("Missing GCP_BLUEPRINT_IMAGES_BUCKET env variable");
  const [result] = await storage.bucket(IMAGE_BUCKET).file(`${type}/${hash}.webp`).download();
  return result;
}
