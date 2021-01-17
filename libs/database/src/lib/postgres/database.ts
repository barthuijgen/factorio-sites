import { Sequelize } from "sequelize";
import { getBlueprintModel } from "./models/Blueprint";
import { getBlueprintBookModel } from "./models/BlueprintBook";
import { getBlueprintPageModel } from "./models/BlueprintPage";
import { getUsertModel } from "./models/User";
import { getSessionModel } from "./models/Session";
import { getEnv, getEnvOrThrow, getSecretOrThrow } from "../env.util";

const _init = async () => {
  const databasePassword = getEnvOrThrow("POSTGRES_PASSWORD");

  const sequelize = new Sequelize({
    dialect: "postgres",
    host: getEnvOrThrow("POSTGRES_HOST"),
    port: 5432,
    database: getEnvOrThrow("POSTGRES_DB"),
    username: getEnvOrThrow("POSTGRES_USER"),
    password: databasePassword.startsWith("projects/")
      ? await getSecretOrThrow(databasePassword)
      : databasePassword,
    define: {
      underscored: true,
      freezeTableName: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    },
  });

  const UserModel = getUsertModel(sequelize);
  const SessionModel = getSessionModel(sequelize);
  const BlueprintModel = getBlueprintModel(sequelize);
  const BlueprintBookModel = getBlueprintBookModel(sequelize);
  const BlueprintPageModel = getBlueprintPageModel(sequelize);

  UserModel.hasMany(SessionModel, { foreignKey: "user_id" });

  SessionModel.belongsTo(UserModel, { foreignKey: "user_id" });

  BlueprintModel.hasMany(BlueprintPageModel, { foreignKey: "blueprint_id" });

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
  UserModel.belongsToMany(BlueprintPageModel, {
    through: "user_favorites",
    as: "favorites",
    foreignKey: "user_id",
    otherKey: "blueprint_page_id",
  });

  // Test database connection, if it fails the method will throw
  if (process.env.NODE_ENV === "development") {
    console.log(`[DB] connecting to database ${sequelize.config.database}`);
    await sequelize.authenticate();
  }

  if (getEnv("SYNCHRONIZE_DB")) {
    const sync_tables = getEnv("SYNCHRONIZE_DB")?.split(",") || [];
    console.log(`[SYNCHRONIZE_DB] syncing database`, { sync_tables });

    for (const key in sequelize.models) {
      if (sync_tables.includes(key) || sync_tables.includes("*")) {
        await sequelize.models[key].sync({ force: true });
      }
    }
  }

  return {
    sequelize,
    UserModel,
    SessionModel,
    BlueprintModel,
    BlueprintBookModel,
    BlueprintPageModel,
  };
};

const promise = _init()
  .then((result) => {
    _sequelize = result.sequelize;
    _UserModel = result.UserModel;
    _SessionModel = result.SessionModel;
    _BlueprintModel = result.BlueprintModel;
    _BlueprintBookModel = result.BlueprintBookModel;
    _BlueprintPageModel = result.BlueprintPageModel;
    return result;
  })
  .catch((reason) => {
    console.log("Database failed to init!", reason);
  });

let _sequelize: Sequelize;
let _UserModel: ReturnType<typeof getUsertModel>;
let _SessionModel: ReturnType<typeof getSessionModel>;
let _BlueprintModel: ReturnType<typeof getBlueprintModel>;
let _BlueprintBookModel: ReturnType<typeof getBlueprintBookModel>;
let _BlueprintPageModel: ReturnType<typeof getBlueprintPageModel>;

export const init = async () => {
  return promise;
};

export const sequelize = () => _sequelize;
export const UserModel = () => _UserModel;
export const SessionModel = () => _SessionModel;
export const BlueprintModel = () => _BlueprintModel;
export const BlueprintBookModel = () => _BlueprintBookModel;
export const BlueprintPageModel = () => _BlueprintPageModel;
