import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import * as sharp from "sharp";
import {
  hasBlueprintImage,
  getBlueprintByImageHash,
  saveBlueprintImage,
} from "@factorio-sites/database";

if (!process.env.DIR) throw Error("no 'DIR' environment variable")

// const fsReaddir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);
const fsUnlink = promisify(fs.unlink);
const FILE_DIR = path.normalize(process.env.DIR);

const RESIZE_ENABLED = false;

const uploadFile = async (image_path: string) => {
  const image_hash = path.basename(image_path, ".png");

  if (!(await getBlueprintByImageHash(image_hash))) {
    console.log(`Image ${image_hash} has no database record, skipping...`);
    return;
  }
  if (image_hash.includes("(")) {
    console.log(`Image ${image_hash} is a duplicate, deleting...`);
    await fsUnlink(image_path);
    return;
  }
  if (await hasBlueprintImage(image_hash)) {
    console.log(`Image ${image_hash} already exists, deleting...`);
    await fsUnlink(image_path);
    return;
  }

  console.log(`Processing ${image_hash}...`);
  const image = await fsReadFile(image_path);

  // const calculateImageSizeMod = (pixels: number) =>
  // Math.min(Math.max((-pixels + 500) / 20500 + 1, 0.3), 1);

  const calculateImageSizeMod = (pixels: number) =>
    Math.min(Math.max((-pixels + 3000) / 33000 + 1, 0.3), 1);

  let sharp_image = sharp(image);
  if (RESIZE_ENABLED) {
    const MAX_IMAGE_DIMENTION = 5000;
    sharp_image = await sharp_image
      .metadata()
      .then((meta) => {
        if (
          meta.width &&
          meta.height &&
          (meta.width > MAX_IMAGE_DIMENTION || meta.height > MAX_IMAGE_DIMENTION)
        ) {
          const mod = calculateImageSizeMod(Math.max(meta.width, meta.height));
          console.log({
            file: image_path,
            width: meta.width,
            height: meta.height,
            mod,
            size_mb: image.byteLength / 1024_000,
          });
          return sharp_image.resize({
            width: Math.round(meta.width * mod),
            height: Math.round(meta.height * mod),
          });
        }
        return sharp_image;
      })
      .then((image) => image.webp({ lossless: true }));
  } else {
    sharp_image = sharp_image.webp({ lossless: true });
  }

  const min_image = await sharp_image.toBuffer();

  console.log({
    input_size_mb: image.byteLength / 1024_000,
    output_size_mb: min_image.byteLength / 1024_000,
  });

  // console.log(`Image ${image_hash} processed, writing...`);
  // fs.writeFileSync(`${image_path}.webp`, min_image);
  console.log(`Image ${image_hash} processed, uploading...`);
  await saveBlueprintImage(image_hash, min_image);
  await fsUnlink(image_path);
};

export async function uploadLocalFiles() {
  // console.log(`Reading directory`, FILE_DIR);
  // const files = await fsReaddir(FILE_DIR);
  // for (let i = 0; i < files.length; i++) {
  //   if (fs.statSync(path.join(FILE_DIR, files[i])).isDirectory()) continue;
  //   await uploadFile(path.join(FILE_DIR, files[i]));
  // }
  console.log(`Watching directory`, FILE_DIR);
  const work_done_buffeer: string[] = [];
  const work_buffer: string[] = [];
  fs.watch(FILE_DIR, (type, file) => {
    if (type === "change" && file && file.endsWith(".png")) {
      const file_path = path.join(FILE_DIR, file);
      if (work_buffer.includes(file_path) || work_done_buffeer.includes(file_path)) {
        return;
      }
      work_buffer.push(file_path);
    }
  });

  let working = false;
  const doWork = async () => {
    if (working || !work_buffer.length) return setTimeout(doWork, 1000);
    working = true;
    const file_path = work_buffer.shift();
    if (file_path) {
      await uploadFile(file_path);
      work_done_buffeer.push(file_path);
    }
    working = false;
    doWork();
  };
  doWork();
}
