import { AuthContextProps } from "../../../providers/auth";
import { parseDatabaseError } from "../../../utils/api.utils";
import { apiHandler } from "../../../utils/api-handler";
import { user } from "@prisma/client";
import { prisma } from "@factorio-sites/database";

const handler = apiHandler(async (req, res, { session }) => {
  if (req.method !== "POST") return res.status(400).json({ error: "method must be POST" });

  const { username, email } = req.body;

  if (session) {
    let user = session.user;
    const update: Partial<user> = {};

    if (username) {
      update.username = username;
    }
    if (email) {
      update.email = email.toLowerCase();
    }
    // User currently has email but wants to delete it, allow if steam_id exists
    else if (user.email && user.steam_id) {
      update.email = null;
    }

    try {
      user = await prisma.user.update({ where: { id: user.id }, data: update });
    } catch (reason) {
      const insert_errors = parseDatabaseError(reason);
      if (insert_errors) {
        return res.status(400).json({ errors: insert_errors });
      }
    }

    return res.status(200).json({
      auth: {
        user_id: user.id,
        username: user.username,
        email: user.email,
        steam_id: user.steam_id,
      } as AuthContextProps,
    });
  }

  res.status(404).json({
    auth: null,
  });
});

export default handler;
