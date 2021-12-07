import * as phin from "phin";
import {
  getBlueprintById,
  hasBlueprintImage,
  saveBlueprintImage,
  init,
} from "@factorio-sites/database";
import { jsonReplaceErrors } from "@factorio-sites/node-utils";
import { optimise } from "./image-optimiser";

// {"blueprintId":"ee9b98eb-313a-4401-8aee-d6e970b76aad"}
// ^ image_hash: 6f78c0a93c20fe99076e8defe4e396923f42753b

/** message body for pubsub triggered function */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Message = Record<string, any>;

/** context for pubsub triggered function */
interface Context {
  eventId: string;
  eventType: string;
  timestamp: string;
  resource: { service: string; name: string };
}

type PubSubHandler = (
  message: Message,
  context: Context,
  callback: (error?: string) => void
) => void;

export const functionPubSubHandler: PubSubHandler = async (message, _context, callback) => {
  const error = (message: string, data: Record<string, unknown> = {}) => {
    console.error(JSON.stringify({ message, ...data }, jsonReplaceErrors));
    callback(message);
  };
  const log = (message: string, data: Record<string, unknown> = {}) => {
    console.log(JSON.stringify({ message, ...data }));
  };

  try {
    const data = message.data
      ? JSON.parse(Buffer.from(message.data, "base64").toString())
      : message;

    const blueprintId = data.blueprintId;

    if (!blueprintId) {
      return error("No blueprintId in body");
    }

    await init();
    const blueprint = await getBlueprintById(blueprintId);

    if (!blueprint) {
      return error(`Blueprint ${blueprintId} not found`);
    }

    if (await hasBlueprintImage(blueprint.image_hash, "300")) {
      log(`Image already exists ${blueprint.image_hash}`);
      return callback();
    }

    console.log(`Fetching https://fbsr.factorio.workers.dev/${blueprint.blueprint_hash}?size=300`);
    const response = await phin(
      `https://fbsr.factorio.workers.dev/${blueprint.blueprint_hash}?size=300`
    );
    const image = response.body;
    console.log("Image fetched");

    // Make thumbnail, max size 300px
    const min_image = await optimise(image, 300);

    await saveBlueprintImage(blueprint.image_hash, min_image, "300");
    log(`Saved image with image hash ${blueprint.image_hash}`);

    // await saveBlueprintImage(blueprint.image_hash, image, "original");

    callback();
  } catch (reason) {
    error(`Error rendering image ${reason}`, { error: reason });
  }
};
