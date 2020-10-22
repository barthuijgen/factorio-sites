import { PubSub, Message } from "@google-cloud/pubsub";
// export { Message } from "@google-cloud/pubsub";

const pubsub = new PubSub();

export function getBlueprintImageRequestTopic() {
  return pubsub.topic("projects/factorio-sites/topics/blueprint-image-request");
}

export type PubSubMessage = Message;
