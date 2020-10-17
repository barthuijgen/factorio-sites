import { generateScreenshot } from "@factorio-sites/generate-bp-image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler = (req: any, res: any) => void; // Don't want to install express types just for this

export const handler: Handler = async (req, res) => {
  if (!req.query.source) {
    return res.status(400).end("No source string given");
  }
  const string = (req.query.source as string).replace(/ /g, "+");
  const stream = await generateScreenshot(string, "/tmp");
  res.status(200);
  res.setHeader("content-type", "image/png");
  stream.pipe(res);
};
