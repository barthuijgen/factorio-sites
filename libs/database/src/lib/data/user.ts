import * as bcrypt from "bcrypt";
import { prisma } from "../postgres/database";
import { SessionInstance } from "../postgres/models/Session";
import { UserInstance } from "../postgres/models/User";

export const getUserById = async (id: string) => {
  const user = await prisma().user.findUnique({ where: { id } });
  return user ? user : null;
};

export const createUserWithEmail = async (
  email: string,
  username: string,
  password: string,
  ip: string
) => {
  const hash = await bcrypt.hash(password, 10);
  return prisma().user.create({
    data: {
      email,
      username,
      password: hash,
      last_login_ip: ip,
      last_password_change: new Date(),
    },
  });
};

export const createUserWithSteam = async (steam_id: string, username: string, ip: string) => {
  return prisma().user.create({
    data: {
      steam_id,
      username,
      last_login_ip: ip,
    },
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
  const user = await prisma().user.findUnique({ where: { email } });
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
  const user = await prisma().user.findUnique({ where: { steam_id } });
  if (!user) {
    return false;
  }
  await prisma().user.update({
    where: { steam_id },
    data: {
      last_login_ip: ip,
      last_login_at: new Date(),
    },
  });
  return user;
};

export const createSession = async (user: UserInstance, useragent: string, ip: string) => {
  return prisma().session.create({
    datta: {
      user_id: user.id,
      useragent,
      ip,
    },
  });
};

export const getSessionByToken = async (token: string) => {
  return await prisma().session.findUnique({
    where: { session_token: token },
    include: {
      user: true,
    },
  });
};

export const isBlueprintPageUserFavorite = async (user_id: string, blueprint_page_id: string) => {
  const { user_favorites } = prisma();
  return user_favorites.findFirst({ where: { user_id, blueprint_page_id } });
};

export const createUserFavorite = async (user_id: string, blueprint_page_id: string) => {
  const { user_favorites } = prisma();
  return user_favorites.create({
    data: {
      user_id,
      blueprint_page_id,
    },
  });
};
