import {
  getBlueprintById,
  getBlueprintStringByHash,
  hasBlueprintImage,
  init,
  saveBlueprintImage,
} from "@factorio-sites/database";
import { optimise } from "./image-optimiser";
import { renderImage } from "./image-renderer";

export async function local_test(blueprint_id: string) {
  await init();
  const blueprint = await getBlueprintById(blueprint_id);

  if (!blueprint) {
    return console.log("Blueprint not found");
  }

  if (await hasBlueprintImage(blueprint.image_hash, "300")) {
    // return console.log("Image already exists");
  }

  const blueprint_string = await getBlueprintStringByHash(blueprint.blueprint_hash);
  if (!blueprint_string) {
    return console.log("Blueprint string not found");
  }

  const image = await renderImage(blueprint_string, { headless: false });
  console.log("Image generated");

  // Make thumbnail, max size 300px
  const min_image = await optimise(image, 300);

  await saveBlueprintImage(blueprint.image_hash, min_image, "300");
  console.log(`Saved image with image hash ${blueprint.image_hash}`);

  await saveBlueprintImage(blueprint.image_hash, image, "original");

  console.log("done");
}
