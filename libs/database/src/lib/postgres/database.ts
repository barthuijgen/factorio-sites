import { sequelize } from "./sequelize";
import { BlueprintModel } from "./models/Blueprint";
import { BlueprintStringModel } from "./models/BlueprintString";
import { BlueprintBookModel } from "./models/BlueprintBook";
import { BlueprintPageModel } from "./models/BlueprintPage";

export const init = async () => {
  BlueprintModel.hasOne(BlueprintStringModel, { foreignKey: "blueprint_id" });
  BlueprintModel.hasMany(BlueprintPageModel, { foreignKey: "blueprint_id" });

  BlueprintStringModel.belongsTo(BlueprintModel, { foreignKey: "blueprint_id" });

  BlueprintPageModel.belongsTo(BlueprintModel, { foreignKey: "blueprint_id" });
  BlueprintPageModel.belongsTo(BlueprintBookModel, { foreignKey: "blueprint_book_id" });

  BlueprintBookModel.hasMany(BlueprintPageModel, { foreignKey: "blueprint_book_id" });
  BlueprintBookModel.belongsToMany(BlueprintBookModel, {
    through: "blueprint_book_books",
    as: "blueprint_books",
    foreignKey: "blueprint_book_1_id",
    otherKey: "blueprint_book_2_id",
    timestamps: false,
  });
  BlueprintBookModel.belongsToMany(BlueprintModel, {
    through: "blueprint_book_blueprints",
    as: "blueprints",
    foreignKey: "blueprint_book_id",
    otherKey: "blueprint_id",
    timestamps: false,
  });

  if (process.env.SYNCHRONIZE_DB) {
    console.log(`[SYNCHRONIZE_DB] syncing database ${process.env.POSTGRES_DB}`);
    await BlueprintModel.sync({ force: true });
    await BlueprintStringModel.sync({ force: true });
    await BlueprintBookModel.sync({ force: true });
    await BlueprintPageModel.sync({ force: true });
    await sequelize.models["blueprint_book_books"].sync({ force: true });
    await sequelize.models["blueprint_book_blueprints"].sync({ force: true });

    // SEED
    {
      const bp = await BlueprintModel.create({
        blueprint_hash: "blueprint_hash",
        label: "label",
        image_hash: "image-hash",
        image_version: 1,
        tags: ["tag1"],
      });
      await BlueprintStringModel.create({
        blueprint_hash: "blueprint_hash",
        blueprint_id: bp.id,
        changes_markdown: "markdown",
        image_hash: "image-hash",
        version: 1,
      });
    }
  }

  return sequelize;
};
