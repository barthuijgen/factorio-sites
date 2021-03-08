interface Entity {
  entity_number: number;
  name: string;
  position: { x: number; y: number };
}

export type IconSignalTypes = "item" | "fluid" | "virtual";
export type FactorioIcon = { index: number; signal: { type: IconSignalTypes; name: string } };

export interface BlueprintData {
  entities: Entity[];
  tiles?: { name: string; position: { x: number; y: number } }[];
  icons: FactorioIcon[];
  item: string;
  label: string;
  description?: string;
  version: number;
}

export interface DeconstructionPlannerData {
  item: "deconstruction-planner";
  label: string;
  settings: {
    entity_filters: {
      index: number;
      name: string;
    }[];
    icons: FactorioIcon[];
    tile_selection_mode: number;
  };
  version: number;
}

export interface BlueprintBookData {
  active_index: number;
  blueprints: Array<
    { index: number; deconstruction_planner?: DeconstructionPlannerData } & BlueprintStringData
  >;
  icons?: FactorioIcon[];
  item: string;
  label: string;
  description?: string;
  version: number;
}

export interface DeconstructionPlannerString {
  deconstruction_planner: DeconstructionPlannerData;
  blueprint?: never;
  blueprint_book?: never;
}

export interface BlueprintString {
  blueprint: BlueprintData;
  blueprint_book?: never;
  deconstruction_planner?: never;
}

export interface BlueprintBookString {
  blueprint_book: BlueprintBookData;
  blueprint?: never;
  deconstruction_planner?: never;
}

export type BlueprintStringData =
  | BlueprintString
  | BlueprintBookString
  | DeconstructionPlannerString;
