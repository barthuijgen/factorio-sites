import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["warn", "error"],
});

export const init = async () => {
  await prisma.$connect();
};
