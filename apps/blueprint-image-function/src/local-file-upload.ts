import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import {
  hasBlueprintImage,
  getBlueprintByImageHash,
  saveBlueprintImage,
} from "@factorio-sites/database";
import { optimise } from "./image-optimiser";

if (!process.env.DIR) throw Error("no 'DIR' environment variable");

const fsReadFile = promisify(fs.readFile);
const fsUnlink = promisify(fs.unlink);
const FILE_DIR = path.normalize(process.env.DIR);

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
  const min_image = await optimise(image);

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
