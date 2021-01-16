import { NextApiHandler } from "next";
import { init, getSessionByToken } from "@factorio-sites/database";
import { deleteSessionToken, getSessionToken } from "@factorio-sites/node-utils";

const handler: NextApiHandler = async (req, res) => {
  await init();

  const token = getSessionToken(req);

  if (token) {
    const session = await getSessionByToken(token);
    if (session) {
      await session.destroy();
    }
    deleteSessionToken(res);
  }

  res.setHeader("Location", req.query.redirect || "/");
  res.status(302).end();
};

export default handler;
