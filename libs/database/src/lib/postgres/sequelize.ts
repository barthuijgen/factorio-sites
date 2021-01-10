import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  define: {
    underscored: true,
    freezeTableName: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  },
});
