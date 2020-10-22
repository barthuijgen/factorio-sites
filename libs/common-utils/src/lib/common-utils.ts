interface Entity {
  entity_number: number;
  name: string;
  position: { x: number; y: number };
}

export interface Blueprint {
  entities: Entity[];
  tiles?: { name: string; position: { x: number; y: number } }[];
  icons: { signal: { type: "item" | "fluid"; name: string } }[];
  item: string;
  label: string;
  description?: string;
  version: number;
}

export interface BlueprintBook {
  active_index: number;
  blueprints: Array<{ index: number } & BlueprintData>;
  item: string;
  label: string;
  description?: string;
  version: number;
}

export interface BlueprintData {
  blueprint_book?: BlueprintBook;
  blueprint?: Blueprint;
}

export const getBlueprintContentForImageHash = (blueprint: Blueprint): string => {
  return JSON.stringify({
    entities: blueprint.entities,
    tiles: blueprint.tiles,
  });
};

export const flattenBlueprintData = (data: BlueprintData) => {
  const blueprints: Blueprint[] = [];
  const books: BlueprintBook[] = [];

  // Recursively go through the string to find all blueprints
  const findAndPushBlueprints = (data: BlueprintData) => {
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

export const findBlueprintByPath = (data: BlueprintData, path: number[]): Blueprint | null => {
  if (path.length === 0) {
    return (data.blueprint || data.blueprint_book?.blueprints[0]) as Blueprint;
  } else if (data.blueprint_book && path.length === 1) {
    return data.blueprint_book.blueprints[path[0]].blueprint as Blueprint;
  }
  return null;
};

export const findActiveBlueprint = (
  data: BlueprintData
): { blueprint: Blueprint; path: number[] } => {
  if (data.blueprint) {
    return { blueprint: data.blueprint, path: [0] };
  } else if (data.blueprint_book) {
    const findActive = (
      book: BlueprintBook,
      _path: number[] = []
    ): { blueprint: Blueprint; path: number[] } => {
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
