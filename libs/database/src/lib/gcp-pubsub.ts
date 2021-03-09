import { PubSub, Message } from "@google-cloud/pubsub";
import { getEnv } from "./env.util";

const pubsub = new PubSub();

export function getBlueprintImageRequestTopic() {
  const topic = getEnv("GCP_BLUEPRINT_IMAGES_PUBSUB");
  return topic ? pubsub.topic(topic) : null;
}

export type PubSubMessage = Message;
