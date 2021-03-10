import { createBlueprint, editBlueprintPage, createBlueprintBook } from "@factorio-sites/database";
import { parseBlueprintString } from "@factorio-sites/node-utils";
import { parseDatabaseError } from "../../../utils/api.utils";
import { apiHandler } from "../../../utils/api-handler";

const handler = apiHandler(async (req, res, { session }) => {
  if (!session) {
    return res.status(401).json({ status: "Not authenticated" });
  }

  const { id, title, description, string, tags } = req.body;

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
      tags: Array.isArray(tags) ? tags : [],
      description_markdown: description,
    };
    console.log(info);

    if (parsed?.data.blueprint) {
      const result = await createBlueprint(parsed.data.blueprint, info);
      const page = await editBlueprintPage(id, "blueprint", result.id, info);
      return res.status(200).json({ success: true, id: page.id });
    } else if (parsed?.data.blueprint_book) {
      const result = await createBlueprintBook(parsed.data.blueprint_book, info);
      const page = await editBlueprintPage(id, "blueprint_book", result.id, info);
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
