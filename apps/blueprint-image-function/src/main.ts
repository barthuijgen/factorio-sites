import { subscribeToPubSub } from "./pubsub-render";

subscribeToPubSub().catch((reason) => console.error("Fatal error:", reason));
// uploadLocalFiles().catch((reason) => console.error("Fatal error:", reason));
// rePublishAllBlueprints().catch((reason) => console.error("Fatal error:", reason));

// image hash = a99525f97c26c7242ecdd96679043b1a5e65dd0c
// SELECT * FROM BlueprintBook WHERE blueprint_ids CONTAINS Key(Blueprint, 4532736400293888)
// bp = Key(Blueprint, 4532736400293888)
// book = Key(BlueprintBook, 5034207050989568)
// page = 6225886932107264
