import { NextApiHandler } from "next";
import { deleteSessionToken, getSessionToken } from "@factorio-sites/node-utils";
import { init, getSessionByToken } from "@factorio-sites/database";
import { AuthContextProps } from "../../../providers/auth";
import { parseSequelizeError } from "../../../utils/api.utils";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  await init();

  const { username, email } = req.body;

  const session_token = getSessionToken(req);

  if (session_token) {
    const session = await getSessionByToken(session_token);
    if (session) {
      const user = session.user;
      if (username) {
        user.set("username", username);
      }
      if (email) {
        user.set("email", email);
      } else if (user.get("email") && user.get("steam_id")) {
        // User currently has email but wants to delete it, allow if steam_id exists
        user.set("email", null);
      }
      try {
        await user.save();
      } catch (reason) {
        const insert_errors = parseSequelizeError(reason);
        if (insert_errors) {
          return res.status(400).json({ errors: insert_errors });
        }
      }

      return res.status(200).json({
        auth: {
          user_id: session.user.get("id"),
          username: session.user.get("username"),
          email: session.user.get("email"),
          steam_id: session.user.get("steam_id"),
        } as AuthContextProps,
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
