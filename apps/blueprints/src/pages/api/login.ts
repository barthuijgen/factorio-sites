import { NextApiHandler } from "next";
import { init, loginUserWithEmail } from "@factorio-sites/database";
import { setUserToken } from "@factorio-sites/node-utils";

const handler: NextApiHandler = async (req, res) => {
  await init();

  const { email, password } = req.body;
  const ip = (req.headers["x-forwarded-for"] || (req as any).ip) as string;
  const useragent = req.headers["user-agent"] as string;
  const user = await loginUserWithEmail({ email, password, useragent, ip });

  if (user && user.session) {
    setUserToken(res, user.session.session_token);
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ status: "Invalid email and password combination" });
  }
};

export default handler;
