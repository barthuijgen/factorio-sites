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
  entities?: Entity[];
  tiles?: Tile[];
  icons: Icon[];
  item: "blueprint";
  label?: string;
  description?: string;
  /** Mode 'absolute' if 'absolute-snapping' is also present, otherwise 'relative */
  "snap-to-grid"?: { x: number; y: number };
  /** if true 'snap-to-grid' is also present */
  "absolute-snapping"?: boolean;
  /** can only exist in 'absolute' mode. changes offset to the game grid */
  "position-relative-to-grid"?: { x: number; y: number };
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

export interface UpgradePlannerData {
  item: "upgrade-planner";
  label: string;
  seettings: {
    description?: string;
    icons: Icon[];
    mappers: {
      index: number;
      from: { type: string; name: string };
      to: { type: string; name: string };
    }[];
  };
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
    entity_filter_mode?: number;
    tile_selection_mode: number;
    trees_and_rocks_only?: boolean;
  };
  version: number;
}

export interface BlueprintString {
  blueprint: BlueprintData;
  blueprint_book?: never;
  upgrade_planner?: never;
  deconstruction_planner?: never;
}

export interface BlueprintBookString {
  blueprint?: never;
  blueprint_book: BlueprintBookData;
  upgrade_planner?: never;
  deconstruction_planner?: never;
}

export interface UpgradePlannerString {
  blueprint?: never;
  blueprint_book?: never;
  upgrade_planner: UpgradePlannerData;
  deconstruction_planner?: never;
}

export interface DeconstructionPlannerString {
  blueprint?: never;
  blueprint_book?: never;
  upgrade_planner?: never;
  deconstruction_planner: DeconstructionPlannerData;
}

export type BlueprintStringData =
  | BlueprintString
  | BlueprintBookString
  | UpgradePlannerString
  | DeconstructionPlannerString;

export const isBlueprint = (data: BlueprintStringData): data is BlueprintString => !!data.blueprint;

export const isBlueprintBook = (data: BlueprintStringData): data is BlueprintBookString =>
  !!data.blueprint_book;
