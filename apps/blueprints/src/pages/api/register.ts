import { createUserWithEmail, createSession } from "@factorio-sites/database";
import { setUserToken } from "@factorio-sites/node-utils";
import { parseSequelizeError } from "../../utils/api.utils";
import { apiHandler } from "../../utils/api-handler";

const handler = apiHandler(async (req, res, { session, ip, useragent }) => {
  if (session) {
    return res.status(400).json({ status: "Already logged in" });
  }

  const { email, username, password, password_confirm } = req.body;

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
});

export default handler;
