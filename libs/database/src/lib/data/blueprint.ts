import { BlueprintData, getBlueprintContentForImageHash } from "@factorio-sites/common-utils";
import { encodeBlueprint, hashString } from "@factorio-sites/node-utils";
// import { getBlueprintImageRequestTopic } from "../gcp-pubsub";
import { saveBlueprintString } from "../gcp-storage";
import { BlueprintModel } from "../postgres/database";
import { BlueprintInstance } from "../postgres/models/Blueprint";
import { Blueprint } from "../types";

// const blueprintImageRequestTopic = getBlueprintImageRequestTopic();

const mapBlueprintInstanceToEntry = (entity: BlueprintInstance): Blueprint => ({
  id: entity.id,
  blueprint_hash: entity.blueprint_hash,
  image_hash: entity.image_hash,
  label: entity.label || "",
  description: entity.description || "",
  tags: entity.tags,
  created_at: entity.created_at && entity.created_at.getTime() / 1000,
  updated_at: entity.updated_at && entity.updated_at.getTime() / 1000,
  game_version: entity.game_version || null,
});

export async function getBlueprintById(id: string): Promise<Blueprint | null> {
  const result = await BlueprintModel()
    .findByPk(id)
    .catch(() => null);
  return result ? mapBlueprintInstanceToEntry(result) : null;
}

export async function getBlueprintByHash(hash: string): Promise<Blueprint | null> {
  const result = await BlueprintModel()
    .findOne({
      where: { blueprint_hash: hash },
    })
    .catch(() => null);
  return result ? mapBlueprintInstanceToEntry(result) : null;
}

export async function createBlueprint(
  blueprint: BlueprintData,
  extraInfo: {
    tags: string[];
    created_at?: number;
    updated_at?: number;
  }
) {
  const string = await encodeBlueprint({ blueprint });
  const blueprint_hash = hashString(string);
  const image_hash = hashString(getBlueprintContentForImageHash(blueprint));

  const exists = await getBlueprintByHash(blueprint_hash);
  if (exists) {
    return { insertedId: exists.id };
  }

  // Write string to google storage
  await saveBlueprintString(blueprint_hash, string);

  // Write blueprint details to datastore
  const result = await BlueprintModel().create({
    label: blueprint.label,
    description: blueprint.description,
    blueprint_hash: blueprint_hash,
    image_hash: image_hash,
    tags: extraInfo.tags,
    game_version: `${blueprint.version}`,
    image_version: 1,
    updated_at: extraInfo.updated_at ? new Date(extraInfo.updated_at * 1000) : undefined,
    created_at: extraInfo.created_at ? new Date(extraInfo.created_at * 1000) : undefined,
  });

  console.log(`Created Blueprint ${result.id}`);

  // blueprintImageRequestTopic.publishJSON({
  //   blueprintId: result.id,
  // });

  return { insertedId: result.id };
}
