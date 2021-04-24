import { AuthContextProps } from "../../providers/auth";
import { apiHandler } from "../../utils/api-handler";

const handler = apiHandler(async (_, res, { session }) => {
  if (session) {
    return res.status(200).json({
      auth: {
        user_id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        steam_id: session.user.steam_id,
        role: session.user.role
      } as AuthContextProps,
    });
  }

  res.status(404).json({
    auth: null,
  });
});

export default handler;
