import { DataTypes, UUIDV4, Optional, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: string;
  email: string | null;
  username: string;
  password: string;
  role: "user" | "moderator" | "admin";
  steam_id: string | null;
  password_reset_token: string | null;
  password_reset_at: Date | null;
  last_password_change: Date;
  last_login_at: Date | null;
  last_login_ip: string;
  email_validated: boolean;
  email_validate_token: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserInstance
  extends Model<
      Omit<UserAttributes, "created_at" | "updated_at">,
      Optional<
        UserAttributes,
        | "id"
        | "role"
        | "steam_id"
        | "email"
        | "password"
        | "password_reset_token"
        | "password_reset_at"
        | "last_password_change"
        | "last_login_at"
        | "email_validated"
        | "email_validate_token"
        | "created_at"
        | "updated_at"
      >
    >,
    UserAttributes {}

export const getUsertModel = (sequelize: Sequelize) => {
  return sequelize.define<UserInstance>(
    "user",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
        set(val: string) {
          this.setDataValue("email", val.toLowerCase().trim());
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "moderator", "admin"),
        defaultValue: "user",
      },
      steam_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      password_reset_token: {
        type: DataTypes.UUID,
      },
      password_reset_at: {
        type: DataTypes.DATE,
      },
      last_password_change: {
        type: DataTypes.DATE,
      },
      last_login_at: {
        type: DataTypes.DATE,
      },
      last_login_ip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIP: true },
      },
      email_validated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      email_validate_token: {
        type: DataTypes.UUID,
      },
    },
    {}
  );
};
