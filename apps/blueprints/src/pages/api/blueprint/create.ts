import {
  createBlueprint,
  createBlueprintPage,
  createBlueprintBook,
  getBlueprintById,
} from "@factorio-sites/database";
import { getFirstBlueprintFromChildTree, parseBlueprintString } from "@factorio-sites/node-utils";
import { parseDatabaseError } from "../../../utils/api.utils";
import { apiHandler } from "../../../utils/api-handler";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  if (!session) {
    return res.status(401).json({ status: "Not authenticated" });
  }

  const { title, description, string } = req.body;

  const parsed = await parseBlueprintString(string).catch(() => null);

  // Validation
  const errors: Record<string, string> = {};

  if (!title) errors.title = "Required";
  if (!description) errors.description = "Required";
  if (!string) errors.string = "Required";
  if (!parsed) errors.string = "Not recognised as a blueprint string";

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const info = {
      user_id: session.user.id,
      title,
      tags: [],
      description_markdown: description,
    };

    if (parsed?.data.blueprint) {
      const blueprint = await createBlueprint(parsed.data.blueprint, info);
      const page = await createBlueprintPage("blueprint", blueprint.id, {
        ...info,
        image_hash: blueprint.image_hash,
      });
      return res.status(201).json({ success: true, id: page.id });
    } else if (parsed?.data.blueprint_book) {
      const result = await createBlueprintBook(parsed.data.blueprint_book, info);
      const firstBlueprintId = getFirstBlueprintFromChildTree(result.child_tree);
      const firstBlueprint = await getBlueprintById(firstBlueprintId);
      if (!firstBlueprint) throw Error("Failed to find blueprint");
      const page = await createBlueprintPage("blueprint_book", result.id, {
        ...info,
        image_hash: firstBlueprint.image_hash,
        child_tree: result.child_tree,
      });
      return res.status(201).json({ success: true, id: page.id });
    }
  } catch (reason) {
    const insert_errors = parseDatabaseError(reason);
    if (insert_errors) {
      if (insert_errors.blueprint_id || insert_errors.blueprint_book_id) {
        insert_errors.string = "This string already exists";
      }
      return res.status(400).json({ errors: insert_errors });
    }
  }

  res.status(500).json({ status: "Failed to create blueprint" });
});

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};
