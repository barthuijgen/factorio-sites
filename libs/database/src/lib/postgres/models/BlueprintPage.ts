import { DataTypes, UUIDV4, Optional, Model, Sequelize } from "sequelize";

interface BlueprintPageAttributes {
  id: string;
  user_id: string | null;
  blueprint_id?: string;
  blueprint_book_id?: string;
  title: string;
  description_markdown: string;
  tags: string[];
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

export const getBlueprintPageModel = (sequelize: Sequelize) => {
  return sequelize.define<BlueprintPageInstance>(
    "blueprint_page",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      blueprint_id: {
        type: DataTypes.UUID,
        unique: true,
      },
      blueprint_book_id: {
        type: DataTypes.UUID,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description_markdown: {
        type: DataTypes.TEXT,
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
    { validate:{
      blueprintOrBook() {
        if (!this.blueprint_id && !this.blueprint_book_id) {
          throw new Error('Must have either a blueprint_id or a blueprint_book_id');
        }
      },
      externalOrInternal() {
        if (!this.user_id && !this.factorioprints_id) {
          throw new Error('Must have either a user_id or a factorioprints_id');
        }
      }
    }}
  );
};
