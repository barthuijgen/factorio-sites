import { parseBlueprintString } from "@factorio-sites/node-utils";
import { createBlueprint } from "./blueprint";
import { createBlueprintBook } from "./blueprint_book";
import { createBlueprintPage } from "./blueprint_page";

interface BlueprintDataFromFactorioprints {
  description_markdown: string;
  title: string;
  updated_at?: number;
  created_at?: number;
  tags: string[];
  factorioprints_id: string;
}
export async function saveBlueprintFromFactorioprints(
  factorioprintData: BlueprintDataFromFactorioprints,
  blueprintString: string
) {
  const parsed = await parseBlueprintString(blueprintString);

  // not needed for inserting, just printing
  // const { blueprints, books } = flattenBlueprintData(parsed.data);
  // console.log(`string has ${books.length} books with ${blueprints.length} blueprints`);

  const extraInfo = {
    created_at: factorioprintData.created_at,
    updated_at: factorioprintData.updated_at,
    tags: factorioprintData.tags,
  };

  const extraInfoPage = {
    user_id: null,
    title: factorioprintData.title,
    description_markdown: factorioprintData.description_markdown,
    created_at: factorioprintData.created_at,
    updated_at: factorioprintData.updated_at,
    factorioprints_id: factorioprintData.factorioprints_id,
  };

  if (parsed.data.blueprint) {
    console.log("string has one blueprint...");
    const result = await createBlueprint(parsed.data.blueprint, extraInfo);
    await createBlueprintPage("blueprint", result.id, {
      ...extraInfoPage,
      image_hash: "",
    });
  } else if (parsed.data.blueprint_book) {
    console.log("string has a blueprint book...");
    const result = await createBlueprintBook(parsed.data.blueprint_book, extraInfo);
    await createBlueprintPage("blueprint_book", result.id, {
      ...extraInfoPage,
      child_tree: result.child_tree,
      image_hash: "",
    });
  }

  return true;
}
