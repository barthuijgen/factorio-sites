import { PrismaClient } from "@prisma/client";
import { getEnvOrThrow } from "../env.util";

const url = getEnvOrThrow("DATABASE_URL");

export const prisma = new PrismaClient({
  log: ["warn", "error"],
  datasources: { db: { url } },
});

export const init = async () => {
  await prisma.$connect();
};
