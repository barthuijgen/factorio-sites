import { Storage } from "@google-cloud/storage";

const storage = new Storage();

const BLUEPRINT_BUCKET = storage.bucket("blueprint-strings");
const IMAGE_BUCKET = storage.bucket("blueprint-images");

/*
 * BlueprintString
 */

export async function getBlueprintStringByHash(hash: string): Promise<string | null> {
  const [buffer] = await BLUEPRINT_BUCKET.file(hash).download();
  return buffer ? buffer.toString() : null;
}

export async function saveBlueprintString(hash: string, content: string) {
  await BLUEPRINT_BUCKET.file(hash).save(content);
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
  return IMAGE_BUCKET.file(`${type}/${hash}.webp`).save(image, {
    contentType: "image/webp",
  });
}

export async function hasBlueprintImage(
  hash: string,
  type: sizeType = "original"
): Promise<boolean> {
  const [result] = await IMAGE_BUCKET.file(`${type}/${hash}.webp`).exists();
  return result;
}

export async function getBlueprintByImageHash(
  hash: string,
  type: sizeType = "original"
): Promise<Buffer> {
  const [result] = await IMAGE_BUCKET.file(`${type}/${hash}.webp`).download();
  return result;
}
