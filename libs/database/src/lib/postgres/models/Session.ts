import { DataTypes, UUIDV4, Optional, Model, Sequelize } from "sequelize";
import * as crypto from "crypto";

interface SessionAttributes {
  id: string;
  user_id: string;
  session_token: string;
  useragent: string;
  ip: string;
  last_used: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SessionInstance
  extends Model<
      Omit<SessionAttributes, "created_at" | "updated_at">,
      Optional<
        SessionAttributes,
        "id" | "session_token" | "last_used" | "created_at" | "updated_at"
      >
    >,
    SessionAttributes {}

export const getSessionModel = (sequelize: Sequelize) => {
  return sequelize.define<SessionInstance>(
    "session",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      session_token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => crypto.randomBytes(30).toString("base64"),
      },
      useragent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_used: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {}
  );
};
