import { NextApiHandler } from "next";
import {
  getBlueprintImageRequestTopic,
  PubSubMessage,
  getBlueprintById,
  getBlueprintStringByHash,
  hasBlueprintImage,
  BlueprintEntry,
} from "@factorio-sites/database";

const getOneMessage = async (): Promise<BlueprintEntry> => {
  const topic = getBlueprintImageRequestTopic();
  const [subscription] = await topic
    .subscription("blueprint-image-function-app", {
      flowControl: { allowExcessMessages: false, maxMessages: 1 },
    })
    .get();

  return new Promise((resolve) => {
    let acked_msg = false;
    const messageHandler = async (message: PubSubMessage) => {
      console.log("[pubsub]" + message.data.toString());
      if (acked_msg) return;

      const data = JSON.parse(message.data.toString());
      const blueprint = await getBlueprintById(data.blueprintId);

      if (await hasBlueprintImage(blueprint.image_hash)) {
        console.log(`Blueprint ${data.blueprintId} image already exists ${blueprint.image_hash}`);
        return message.ack();
      }

      if (acked_msg) return; // check again if it changes during async calls
      acked_msg = true;
      message.ack();
      subscription.off("message", messageHandler);
      resolve(blueprint);
    };
    subscription.on("message", messageHandler);
  });
};

const handler: NextApiHandler = async (req, res) => {
  // Allow the url to be used in the blueprint editor
  if (
    req.headers.origin === "https://teoxoy.github.io" ||
    req.headers.origin.startsWith("http://localhost")
  ) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  const blueprint = await getOneMessage();
  const string = await getBlueprintStringByHash(blueprint.blueprint_hash);

  res.setHeader("Content-Type", "application/json");
  res.status(200).end(
    JSON.stringify({
      blueprintId: blueprint.id,
      image_hash: blueprint.image_hash,
      string: string,
    })
  );
};

export default handler;
