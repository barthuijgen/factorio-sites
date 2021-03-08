import { loginUserWithEmail } from "@factorio-sites/database";
import { setUserToken } from "@factorio-sites/node-utils";
import { apiHandler } from "../../utils/api-handler";

const handler = apiHandler(async (req, res, { session, ip, useragent }) => {
  if (session) {
    return res.status(400).json({ status: "Already logged in" });
  }

  const { email, password } = req.body;

  const user = await loginUserWithEmail({ email, password, useragent, ip });

  if (user && user.session) {
    setUserToken(res, user.session.session_token);
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ status: "Invalid email and password combination" });
  }
});

export default handler;
