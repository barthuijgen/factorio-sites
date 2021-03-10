import { NextApiHandler } from "next";
import cookie from "cookie";
import { getSteamRedirectUrl } from "../../../utils/openid_steam";
import { COOKIE_SESSION_NAME } from "./return";
import { apiHandler, ApiError } from "../../../utils/api-handler";

const handler: NextApiHandler = apiHandler(async (req, res, { url }) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    if (cookies[COOKIE_SESSION_NAME]) {
      throw new ApiError(400, "User already logged in");
    }

    const steam_url = await getSteamRedirectUrl(url);

    res.setHeader("location", steam_url);
    res.status(302).end();
  } catch (reason) {
    console.error("creating steam redirect failed", reason);
    throw new ApiError(500, "Failed to authenticate with steam, please go back and try again.");
  }
});

export default handler;
