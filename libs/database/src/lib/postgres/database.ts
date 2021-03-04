import { PrismaClient } from "@prisma/client";
import { getEnvOrThrow, getSecretOrThrow } from "../env.util";

export let prisma: PrismaClient;

const _init = async () => {
  if (prisma) return prisma;

  const databasePassword = getEnvOrThrow("POSTGRES_PASSWORD");

  const prismaClient = new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: `postgresql://${getEnvOrThrow("POSTGRES_USER")}:${await getSecretOrThrow(
          databasePassword
        )}@${getEnvOrThrow("POSTGRES_HOST")}:5432/${getEnvOrThrow("POSTGRES_DB")}`,
      },
    },
  });

  // const x = await prismaClient.user.create({ data: { username: 1 } });

  await prismaClient.$connect();

  return prismaClient;
};

const promise = _init()
  .then((result) => {
    prisma = result;
    return result;
  })
  .catch((reason) => {
    console.log("Database failed to init!", reason);
  });

export const init = async () => promise;
