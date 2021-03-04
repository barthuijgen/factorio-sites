import { PrismaClient } from "@prisma/client";
import { getEnvOrThrow, getSecretOrThrow } from "../env.util";

const _init = async () => {
  if (_prisma) return _prisma;

  const databasePassword = getEnvOrThrow("POSTGRES_PASSWORD");

  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    datasources: {
      db: {
        url: `postgresql://${getEnvOrThrow("POSTGRES_USER")}:${await getSecretOrThrow(
          databasePassword
        )}@${getEnvOrThrow("POSTGRES_HOST")}:5432/${getEnvOrThrow("POSTGRES_DB")}`,
      },
    },
  });

  await prisma.$connect();

  return prisma;
};

const promise = _init()
  .then((result) => {
    _prisma = result;
    return result;
  })
  .catch((reason) => {
    console.log("Database failed to init!", reason);
  });

let _prisma: PrismaClient;

export const init = async () => {
  return promise;
};

export const prisma = () => _prisma;
