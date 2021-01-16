import { NextApiHandler } from "next";
import {
  init,
  createBlueprint,
  createBlueprintPage,
  createBlueprintBook,
  getSessionByToken,
} from "@factorio-sites/database";
import { getSessionToken, parseBlueprintString } from "@factorio-sites/node-utils";
import { parseSequelizeError } from "../../../utils/api.utils";

const handler: NextApiHandler = async (req, res) => {
  await init();

  const token = getSessionToken(req);
  if (!token) {
    return res.status(401).json({ status: "Not authenticated" });
  }

  const session = await getSessionByToken(token);
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
      const { insertedId } = await createBlueprint(parsed.data.blueprint, info);
      const page = await createBlueprintPage("blueprint", insertedId, info);
      return res.status(201).json({ success: true, id: page.id });
    } else if (parsed?.data.blueprint_book) {
      const { insertedId } = await createBlueprintBook(parsed.data.blueprint_book, info);
      const page = await createBlueprintPage("blueprint_book", insertedId, info);
      return res.status(201).json({ success: true, id: page.id });
    }
  } catch (reason) {
    const insert_errors = parseSequelizeError(reason);
    if (insert_errors) {
      if (insert_errors.blueprint_id || insert_errors.blueprint_book_id) {
        insert_errors.string = "This string already exists";
      }
      return res.status(400).json({ errors: insert_errors });
    }
  }

  res.status(500).json({ status: "Failed to create blueprint" });
};

export default handler;
