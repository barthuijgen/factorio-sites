import {
  createSession,
  createUserWithSteam,
  init,
  loginUserWithSteam,
} from "@factorio-sites/database";
import { NextApiHandler } from "next";
import { fetchSteamProfile, steamAuthenticate } from "../../../utils/openid_steam";
import { setUserToken } from "@factorio-sites/node-utils";

export const COOKIE_SESSION_NAME = "session-token";
export const COOKIE_SESSION_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 31536000,
  sameSite: "strict" as const,
};

const handler: NextApiHandler = async (req, res) => {
  console.log({ return_url: req.url });
  if (!req.url) return;

  const steam_id = await steamAuthenticate(req.url);
  const ip = (req.headers["x-forwarded-for"] || (req as any).ip) as string;
  const useragent = req.headers["user-agent"] as string;
  console.log({ steam_id, useragent, ip });

  await init();

  // Attempt log-in
  const user = await loginUserWithSteam(steam_id, ip);

  if (user) {
    const session = await createSession(user, useragent, ip);
    setUserToken(res, session.session_token);
  }
  // First time logging in, make new user
  else {
    const profile = await fetchSteamProfile(steam_id, process.env.STEAM_WEB_API_KEY as string);
    const user = await createUserWithSteam(steam_id, profile.username, ip);

    if (!user) {
      res.status(500).json({ error: "failed to create account with steam provider" });
    }

    const session = await createSession(user, useragent, ip);
    setUserToken(res, session.session_token);
  }

  // Redirect from in browser to let the cookie be stored
  // If not, the first render still happens as guest
  res.setHeader("content-type", "text/html");
  return res.status(200).end(`
      <html><head>
        <meta http-equiv="refresh" content="0;url=${process.env.BASE_URL}" />
      </head></html>
    `);
};

export default handler;
