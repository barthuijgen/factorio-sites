import { NextApiHandler } from "next";
import { init, createUserWithEmail, createSession } from "@factorio-sites/database";
import { setUserToken } from "@factorio-sites/node-utils";
import { parseSequelizeError } from "../../utils/api.utils";

const handler: NextApiHandler = async (req, res) => {
  await init();

  const { email, username, password, password_confirm } = req.body;
  const ip = (req.headers["x-forwarded-for"] || (req as any).ip) as string;
  const useragent = req.headers["user-agent"] as string;

  // Validation
  const errors: Record<string, string> = {};

  if (!email) errors.email = "Required";
  if (!username) errors.username = "Required";
  if (!password) errors.username = "Required";
  if (!password_confirm) errors.password_confirm = "Required";
  if (password !== password_confirm) errors.password_confirm = "Passwords must match";

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  // Create account
  try {
    const user = await createUserWithEmail(email, username, password, ip);
    const session = await createSession(user, useragent, ip);
    setUserToken(res, session.session_token);
    return res.status(201).json({ success: true });
  } catch (reason) {
    const insert_errors = parseSequelizeError(reason);
    if (insert_errors) {
      return res.status(400).json({ errors: insert_errors });
    }
  }

  res.status(401).json({ status: "Failed to register account" });
};

export default handler;
