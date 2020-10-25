import { getBlueprintImageRequestTopic, getPaginatedBlueprints } from "@factorio-sites/database";

export async function rePublishAllBlueprints() {
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
