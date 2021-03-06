import { deleteBlueprintPage, getBlueprintPageById } from "@factorio-sites/database";
import { apiHandler } from "../../../../utils/api-handler";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "DELETE") return res.status(400).json({ error: "method must be DELETE" });

  if (!session) return res.status(401).json({ status: "Not authenticated" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ status: "ID is required" });

  const existing = await getBlueprintPageById(String(id));
  if (existing?.user_id !== session.user_id) {
    return res.status(403).json({ status: "Unauthorised" });
  }

  try {
    await deleteBlueprintPage(String(id));
    return res.status(201).json({ success: true, id });
  } catch (err) {
    console.error("Failed to delete blueprint page", err);
  }

  res.status(500).json({ status: "Failed to delete blueprint" });
});

export default handler;
