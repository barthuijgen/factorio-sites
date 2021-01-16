import { NextApiHandler } from "next";
import { deleteSessionToken, getSessionToken } from "@factorio-sites/node-utils";
import { init, getSessionByToken } from "@factorio-sites/database";
import { AuthContextProps } from "../../providers/auth";

const handler: NextApiHandler = async (req, res) => {
  await init();

  const session_token = getSessionToken(req);

  if (session_token) {
    const session = await getSessionByToken(session_token);
    if (session) {
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
