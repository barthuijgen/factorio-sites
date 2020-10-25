import {
  saveBlueprintImage,
  hasBlueprintImage,
  getBlueprintById,
  getBlueprintImageRequestTopic,
  PubSubMessage,
  getBlueprintStringByHash,
} from "@factorio-sites/database";
import { optimise } from "./image-optimiser";
import { renderImage } from "./image-renderer";

export async function subscribeToPubSub() {
  const topic = getBlueprintImageRequestTopic();
  const [subscription] = await topic
    .subscription("blueprint-image-function-app", {
      flowControl: { allowExcessMessages: false, maxMessages: 1, maxExtension: 3600 },
    })
    .get();

  let handlerBusy = false;
  const messageHandler = async (message: PubSubMessage) => {
    if (handlerBusy) {
      console.log(`nack'd message because handler is busy ${message.data.toString()}`);
      message.nack();
      return;
    }

    handlerBusy = true;

    const ack = (log: string, ack: boolean) => {
      if (log) console.log(log);
      handlerBusy = false;
      if (ack) message.ack();
      else message.nack();
    };

    try {
      const data = JSON.parse(message.data.toString());
      if (!data.blueprintId) return ack("blueprintId not found in message body", false);
      console.log("------------------------------------------------");
      console.log("[pubsub] generating image for", data.blueprintId);
      const blueprint = await getBlueprintById(data.blueprintId);
      if (!blueprint) return ack("Blueprint not found", false);

      if (await hasBlueprintImage(blueprint.image_hash)) {
        return ack("Image already exists", true);
      }

      const blueprint_string = await getBlueprintStringByHash(blueprint.blueprint_hash);
      if (!blueprint_string) return ack("Blueprint string not found", false);

      const image = await renderImage(blueprint_string);
      console.log(`[pubsub] image generated`);

      const min_image = await optimise(image);

      await saveBlueprintImage(blueprint.image_hash, min_image);

      return ack("[pubsub] image saved", true);
    } catch (reason) {
      return ack(`[pubsub:error] ${reason}`, false);
    }
  };

  console.log("[pubsub] Listening to messages...");
  subscription.on("message", messageHandler);

  subscription.on("error", (error) => {
    console.error("[pubsub] Received error:", error);
  });
}
