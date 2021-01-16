import { DataTypes, UUIDV4, Optional, Model, Sequelize } from "sequelize";
import { ChildTree } from "../../types";

interface BlueprintBookAttributes {
  id: string;
  user_id: string | null;
  label: string;
  description?: string;
  child_tree: ChildTree;
  blueprint_hash: string;
  is_modded: boolean;
  factorioprints_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlueprintBookInstance
  extends Model<
      Omit<BlueprintBookAttributes, "created_at" | "updated_at">,
      Optional<BlueprintBookAttributes, "id" | "created_at" | "updated_at">
    >,
    BlueprintBookAttributes {}

export const getBlueprintBookModel = (sequelize: Sequelize) => {
  return sequelize.define<BlueprintBookInstance>(
    "blueprint_book",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      label: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      child_tree: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      blueprint_hash: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      is_modded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      factorioprints_id: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
};
