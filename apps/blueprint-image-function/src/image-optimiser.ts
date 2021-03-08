import * as sharp from "sharp";

// const calculateImageSizeMod = (pixels: number) =>
// Math.min(Math.max((-pixels + 500) / 20500 + 1, 0.3), 1);
// const calculateImageSizeMod = (pixels: number) =>
//   Math.min(Math.max((-pixels + 3000) / 33000 + 1, 0.3), 1);
// const mod = calculateImageSizeMod(Math.max(meta.width, meta.height));

export const optimise = async (image: Buffer, max_dimention = 5000): Promise<Buffer> => {
  const sharp_image = await sharp(image)
    .resize({
      width: max_dimention,
      height: max_dimention,
      fit: sharp.fit.inside,
    })
    .webp({ lossless: true })
    .toBuffer();

  console.log(
    JSON.stringify({
      input_size: `${Math.round(image.byteLength / 1024) / 1000}mb`,
      output_size: `${Math.round(sharp_image.byteLength / 1024) / 1000}mb`,
    })
  );

  return sharp_image;
};
