import { comment, blueprint, user } from "@prisma/client";
import { Icon, Signal } from "./blueprint-string";

export interface ChildTreeBlueprint {
  type: "blueprint";
  id: string;
  name: string;
}

export interface ChildTreeBlueprintBook {
  type: "blueprint_book";
  id: string;
  name: string;
  children: ChildTree;
}

export type ChildTree = Array<ChildTreeBlueprint | ChildTreeBlueprintBook>;

export interface Blueprint extends Omit<blueprint, "data" | "created_at" | "updated_at"> {
  created_at: number;
  updated_at: number;
  data: DbBlueprintData | null;
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
  user_id: string | null;
  title: string;
  description_markdown: string;
  tags: string[];
  image_hash: string;
  created_at: number;
  updated_at: number;
  factorioprints_id: string | null;
  favorite_count: number;
  user: { id: string; username: string } | null;
  // BlueprintPageEntry->BlueprintEntry 1:m
  // BlueprintPageEntry->BlueprintBook 1:m
}

/**
 * Additional meta data extracted from the blueprint stored in the database as JSON
 */
export interface DbBlueprintData {
  snap_to_grid: { x: number; y: number } | null;
  absolute_snapping: boolean;
  icons: Signal[];
  items: Record<string, number>;
  entities: Record<string, number>;
  recipes: Record<string, number>;
  tiles: Record<string, number>;
}

export type Comment = comment;

export type CommentWithUsername = comment & { user: Pick<user, "username"> };
