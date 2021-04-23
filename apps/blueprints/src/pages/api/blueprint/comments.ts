import { apiHandler } from "../../../utils/api-handler";
import { getComments } from "@factorio-sites/database";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "GET") return res.status(400).json({ error: "method must be GET" });

  const blueprint_page_id = req.query.blueprint_page_id as string;

  if (!blueprint_page_id) return res.status(400).json({ status: "blueprint_page_id required" });

  const comments = await getComments(blueprint_page_id);

  res.status(200).json({ comments });
});

export default handler;
