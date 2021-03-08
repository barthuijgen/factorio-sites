interface Filter {
  count: number;
  index: number;
  singal: { type: string; name: string };
}
interface Entity {
  entity_number: number;
  name: string;
  position: { x: number; y: number };
  recipe?: string;
  items?: Record<string, number>;
  control_behavior?: {
    filters: Filter[];
  };
}

interface Tile {
  name: string;
  position: { x: number; y: number };
}

export type IconSignalTypes = "item" | "fluid" | "virtual";
export type Signal = { type: IconSignalTypes; name: string };
export type Icon = { index: number; signal: Signal };
type WithIndex<T> = { index: number } & T;

export interface BlueprintData {
  entities: Entity[];
  tiles?: Tile[];
  icons: Icon[];
  item: "blueprint";
  label: string;
  description?: string;
  "snap-to-grid": { x: number; y: number };
  "absolute-snapping": boolean;
  version: number;
}

export interface BlueprintBookData {
  active_index: number;
  blueprints: WithIndex<BlueprintStringData>[];
  icons?: Icon[];
  item: "blueprint-book";
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
    icons: Icon[];
    tile_selection_mode: number;
  };
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

export const isBlueprint = (data: BlueprintStringData): data is BlueprintString => !!data.blueprint;

export const isBlueprintBook = (data: BlueprintStringData): data is BlueprintBookString =>
  !!data.blueprint_book;
