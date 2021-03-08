import { BlueprintBookData, BlueprintData, BlueprintStringData } from "@factorio-sites/types";

export const getBlueprintContentForImageHash = (blueprint: BlueprintData): string => {
  return JSON.stringify({
    entities: blueprint.entities,
    tiles: blueprint.tiles,
  });
};

export const flattenBlueprintData = (data: BlueprintStringData) => {
  const blueprints: BlueprintData[] = [];
  const books: BlueprintBookData[] = [];

  // Recursively go through the string to find all blueprints
  const findAndPushBlueprints = (data: BlueprintStringData) => {
    if (data.blueprint) {
      blueprints.push(data.blueprint);
    } else if (data.blueprint_book) {
      books.push(data.blueprint_book);
      data.blueprint_book.blueprints.forEach(({ index, ...bp }) => {
        findAndPushBlueprints(bp);
      });
    }
  };

  findAndPushBlueprints(data);

  return {
    blueprints,
    books,
  };
};

// export const findBlueprintByPath = (
//   data: BlueprintStringData,
//   path: number[]
// ): BlueprintStringData | null => {
//   if (path.length === 0) {
//     return (data.blueprint || data.blueprint_book?.blueprints[0]) as BlueprintStringData;
//   } else if (data.blueprint_book && path.length === 1) {
//     const result = data.blueprint_book.blueprints[path[0]].blueprint;
//     if (result) return result;
//   }
//   return null;
// };

export const findActiveBlueprint = (
  data: BlueprintStringData
): { blueprint: BlueprintData; path: number[] } => {
  if (data.blueprint) {
    return { blueprint: data.blueprint, path: [0] };
  } else if (data.blueprint_book) {
    const findActive = (
      book: BlueprintBookData,
      _path: number[] = []
    ): { blueprint: BlueprintData; path: number[] } => {
      const active = book.blueprints.find((bp) => bp.index === book.active_index);

      if (active && active.blueprint) {
        return {
          blueprint: active.blueprint,
          path: _path.concat(book.active_index),
        };
      } else if (active && active.blueprint_book) {
        return findActive(active.blueprint_book, _path.concat(book.active_index));
      }

      throw Error("Could not find active blueprint");
    };

    return findActive(data.blueprint_book);
  }
  throw Error("Could not find active blueprint");
};

export const timeLogger = (base_msg: string) => {
  const start_time = Date.now();
  let last_time = Date.now();
  return (message: string) => {
    const now = Date.now();
    console.log(`[${base_msg}] ${message} in ${now - last_time} (${now - start_time} total)`);
    last_time = now;
  };
};
