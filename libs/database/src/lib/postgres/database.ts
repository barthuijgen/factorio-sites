import { PrismaClient } from "@prisma/client";
import { getEnv } from "../env.util";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const url = getEnv("DATABASE_URL")!;

export const prisma = new PrismaClient({
  log: ["warn", "error"],
  datasources: { db: { url } },
});

export const init = async () => {
  await prisma.$connect();
};
