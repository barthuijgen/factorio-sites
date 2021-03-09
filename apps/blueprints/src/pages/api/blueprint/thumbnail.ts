import { NextApiHandler } from "next";
import {
  getBlueprintBookById,
  getBlueprintById,
  getBlueprintImageRequestTopic,
  getBlueprintPageById,
} from "@factorio-sites/database";
import { getFirstBlueprintFromChildTree } from "@factorio-sites/node-utils";
import { apiHandler, ApiError } from "../../../utils/api-handler";

const handler: NextApiHandler = apiHandler(async (req, res) => {
  if (!req.query.id) throw new ApiError(400, "No id in query");
  const blueprintPage = await getBlueprintPageById(req.query.id as string);
  if (!blueprintPage) return res.status(404).json({ error: "Blueprint page not found" });

  const blueprintImageRequestTopic = getBlueprintImageRequestTopic();

  if (blueprintPage.blueprint_id) {
    if (blueprintImageRequestTopic) {
      blueprintImageRequestTopic.publishJSON({
        blueprintId: blueprintPage.blueprint_id,
      });
    }
    return res.json({ blueprint_id: blueprintPage.blueprint_id });
  } else if (blueprintPage.blueprint_book_id) {
    const blueprintBook = await getBlueprintBookById(blueprintPage.blueprint_book_id);
    if (!blueprintBook) throw new ApiError(500, "Failed to find blueprint book");
    const firstBlueprintId = getFirstBlueprintFromChildTree(blueprintBook.child_tree);
    const firstBlueprint = await getBlueprintById(firstBlueprintId);
    if (!firstBlueprint) throw new ApiError(500, "Failed to find blueprint");
    if (blueprintImageRequestTopic) {
      blueprintImageRequestTopic.publishJSON({
        blueprintId: firstBlueprintId,
      });
    }
    return res.json({ blueprint_id: firstBlueprintId });
  }
});

export default handler;
