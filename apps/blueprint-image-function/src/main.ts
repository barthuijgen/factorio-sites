import { functionHttpHandler, functionPubSubHandler } from "./function-handler";
// import { local_test } from "./local-test";

// import { subscribeToPubSub } from "./pubsub-render";
// subscribeToPubSub().catch((reason) => console.error("Fatal error:", reason));
// rePublishAllBlueprints().catch((reason) => console.error("Fatal error:", reason));

exports.renderImageHttp = functionHttpHandler;
exports.renderImagePubSub = functionPubSubHandler;

// local_test("8737437e-f15b-459c-8c1d-d0074f3a89ca");
