import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const path = req.query.proxy ? (req.query.proxy as string[]).join("/") : "";

  console.log("[fbe-proxy]", path);

  const result = await fetch(
    "https://static-fbe.teoxoy.com/file/factorio-blueprint-editor/" + path
  );

  res.setHeader("Access-Control-Allow-Origin", "*");

  result.headers.forEach((val, key) => {
    if (
      !res.hasHeader(key) &&
      !["content-encoding", "connection", "server", "transfer-encoding", "vary"].includes(key)
    ) {
      res.setHeader(key, val);
    }
  });

  if (result.headers.get("content-type") === "application/octet-stream") {
    const output = Buffer.from(await result.arrayBuffer());
    res.end(output);
  } else {
    const text = await result.text();
    res.end(text);
  }
};

export default handler;
