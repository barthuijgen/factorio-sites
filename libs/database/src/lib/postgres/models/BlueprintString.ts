import { DataTypes, UUIDV4, Optional, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface BlueprintStringAttributes {
  id: string;
  blueprint_id: string;
  blueprint_hash: string;
  image_hash: string;
  version: number;
  changes_markdown: string | null;
  created_at: Date;
  updated_at: Date;
}

interface BlueprintStringInstance
  extends Model<
      Omit<BlueprintStringAttributes, "created_at" | "updated_at">,
      Optional<BlueprintStringAttributes, "id" | "created_at" | "updated_at">
    >,
    BlueprintStringAttributes {}

export const BlueprintStringModel = sequelize.define<BlueprintStringInstance>(
  "blueprint_string",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    blueprint_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    blueprint_hash: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    image_hash: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changes_markdown: {
      type: DataTypes.STRING(40),
    },
  },
  {}
);
