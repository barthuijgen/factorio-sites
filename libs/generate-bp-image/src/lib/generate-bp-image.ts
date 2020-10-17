import * as Puppeteer from "puppeteer";
import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";
import { promisify } from "util";

const fsMkdir = promisify(fs.mkdir);
const fsStat = promisify(fs.stat);
const fsRmdir = promisify(fs.rmdir);

async function downloadScreenshot(blueprint: string, dir: string, on_complete: Promise<any>) {
  const browser = await Puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const [page] = await browser.pages();

  await (page as any)._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: dir,
  });

  const start = Date.now();

  await page.goto("https://teoxoy.github.io/factorio-blueprint-editor/?source=" + blueprint, {
    waitUntil: "load",
  });
  console.log(`[status] page load complete at ${Date.now() - start}`);

  await page.waitForFunction(`!!document.querySelector('.toasts-text')`);

  console.log(`[status] app initialized at ${Date.now() - start}`);

  await page.click("canvas");
  await page.keyboard.down("Control");
  await page.keyboard.press("S");
  await page.keyboard.up("Control");

  console.log("[status] save image command entered");

  on_complete.finally(() => {
    browser.close();
  });
}

export async function generateScreenshot(blueprint: string, _cache_dir?: string) {
  const start_time = Date.now();
  const hash = crypto.createHash("sha256").update(blueprint).digest("hex");
  const cache_dir = _cache_dir || path.join(process.cwd(), ".cache");
  const dir = path.join(cache_dir, hash);

  await fsMkdir(cache_dir).catch((error) => {
    if (error.code !== "EEXIST") throw error;
  });
  await fsMkdir(dir).catch((error) => {
    if (error.code !== "EEXIST") throw error;
  });

  const promise = new Promise<string>((resolve, reject) => {
    const watcher = fs.watch(dir, async (type, file) => {
      if (type === "change" && !file.endsWith(".crdownload")) {
        const file_path = path.join(dir, file);
        fsStat(file_path)
          .then(() => resolve(file_path))
          .catch(reject)
          .finally(() => watcher.close());
      }
    });
  });

  await downloadScreenshot(blueprint, dir, promise);

  const file_path = await promise;

  console.log(`Downloaded image in ${Date.now() - start_time}ms`, file_path);
  const stream = fs.createReadStream(file_path);
  stream.on("close", () => {
    fsRmdir(dir, { recursive: true }).catch((reason) => console.error(reason));
  });

  return stream;
}
