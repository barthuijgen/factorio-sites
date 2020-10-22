import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import {
  getBlueprintPageByFactorioprintsId,
  saveBlueprintFromFactorioprints,
} from "@factorio-sites/database";

const fsReadFile = promisify(fs.readFile);
const CACHE_DIR = path.join(__dirname, "../../../.cache");

export async function writeToDatastore() {
  const filecontent = await fsReadFile(path.join(CACHE_DIR, `most-fav-json/page1.json`), "utf8");
  const data = JSON.parse(filecontent);

  for (let i = 0; i < data.length; i++) {
    const bpfilecontent = await fsReadFile(
      path.join(CACHE_DIR, `blueprint/${data[i].factorioprintsId}.json`),
      "utf8"
    );
    const bp = JSON.parse(bpfilecontent);

    const exists = await getBlueprintPageByFactorioprintsId(bp.factorioprintsId);
    if (exists) {
      console.log(`entity ${bp.factorioprintsId} already exists`);
      continue;
    }

    await saveBlueprintFromFactorioprints(
      {
        title: bp.title,
        factorioprints_id: bp.factorioprintsId,
        description_markdown: bp.descriptionMarkdown,
        tags: bp.tags ? Object.values(bp.tags) : [],
        updated_at: bp.lastUpdatedDate / 1000,
        created_at: bp.createdDate / 1000,
      },
      bp.blueprintString
    ).catch((reason) => {
      console.error(reason);
    });

    console.log(`saved entity ${bp.factorioprintsId} to database`);
  }
}
