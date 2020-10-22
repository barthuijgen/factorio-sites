import { getBlueprintById, saveBlueprintImage } from "@factorio-sites/database";
// import imagemin from "imagemin";
// import imageminWebp from "imagemin-webp";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // Allow the url to be used in the blueprint editor
  if (
    (req.method === "OPTIONS" || req.method === "POST") &&
    req.headers.origin === "https://teoxoy.github.io"
  ) {
    res.setHeader("Access-Control-Allow-Origin", "https://teoxoy.github.io");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
  }
  if (req.method === "OPTIONS") return res.status(200).end();
  else if (req.method !== "POST") {
    return res.status(400).end("Only accepts POST");
  }

  if (req.body.blueprintId && req.body.image) {
    console.log(`store image for blueprint ${req.body.blueprintId}`);
    const buffer = Buffer.from(req.body.image, "base64");
    const buffermin = buffer;
    // const buffermin = await imagemin.buffer(buffer, {
    //   plugins: [imageminWebp({ quality: 50 })],
    // });

    console.log("minified image buffer length", buffermin.byteLength);

    const blueprint = await getBlueprintById(req.body.blueprintId);
    await saveBlueprintImage(blueprint.image_hash, buffermin);
    console.log(`Successfuly saved image ${blueprint.image_hash}`);

    res.setHeader("Content-Type", "text/plain");
    res.status(200).end("ok");
    return;
  }

  res.setHeader("Content-Type", "text/plain");
  res.status(400).end("no post body");
};

export default handler;
