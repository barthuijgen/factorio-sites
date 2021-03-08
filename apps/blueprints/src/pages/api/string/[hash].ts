import { NextApiHandler } from "next";
import { getBlueprintStringByHash } from "@factorio-sites/database";

const handler: NextApiHandler = async (req, res) => {
  if (!req.query.hash) {
    return res.status(400).end("No string hash provided");
  }

  const blueprintString = await getBlueprintStringByHash(req.query.hash as string);

  // Allow the url to be used in the blueprint editor
  if (req.headers.origin === "https://teoxoy.github.io") {
    res.setHeader("Access-Control-Allow-Origin", "https://teoxoy.github.io");
  }
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Content-Type", "text/plain");
  res.status(200).end(blueprintString);
};

export default handler;
