import { apiHandler } from "../../../utils/api-handler";
import { createComment, deleteComment } from "@factorio-sites/database";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ status: "Not authenticated" });
    }

    const { body, blueprint_page_id } = req.body;
    console.log({ body, blueprint_page_id });

    const result = await createComment(blueprint_page_id, session.user, body);
    console.log(result);

    res.status(200).json({ status: "Comment submitted" });
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ status: "Not authenticated" });
    }

    if (session.user.role !== "moderator" && session.user.role !== "admin") {
      return res.status(401).json({ status: "Not authenticated" });
    }
    const { comment_id } = req.body;
    await deleteComment(comment_id);
    res.status(200).json({ status: "Comment deleted" });
  } else {
    return res.status(400).json({ error: `Unsupported method ${req.method}` });
  }
});

export default handler;
