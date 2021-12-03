import * as bcrypt from "bcrypt";
import { session, user } from "@prisma/client";
import { prisma } from "../postgres/database";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? user : null;
};

export const createUserWithEmail = async (
  email: string,
  username: string,
  password: string,
  ip: string
) => {
  const hash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      username,
      password: hash,
      last_login_ip: ip,
      last_password_change: new Date(),
    },
  });
};

export const createUserWithSteam = async (steam_id: string, username: string, ip: string) => {
  return prisma.user.create({
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
}): Promise<(user & { session: session }) | null> => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user || !user.password) {
    return null;
  }
  const password_valid = await bcrypt.compare(password, user.password);
  if (password_valid) {
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_ip: ip, last_login_at: new Date() },
    });
    const session = await createSession(user, useragent, ip);
    return Object.assign(user, { session });
  }
  return null;
};

export const loginUserWithSteam = async (steam_id: string, ip: string) => {
  const user = await prisma.user.findUnique({ where: { steam_id } });
  if (!user) {
    return false;
  }
  await prisma.user.update({
    where: { steam_id },
    data: {
      last_login_ip: ip,
      last_login_at: new Date(),
    },
  });
  return user;
};

export const createSession = async (user: user, useragent: string, ip: string) => {
  return prisma.session.create({
    data: {
      last_used: new Date(),
      user_id: user.id,
      useragent,
      ip,
    },
  });
};

export const getSessionByToken = async (token: string) => {
  if (token.length !== 36 && token.length !== 32) return null;
  return await prisma.session.findUnique({
    where: { session_token: token },
    include: {
      user: true,
    },
  });
};

export const isBlueprintPageUserFavorite = async (user_id: string, blueprint_page_id: string) => {
  const { user_favorites } = prisma;
  return user_favorites.findFirst({ where: { user_id, blueprint_page_id } });
};

export const createUserFavorite = async (user_id: string, blueprint_page_id: string) => {
  const { user_favorites } = prisma;
  return user_favorites.create({
    data: {
      user_id,
      blueprint_page_id,
    },
  });
};
