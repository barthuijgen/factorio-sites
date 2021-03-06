import { PrismaClient } from "@prisma/client";
import { getEnvOrThrow, getSecretOrThrow } from "../env.util";

const globalWithPrisma = globalThis as typeof globalThis & { prisma: PrismaClient };

export let prisma: PrismaClient;

const _init = async () => {
  if (globalWithPrisma.prisma) return globalWithPrisma.prisma;

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

  await prismaClient.$connect();

  return prismaClient;
};

const promise = _init()
  .then((result) => {
    prisma = result;
    if (!globalWithPrisma.prisma) {
      globalWithPrisma.prisma = prisma;
    }
    return result;
  })
  .catch((reason) => {
    console.log("Database failed to init!", reason);
  });

export const init = async () => {
  await promise;
  await prisma.$connect();
};
