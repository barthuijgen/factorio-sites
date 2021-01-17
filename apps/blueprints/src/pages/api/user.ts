import { AuthContextProps } from "../../providers/auth";
import { apiHandler } from "../../utils/api-handler";

const handler = apiHandler(async (_, res, { session }) => {
  if (session) {
    return res.status(200).json({
      auth: {
        user_id: session.user.get("id"),
        username: session.user.get("username"),
        email: session.user.get("email"),
        steam_id: session.user.get("steam_id"),
      } as AuthContextProps,
    });
  }

  res.status(404).json({
    auth: null,
  });
});

export default handler;
