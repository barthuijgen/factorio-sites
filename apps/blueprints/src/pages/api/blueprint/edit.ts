import {
  createBlueprint,
  editBlueprintPage,
  createBlueprintBook,
  getBlueprintPageById,
} from "@factorio-sites/database";
import { parseBlueprintString } from "@factorio-sites/node-utils";
import { parseDatabaseError } from "../../../utils/api.utils";
import { apiHandler } from "../../../utils/api-handler";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  if (!session) {
    return res.status(401).json({ status: "Not authenticated" });
  }

  const { id, title, description, string, tags } = req.body;

  const existing = await getBlueprintPageById(id);
  if (!existing) {
    return res.status(404).json({ status: "Blueprint not found" });
  }
  if (existing?.user_id !== session.user_id) {
    return res.status(403).json({ status: "Unauthorised" });
  }

  // Validation
  const errors: Record<string, string> = {};

  if (!title) errors.title = "Required";

  const parsed = string ? await parseBlueprintString(string).catch(() => null) : null;

  if (string && !parsed) errors.string = "Not recognised as a blueprint string";

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const data = {
      user_id: session.user.id,
      title,
      tags: Array.isArray(tags) ? tags : [],
      description_markdown: description,
    };

    if (parsed?.data.blueprint) {
      const result = await createBlueprint(parsed.data.blueprint, data);
      const page = await editBlueprintPage(id, data, { id: result.id, type: "blueprint" });
      return res.status(200).json({ success: true, id: page.id });
    } else if (parsed?.data.blueprint_book) {
      const result = await createBlueprintBook(parsed.data.blueprint_book, data);
      const page = await editBlueprintPage(id, data, { id: result.id, type: "blueprint_book" });
      return res.status(200).json({ success: true, id: page.id });
    } else if (!string) {
      const page = await editBlueprintPage(id, data);
      return res.status(200).json({ success: true, id: page.id });
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
