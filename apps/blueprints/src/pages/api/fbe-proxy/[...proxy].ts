import { NextApiHandler } from "next";

const BLOCKED_HEADERS = [
  "content-encoding",
  "connection",
  "server",
  "transfer-encoding",
  "vary",
  "report-to",
  "nel",
  "expect-ct",
  "set-cookie",
  "cache-control",
  "expires",
];

const handler: NextApiHandler = async (req, res) => {
  const path = req.query.proxy ? (req.query.proxy as string[]).join("/") : "";

  const result = await fetch(
    "https://static-fbe.teoxoy.com/file/factorio-blueprint-editor/" + path
  );

  result.headers.forEach((val, key) => {
    if (
      !res.hasHeader(key) &&
      !BLOCKED_HEADERS.includes(key) &&
      !key.startsWith("x-") &&
      !key.startsWith("cf-")
    ) {
      res.setHeader(key, val);
    }
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("cache-control", "max-age=108000");

  if (result.headers.get("content-type") === "application/octet-stream") {
    const output = Buffer.from(await result.arrayBuffer());
    res.end(output);
  } else {
    const text = await result.text();
    res.end(text);
  }
};

export default handler;
