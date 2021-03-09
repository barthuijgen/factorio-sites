import { NextApiHandler } from "next";
import cookie from "cookie";
import { getSteamRedirectUrl } from "../../../utils/openid_steam";
import { COOKIE_SESSION_NAME } from "./return";
import { apiHandler, ApiError } from "../../../utils/api-handler";

const handler: NextApiHandler = apiHandler(async (req, res) => {
  try {
    const host = req.headers.host;
    const cookies = cookie.parse(req.headers.cookie || "");

    if (!host) {
      throw new ApiError(400, "Missing host header");
    }
    if (cookies[COOKIE_SESSION_NAME]) {
      throw new ApiError(400, "User already logged in");
    }
    const protocol = req.headers["x-forwarded-protocol"] === "https" ? "https" : "http";
    const url = await getSteamRedirectUrl(`${protocol}://${host}`);
    console.log({ host, protocol, url });
    res.setHeader("location", url);
    res.status(302).end();
  } catch (reason) {
    console.error("creating steam redirect failed", reason);
    throw new ApiError(500, "Failed to authenticate with steam, please go back and try again.");
  }
});

export default handler;
