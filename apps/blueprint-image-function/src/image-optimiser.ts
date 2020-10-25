import * as sharp from "sharp";

const RESIZE_ENABLED = false;

// const calculateImageSizeMod = (pixels: number) =>
// Math.min(Math.max((-pixels + 500) / 20500 + 1, 0.3), 1);

const calculateImageSizeMod = (pixels: number) =>
  Math.min(Math.max((-pixels + 3000) / 33000 + 1, 0.3), 1);

export const optimise = async (image: Buffer): Promise<Buffer> => {
  let sharp_image = sharp(image);
  if (RESIZE_ENABLED) {
    const MAX_IMAGE_DIMENTION = 5000;
    sharp_image = await sharp_image
      .metadata()
      .then((meta) => {
        if (
          meta.width &&
          meta.height &&
          (meta.width > MAX_IMAGE_DIMENTION || meta.height > MAX_IMAGE_DIMENTION)
        ) {
          const mod = calculateImageSizeMod(Math.max(meta.width, meta.height));
          console.log({
            width: meta.width,
            height: meta.height,
            mod,
            size_mb: image.byteLength / 1024_000,
          });
          return sharp_image.resize({
            width: Math.round(meta.width * mod),
            height: Math.round(meta.height * mod),
          });
        }
        return sharp_image;
      })
      .then((image) => image.webp({ lossless: true }));
  } else {
    sharp_image = sharp_image.webp({ lossless: true });
  }

  const min_image = await sharp_image.toBuffer();

  console.log({
    input_size_mb: image.byteLength / 1024_000,
    output_size_mb: min_image.byteLength / 1024_000,
  });

  return min_image;
};
