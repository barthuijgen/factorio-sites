import { generateScreenshot } from "@factorio-sites/generate-bp-image";
import {
  saveBlueprintImage,
  hasBlueprintImage,
  getBlueprintById,
  BlueprintEntry,
  getBlueprintImageRequestTopic,
  PubSubMessage,
  getPaginatedBlueprints,
} from "@factorio-sites/database";
import { environment } from "./environments/environment";
import { uploadLocalFiles } from "./localFileUpload";

const generateImageForSource = async (blueprint: BlueprintEntry) => {
  if (await hasBlueprintImage(blueprint.image_hash)) {
    throw Error("Image already exists");
  }

  const imageBuffer = await generateScreenshot(
    blueprint,
    environment.production ? "/tmp" : undefined
  );

  if (!imageBuffer) return false;

  await saveBlueprintImage(blueprint.image_hash, imageBuffer);

  console.log(`[generateImageForSource] image hash ${blueprint.image_hash} successfully saved`);

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler = (req: any, res: any) => void; // Don't want to install express types just for this

/**
 * Handler method supports Google cloud functions
 * @param req express request object
 * @param res express response object
 */
export const handler: Handler = async (req, res) => {
  if (!req.query.source) {
    return res.status(400).end("No source string given");
  }

  // generateImageForSource((req.query.source as string).replace(/ /g, "+"))
  //   .then(() => {
  //     res.status(200).end("done");
  //   })
  //   .catch((reason) => {
  //     res.status(200).end(reason.message);
  //   });
};

async function subscribeToPubSub() {
  // Wait to make sure puppeteer browser started
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const topic = getBlueprintImageRequestTopic();
  const [subscription] = await topic
    .subscription("blueprint-image-function-app", {
      flowControl: { allowExcessMessages: false, maxMessages: 1, maxExtension: 3600 },
    })
    .get();

  console.log(`[pubsub] Listening to subscription`);

  let handlerBusy = false;
  const messageHandler = async (message: PubSubMessage) => {
    if (!handlerBusy) handlerBusy = true;
    else {
      console.log(`nack'd message because handler is busy ${message.data.toString()}`);
      return message.nack();
    }

    try {
      const data = JSON.parse(message.data.toString());
      if (!data.blueprintId) return console.log("blueprintId not found in message body");
      console.log("------------------------------------------------");
      console.log("[pubsub] generating image for", data.blueprintId);
      const blueprint = await getBlueprintById(data.blueprintId);
      if (!blueprint) return console.log("Blueprint not found");
      const start_time = Date.now();
      await generateImageForSource(blueprint);
      const duration = Date.now() - start_time;
      console.log(`[pubsub] image generated in ${duration}ms`);
      message.ack();

      if (duration > 30000) {
        console.log("Process too slow, closing...");
        subscription.off("message", messageHandler);
        return setTimeout(() => process.exit(1), 1000);
      }
    } catch (reason) {
      if (reason.message === "Image already exists") {
        console.log(`Image already exists`);
        message.ack();
      } else if (reason.message === "Failed to parse blueprint string") {
        console.log(`Blueprint editor could not handle string`);
        message.ack();
      } else {
        console.error("[pubsub:error]", reason);
        message.nack();
      }
    }
    handlerBusy = false;
  };

  subscription.on("message", messageHandler);
  // image hash = a99525f97c26c7242ecdd96679043b1a5e65dd0c
  // SELECT * FROM BlueprintBook WHERE blueprint_ids CONTAINS Key(Blueprint, 4532736400293888)
  // bp = Key(Blueprint, 4532736400293888)
  // book = Key(BlueprintBook, 5034207050989568)
  // page = 6225886932107264

  subscription.on("error", (error) => {
    console.error("[pubsub] Received error:", error);
  });
}

async function rePublishAllBlueprints() {
  const topic = getBlueprintImageRequestTopic();
  const fetchPage = async (page = 1) => {
    const blueprints = await getPaginatedBlueprints(page);
    if (blueprints.length === 0) {
      return console.log("No more blueprints found");
    }
    console.log(`Publishing page ${page} with ${blueprints.length} blueprints`);

    await Promise.all(
      blueprints.map((blueprint) => {
        return topic.publishJSON({ blueprintId: blueprint.id });
      })
    );
    fetchPage(page + 1);
  };
  await fetchPage();
}

uploadLocalFiles().catch((reason) => console.error("Fatal error:", reason));
// subscribeToPubSub().catch((reason) => console.error("Fatal error:", reason));
// rePublishAllBlueprints().catch((reason) => console.error("Fatal error:", reason));
