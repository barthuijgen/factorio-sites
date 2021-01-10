import { DataTypes, UUIDV4, Optional, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface BlueprintPageAttributes {
  id: string;
  blueprint_id?: string;
  blueprint_book_id?: string;
  title: string;
  description_markdown: string;
  factorioprints_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlueprintPageInstance
  extends Model<
      Omit<BlueprintPageAttributes, "created_at" | "updated_at">,
      Optional<BlueprintPageAttributes, "id" | "created_at" | "updated_at">
    >,
    BlueprintPageAttributes {}

export const BlueprintPageModel = sequelize.define<BlueprintPageInstance>(
  "blueprint_page",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    blueprint_id: {
      type: DataTypes.UUID,
    },
    blueprint_book_id: {
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_markdown: {
      type: DataTypes.TEXT,
    },
    factorioprints_id: {
      type: DataTypes.STRING,
    },
  },
  {}
);
