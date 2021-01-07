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
type ChildTree = Array<BlueprintChild | BlueprintBookChild>;

export interface BlueprintEntry {
  id: string;
  label: string; // from source
  description: string | null; // from source
  game_version: number; // from source
  blueprint_hash: string;
  image_hash: string;
  created_at: number;
  updated_at: number;
  tags: string[];
  factorioprints_id?: string;
  // BlueprintEntry->BlueprintString 1:m
  // BlueprintEntry->BlueprintPageEntry n:m
}

export interface BlueprintBookEntry {
  id: string;
  label: string;
  description?: string;
  /** strings as keys of BlueprintEntry */
  blueprint_ids: string[];
  /** strings as keys of BlueprintBookEntry (currently unsupported) */
  blueprint_book_ids: string[];
  child_tree: ChildTree;
  blueprint_hash: string;
  created_at: number;
  updated_at: number;
  is_modded: boolean;
  factorioprints_id?: string;
  // BlueprintBook:BlueprintBook n:m
  // BlueprintBook:BlueprintEntry 1:m
}

export interface BlueprintPageEntry {
  id: string;
  blueprint_id?: string;
  blueprint_book_id?: string;
  title: string;
  description_markdown: string;
  created_at: number;
  updated_at: number;
  factorioprints_id?: string;
  // BlueprintPageEntry->BlueprintEntry 1:m
  // BlueprintPageEntry->BlueprintBook 1:m
}

export interface BlueprintStringEntry {
  blueprint_id: string;
  blueprint_hash: string;
  image_hash: string;
  version: number;
  changes_markdown: string;
  created_at: Date;
  // BlueprintString->BlueprintEntry m:1
}
