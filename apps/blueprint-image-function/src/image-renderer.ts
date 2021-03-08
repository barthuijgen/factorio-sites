import { timeLogger } from "@factorio-sites/common-utils";
import * as Puppeteer from "puppeteer";

let BROWSER: Puppeteer.Browser;
let PAGE: Puppeteer.Page;

async function getPage(headless: boolean) {
  if (PAGE) return PAGE;

  const _browser = await Puppeteer.launch({
    headless,
    args: ["--no-sandbox"],
  });

  BROWSER = _browser;

  const [_page] = await BROWSER.pages();
  await _page.goto("https://storage.googleapis.com/factorio-blueprints-assets/fbe/index.html");

  await _page.waitForFunction(`!!window.app_loaded`);

  PAGE = _page;

  return _page;
}

export async function renderImage(blueprint_string: string, options?: { headless: boolean }) {
  const tl = timeLogger("localFbeRenderer");
  const page = await getPage(options?.headless ?? true);

  tl("Page loaded");

  await page.evaluate((string) => {
    return (window as any).pasteBPString(string);
  }, blueprint_string);

  tl("Page string pasted");

  const string = await page.evaluate(
    (): Promise<string> => {
      return new Promise((resolve, reject) => {
        (window as any)
          .savePicture()
          .then((blob: any) => {
            const reader = new FileReader();
            reader.readAsBinaryString(blob);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject("Error occurred while reading binary string");
          })
          .catch(reject);
      });
    }
  );

  const image = Buffer.from(string, "binary");

  tl("Image downloaded from page");

  return image;
}
