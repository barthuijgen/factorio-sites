import * as bcrypt from "bcrypt";
import { sequelize, SessionModel, UserModel } from "../postgres/database";
import { SessionInstance } from "../postgres/models/Session";
import { UserInstance } from "../postgres/models/User";

export const getUserById = async (id: string) => {
  const user = await UserModel().findByPk(id, { raw: true });
  return user ? user : null;
};

export const createUserWithEmail = async (
  email: string,
  username: string,
  password: string,
  ip: string
) => {
  const hash = await bcrypt.hash(password, 10);
  return UserModel().create({
    email,
    username,
    password: hash,
    last_login_ip: ip,
    last_password_change: new Date(),
  });
};

export const createUserWithSteam = async (steam_id: string, username: string, ip: string) => {
  return UserModel().create({
    steam_id,
    username,
    last_login_ip: ip,
  });
};

export const loginUserWithEmail = async ({
  email,
  password,
  useragent,
  ip,
}: {
  email: string;
  password: string;
  useragent: string;
  ip: string;
}): Promise<(UserInstance & { session: SessionInstance }) | null> => {
  const user = await UserModel().findOne({ where: { email } });
  if (!user) {
    return null;
  }
  const password_valid = await bcrypt.compare(password, user.password);
  if (password_valid) {
    await user.update({
      last_login_ip: ip,
      last_login_at: new Date(),
    });
    const session = await createSession(user, useragent, ip);
    (user as any).session = session;
    return user as any;
  }
  return null;
};

export const loginUserWithSteam = async (steam_id: string, ip: string) => {
  const user = await UserModel().findOne({ where: { steam_id } });
  if (!user) {
    return false;
  }
  await user.update({
    last_login_ip: ip,
    last_login_at: new Date(),
  });
  return user;
};

export const createSession = async (user: UserInstance, useragent: string, ip: string) => {
  return SessionModel().create({
    user_id: user.id,
    useragent,
    ip,
  });
};

export const getSessionByToken = async (
  token: string
): Promise<(SessionInstance & { user: UserInstance }) | null> => {
  return SessionModel().findOne<any>({
    where: { session_token: token },
    include: [UserModel()],
  });
};

export const isBlueprintPageUserFavorite = async (user_id: string, blueprint_page_id: string) => {
  const UserFavorites = sequelize().models.user_favorites;
  return UserFavorites.findOne({
    where: { user_id, blueprint_page_id },
  });
};

export const createUserFavorite = async (user_id: string, blueprint_page_id: string) => {
  const UserFavorites = sequelize().models.user_favorites;
  return UserFavorites.create({
    user_id,
    blueprint_page_id,
  });
};
