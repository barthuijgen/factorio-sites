import {
  getBlueprintById,
  getBlueprintStringByHash,
  hasBlueprintImage,
  saveBlueprintImage,
  init,
} from "@factorio-sites/database";
import { jsonReplaceErrors } from "@factorio-sites/node-utils";
import { optimise } from "./image-optimiser";
import { renderImage } from "./image-renderer";

// {"blueprintId":"ee9b98eb-313a-4401-8aee-d6e970b76aad"}
// ^ image_hash: 6f78c0a93c20fe99076e8defe4e396923f42753b

/** express req interface for http-triggered function */
interface Req {
  query: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}
/** express res interface for http-triggered function */
interface Res {
  status(status: number): Res;
  send(body: string): void;
}
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
type Handler = (req: Req, res: Res) => void;
type PubSubHandler = (
  message: Message,
  context: Context,
  callback: (error?: string) => void
) => void;

export const functionHttpHandler: Handler = async (req, res) => {
  try {
    const blueprintId = req.body.blueprintId;

    if (!blueprintId) {
      return res.status(400).send("No blueprintId in body");
    }

    console.log("generating image for", blueprintId);

    await init();
    const blueprint = await getBlueprintById(blueprintId);

    if (!blueprint) {
      return res.status(400).send("Blueprint not found");
    }

    if (await hasBlueprintImage(blueprint.image_hash, "300")) {
      return res.status(200).send("Image already exists");
    }

    const blueprint_string = await getBlueprintStringByHash(blueprint.blueprint_hash);
    if (!blueprint_string) {
      return res.status(400).send("Blueprint string not found");
    }

    const image = await renderImage(blueprint_string);
    console.log("Image generated");

    // Make thumbnail, max size 300px
    const min_image = await optimise(image, 300);

    await saveBlueprintImage(blueprint.image_hash, min_image, "300");

    res.status(200).send("Done");
  } catch (reason) {
    res.status(500).send(`Error rendering image ${reason.stack || reason}`);
  }
};

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

    log(`generating image for ${blueprintId}`);

    await init();
    const blueprint = await getBlueprintById(blueprintId);

    if (!blueprint) {
      return error("Blueprint not found");
    }

    if (await hasBlueprintImage(blueprint.image_hash, "300")) {
      log("Image already exists");
      return callback();
    }

    const blueprint_string = await getBlueprintStringByHash(blueprint.blueprint_hash);
    if (!blueprint_string) {
      return error("Blueprint string not found");
    }

    const image = await renderImage(blueprint_string);
    log("Image generated");

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
