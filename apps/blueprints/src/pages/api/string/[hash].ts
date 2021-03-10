import { NextApiHandler } from "next";
import { getBlueprintStringByHash } from "@factorio-sites/database";
import { apiHandler } from "../../../utils/api-handler";

const handler: NextApiHandler = apiHandler(async (req, res) => {
  if (!req.query.hash) {
    return res.status(400).end("No string hash provided");
  }

  const blueprintString = await getBlueprintStringByHash(req.query.hash as string);

  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Content-Type", "text/plain");
  res.status(200).end(blueprintString);
});

export default handler;
