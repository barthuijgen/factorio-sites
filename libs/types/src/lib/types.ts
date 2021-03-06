interface BlueprintChild {
  type: "blueprint";
  id: string;
  name: string;
}

interface BlueprintBookChild {
  type: "blueprint_book";
  id: string;
  name: string;
  children: ChildTree;
}

export type ChildTree = Array<BlueprintChild | BlueprintBookChild>;

export interface Blueprint {
  id: string;
  label: string; // from source
  description: string | null; // from source
  game_version: string | null; // from source
  blueprint_hash: string;
  image_hash: string;
  created_at: number;
  updated_at: number;
  tags: string[];
}

export interface BlueprintBook {
  id: string;
  label: string;
  description?: string;
  child_tree: ChildTree;
  blueprint_hash: string;
  created_at: number;
  updated_at: number;
  is_modded: boolean;
}

/**
 * Blueprint page data object for app use
 * must be JSON serializable
 */
export interface BlueprintPage {
  id: string;
  blueprint_id: string | null;
  blueprint_book_id: string | null;
  title: string;
  description_markdown: string;
  tags: string[];
  image_hash: string;
  created_at: number;
  updated_at: number;
  factorioprints_id: string | null;
  favorite_count?: number;
  // BlueprintPageEntry->BlueprintEntry 1:m
  // BlueprintPageEntry->BlueprintBook 1:m
}
