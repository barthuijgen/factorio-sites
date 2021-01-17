import { deleteSessionToken } from "@factorio-sites/node-utils";
import { apiHandler } from "../../utils/api-handler";

const handler = apiHandler(async (req, res, { session }) => {
  if (session) {
    await session.destroy();
    deleteSessionToken(res);
  }

  res.setHeader("Location", req.query.redirect || "/");
  res.status(302).end();
});

export default handler;
