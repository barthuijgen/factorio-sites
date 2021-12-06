// import { functionHttpHandler, functionPubSubHandler } from "./function-handler";
import { functionPubSubHandler } from "./fetch-handlers";
// import { rePublishAllBlueprints } from "./republish-pubsub";

// exports.renderImageHttp = functionHttpHandler;
exports.renderImagePubSub = functionPubSubHandler;

// rePublishAllBlueprints();
