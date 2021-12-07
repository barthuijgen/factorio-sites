import {
  getBlueprintBookById,
  getBlueprintById,
  getBlueprintImageRequestTopic,
  hasBlueprintImage,
  init,
  searchBlueprintPages,
} from "@factorio-sites/database";
import { getFirstBlueprintFromChildTree } from "@factorio-sites/node-utils";
import { BlueprintPage } from "@factorio-sites/types";

const perPage = 10;
const pageLimit = 99;

async function getBlueprintPageFirstBlueprint(page: BlueprintPage) {
  if (page.blueprint_id) {
    return getBlueprintById(page.blueprint_id);
  } else if (page.blueprint_book_id) {
    const book = await getBlueprintBookById(page.blueprint_book_id);
    if (!book) return null;
    const blueprint = getFirstBlueprintFromChildTree(book.child_tree);
    return getBlueprintById(blueprint);
  }
  return null;
}

export async function rePublishAllBlueprints() {
  const topic = getBlueprintImageRequestTopic();
  if (!topic) throw Error("Topic not found");

  let exists = 0;
  let published = 0;

  await init();

  const fetchPage = async (page = 1) => {
    const blueprintPages = await searchBlueprintPages({
      page,
      perPage,
      mode: "AND",
      order: "date",
    });

    if (blueprintPages.rows.length === 0) {
      return console.log("No more blueprints found");
    }
    console.log(`Publishing page ${page} with ${blueprintPages.rows.length} blueprints`);

    await Promise.all(
      blueprintPages.rows.map(async (blueprintPage) => {
        const blueprint = await getBlueprintPageFirstBlueprint(blueprintPage);
        if (!blueprint) {
          console.log(`Error: blueprint not found for page ${blueprintPage.id}`);
          return;
        }
        if (await hasBlueprintImage(blueprint.image_hash, "300")) {
          exists++;
          return;
        }
        published++;
        return topic.publishMessage({ json: { blueprintId: blueprint.id } });
      })
    );

    if (page < pageLimit) await fetchPage(page + 1);
  };
  await fetchPage();

  console.log(`done fetching, ${exists} already existed, ${published} published`);
}
