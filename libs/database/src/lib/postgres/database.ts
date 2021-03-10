import { PrismaClient } from "@prisma/client";
import { getEnvOrThrow, getSecretOrThrow } from "../env.util";

const globalWithPrisma = globalThis as typeof globalThis & { prisma: PrismaClient };

export let prisma: PrismaClient;

const _init = async () => {
  if (globalWithPrisma.prisma) return globalWithPrisma.prisma;

  const host = getEnvOrThrow("POSTGRES_HOST");
  const user = getEnvOrThrow("POSTGRES_USER");
  const database = getEnvOrThrow("POSTGRES_DB");
  const passwordKey = getEnvOrThrow("POSTGRES_PASSWORD");
  const password = passwordKey.startsWith("projects/")
    ? await getSecretOrThrow(passwordKey)
    : passwordKey;

  const prismaClient = new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: `postgresql://${user}:${password}@${host}:5432/${database}`,
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
    if (process.env.JEST_WORKER_ID) return;
    console.log("Database failed to init!", reason);
  });

export const init = async () => {
  await promise;
  await prisma.$connect();
};
