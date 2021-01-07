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

export async function saveBlueprintImage(hash: string, image: Buffer): Promise<void> {
  return IMAGE_BUCKET.file(`${hash}.webp`).save(image, {
    contentType: "image/webp",
  });
}

export async function hasBlueprintImage(hash: string): Promise<boolean> {
  const [result] = await IMAGE_BUCKET.file(`${hash}.webp`).exists();
  return result;
}
