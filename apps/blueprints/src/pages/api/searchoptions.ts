import {
  getBlueprintEntities,
  getBlueprintItems,
  getBlueprintRecipes,
} from "@factorio-sites/database";
import { apiHandler } from "../../utils/api-handler";

const handler = apiHandler(async (_, res) => {
  // const [entities, items, recipes] = await Promise.all([
  //   getBlueprintEntities(),
  //   getBlueprintItems(),
  //   getBlueprintRecipes(),
  // ]);
  const entities = [] as any[];
  const items = [] as any;
  const recipes = [] as any;
  res.status(200).json({ entities, items, recipes });
});

export default handler;
