import { NextApiHandler } from "next";
import { deleteSessionToken, getSessionToken } from "@factorio-sites/node-utils";
import {
  init,
  getSessionByToken,
  isBlueprintPageUserFavorite,
  createUserFavorite,
} from "@factorio-sites/database";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  await init();

  const { blueprint_page_id } = req.body;

  const session_token = getSessionToken(req);

  if (session_token) {
    const session = await getSessionByToken(session_token);
    if (session) {
      const user = session.user;

      const existing = await isBlueprintPageUserFavorite(user.id, blueprint_page_id);

      if (existing) {
        await existing.destroy();
      } else {
        await createUserFavorite(user.id, blueprint_page_id);
      }

      return res.status(200).json({
        favorite: !existing,
      });
    } else {
      deleteSessionToken(res);
    }
  }

  res.status(404).json({
    auth: null,
  });
};

export default handler;
