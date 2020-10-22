import * as path from "path";
import * as fs from "fs";
import { promisify } from "util";
import * as Puppeteer from "puppeteer";
import { BlueprintEntry } from "@factorio-sites/database";
import { timeLogger } from "@factorio-sites/common-utils";

const fsMkdir = promisify(fs.mkdir);
const fsStat = promisify(fs.stat);
const fsReadFile = promisify(fs.readFile);

let browser: Puppeteer.Browser;
Puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
}).then((_browser) => (browser = _browser));

async function downloadScreenshot(
  blueprint: BlueprintEntry,
  dir: string,
  on_complete: Promise<any>
) {
  // const browser = await Puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox"],
  // });
  const tl = timeLogger("downloadScreenshot");

  // const [page] = await browser.pages();
  const page = await browser.newPage();

  await (page as any)._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: dir,
  });

  let pageErroredOnBlueprint = false;

  page.on("console", (message) => {
    if (message.type() === "error" && message.text() === "JSHandle@array")
      pageErroredOnBlueprint = true;
  });

  const bp_url = `https://factorio-blueprints-nleb5djksq-ey.a.run.app/api/string/${blueprint.blueprint_hash}`;
  tl(`Opening web page with blueprint_hash ${blueprint.blueprint_hash}`);
  await page.goto("https://teoxoy.github.io/factorio-blueprint-editor/?source=" + bp_url, {
    waitUntil: "load",
  });

  tl(`page load complete`);

  await page.waitForFunction(`!!document.querySelector('.toasts-text')`);

  if (pageErroredOnBlueprint) throw Error("Failed to parse blueprint string");

  tl(`app initialized`);

  await page.focus("canvas");
  await page.keyboard.down("Control");
  await page.keyboard.press("S");
  await page.keyboard.up("Control");

  tl("save image command entered");

  on_complete.finally(() => {
    // browser.close();
    page.close();
  });
}

export async function generateScreenshot(blueprint: BlueprintEntry, _cache_dir?: string) {
  const cache_dir = _cache_dir || path.join(process.cwd(), ".cache/image-downloads");
  const dir = path.join(cache_dir, String(blueprint.id));

  if (!blueprint.blueprint_hash) {
    throw Error("Failed to generate screenshot, no blueprint hash found");
  }

  await fsMkdir(cache_dir).catch((error) => {
    if (error.code !== "EEXIST") throw error;
  });
  await fsMkdir(dir).catch((error) => {
    if (error.code !== "EEXIST") throw error;
  });

  const result = await _generateScreenshot(blueprint, dir);
  // .finally(() => {
  //     fsRmdir(dir, { recursive: true, maxRetries: 3, retryDelay: 100 }).catch((reason) => {
  //       console.log(`clearing directory failed: ${reason.code}`);
  //     });
  // });

  return result;
}

async function _generateScreenshot(blueprint: BlueprintEntry, dir: string) {
  const tl = timeLogger("generateScreenshot");

  const promise = new Promise<string>((resolve, reject) => {
    const watcher = fs.watch(dir, async (type, file) => {
      if (type === "change" && !file.endsWith(".crdownload")) {
        const file_path = path.join(dir, file);
        fsStat(file_path)
          .then(() => resolve(file_path))
          .catch(reject)
          .finally(() => {
            console.log(`closing watcher ${dir}`);
            watcher.close();
          });
      }
    });
  });

  await downloadScreenshot(blueprint, dir, promise);

  const file_path = await promise;

  tl(`Downloaded image ${file_path}`);

  const buffer = await fsReadFile(file_path);

  const buffermin = buffer;
  // const buffermin = await imagemin.buffer(buffer, {
  //   plugins: [imageminWebp({ quality: 50 })],
  // });

  tl("imageminWebp");

  return buffermin;
}
