/* eslint-disable @typescript-eslint/no-explicit-any */
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import * as WebSocket from "ws";

const fsWriteFile = promisify(fs.writeFile);
const fsExists = promisify(fs.exists);
const CACHE_DIR = path.join(__dirname, "../../../.cache/factorioprints-data");

const getMostFavoriteRequestObject = ({
  lastId,
  lastNumOfFavorites,
}: {
  lastId?: string;
  lastNumOfFavorites?: number;
}) => ({
  t: "d",
  d: {
    r: 2,
    a: "q",
    b: {
      p: "/blueprintSummaries",
      q: { ep: lastNumOfFavorites, en: lastId, l: 61, vf: "r", i: "numberOfFavorites" },
      t: 1,
      h: "",
    },
  },
});

const getBlueprintRequestObject = ({ id }: { id: string }) => ({
  t: "d",
  d: { r: 7, a: "q", b: { p: `/blueprints/${id}`, h: "" } },
});

const openWebsocket = (): Promise<WebSocket> => {
  const ws = new WebSocket("wss://s-usc1c-nss-238.firebaseio.com/.ws?v=5&ns=facorio-blueprints");
  return new Promise((resolve) => {
    ws.on("open", function open() {
      resolve(ws);
    });
    ws.on("error", (error) => {
      console.log("[ws:error]", error);
    });
    ws.on("close", () => {
      console.log("[ws:close]");
    });
  });
};

export async function scanFactorioPrints(page_from: number, page_to: number) {
  const ws = await openWebsocket();

  const sendMessage = (data: any) => {
    const string = JSON.stringify(data);
    console.log("[ws:send]", string);
    ws.send(string);
  };

  const sendMessageAndWaitForResponse = (
    sent_data: any,
    filter: (data: any) => boolean
  ): Promise<any> => {
    return new Promise((resolve) => {
      const buffer = [] as string[];
      const onmessage = (_message: WebSocket.Data) => {
        const message = _message.toString();
        let data;
        try {
          data = JSON.parse(message);
        } catch (e) {
          buffer.push(message);

          if (buffer.length > 1) {
            try {
              data = JSON.parse(buffer.join(""));
              console.log(`\nValid json found after reading ${buffer.length} messages`);
            } catch (e) {
              /**/
            }
          }
          if (!data) return process.stdout.write(buffer.length === 1 ? "Buffering messages." : ".");
        }

        if (filter(data)) {
          ws.off("message", onmessage);
          resolve(data);
        }
      };
      ws.on("message", onmessage);
      sendMessage(sent_data);
    });
  };

  const getMostFavorited = async (
    page = page_from,
    reqObj: Parameters<typeof getMostFavoriteRequestObject>[0]
  ) => {
    const data = await sendMessageAndWaitForResponse(
      getMostFavoriteRequestObject(reqObj),
      (message) => message?.d?.b?.p === "blueprintSummaries" && message.d.b?.d
    );

    const _blueprints = data.d.b.d;
    const ids = Object.keys(_blueprints);

    const blueprints = ids
      .map((id) => ({
        factorioprintsId: id,
        ..._blueprints[id],
      }))
      .sort((a, b) => b.numberOfFavorites - a.numberOfFavorites);

    // First fetch details of each individual blueprint
    for (let i = 0; i < blueprints.length; i++) {
      const blueprint = blueprints[i];
      const file_path = path.join(CACHE_DIR, `blueprint/${blueprint.factorioprintsId}.json`);

      if (await fsExists(file_path)) {
        console.log(`Blueprint ${blueprint.factorioprintsId} exists, skipping...`);
        continue;
      }

      const result = await sendMessageAndWaitForResponse(
        getBlueprintRequestObject({ id: blueprint.factorioprintsId }),
        (data) => data?.d?.b?.p === "blueprints/" + blueprint.factorioprintsId
      );

      const bp = result.d.b.d;
      const hash = crypto.createHash("sha1").update(bp.blueprintString).digest("hex");
      bp.factorioprintsId = blueprint.factorioprintsId;
      bp.hash = hash;
      blueprint.hash = hash;

      console.log(`Writing blueprint /blueprint/${bp.factorioprintsId}.json`);

      fsWriteFile(
        path.join(CACHE_DIR, `blueprint/${bp.factorioprintsId}.json`),
        JSON.stringify(bp, null, 2)
      ).catch((reason) => {
        console.error(reason);
      });
    }

    // Write the result of entire page including the hashes
    console.log(`Writing blueprints /most-fav-json/page${page}.json`);

    fsWriteFile(
      path.join(CACHE_DIR, `most-fav-json/page${page}.json`),
      JSON.stringify(blueprints, null, 2)
    ).catch((reason) => {
      console.error(reason);
    });

    if (page < page_to) {
      const lastBp = blueprints[blueprints.length - 1];
      getMostFavorited(page + 1, {
        lastId: lastBp.id,
        lastNumOfFavorites: lastBp.numberOfFavorites,
      });
    }
  };

  getMostFavorited(1, {});
}
