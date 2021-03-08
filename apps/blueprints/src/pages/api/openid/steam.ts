import { NextApiHandler } from "next";
import cookie from "cookie";
import { getSteamRedirectUrl } from "../../../utils/openid_steam";
import { COOKIE_SESSION_NAME } from "./return";

const handler: NextApiHandler = async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    if (cookies[COOKIE_SESSION_NAME]) {
      return res.status(400).json({ error: "User already logged in" });
    }

    const url = await getSteamRedirectUrl();
    res.setHeader("location", url);
    res.status(302).end();
  } catch (reason) {
    console.error("creating steam redirect failed", reason);
    res.status(500).end("Failed to authenticate with steam, please go back and try again.");
  }
};

export default handler;
