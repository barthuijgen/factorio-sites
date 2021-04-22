import { apiHandler } from "../../../utils/api-handler";
import { createComment } from "@factorio-sites/database";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  if (!session) {
    return res.status(401).json({ status: "Not authenticated" });
  }

  const { body, blueprint_page_id } = req.body;
  console.log({ body, blueprint_page_id });

  const result = await createComment(blueprint_page_id, session.user, body);
  console.log(result);

  res.status(200).json({ status: "Comment submitted" });
});

export default handler;
