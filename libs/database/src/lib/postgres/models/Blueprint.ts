import { DataTypes, UUIDV4, Optional, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface BlueprintAttributes {
  id: string;
  label?: string;
  description?: string;
  game_version?: string;
  blueprint_hash: string;
  image_hash: string;
  image_version: number;
  tags: string[];
  factorioprints_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlueprintInstance
  extends Model<
      Omit<BlueprintAttributes, "created_at" | "updated_at">,
      Optional<BlueprintAttributes, "id" | "created_at" | "updated_at">
    >,
    BlueprintAttributes {}

export const BlueprintModel = sequelize.define<BlueprintInstance>(
  "blueprint",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    label: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    game_version: {
      type: DataTypes.STRING,
    },
    blueprint_hash: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
    },
    image_hash: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    image_version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      set(value: string[]) {
        this.setDataValue("tags", Array.isArray(value) ? value : []);
      },
    },
    factorioprints_id: {
      type: DataTypes.STRING,
    },
  },
  {}
);
