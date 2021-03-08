import { NextApiHandler } from "next";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { init, prisma } from "@factorio-sites/database";

const handler: NextApiHandler = async (_, res) => {
  await init();

  if (process.env.NODE_ENV === "development") {
    const bp = await prisma.blueprint.findFirst({ where: { id: "uuid" } });
    console.log({ bp });
  }

  res.status(200).end("db sync");
};

export default handler;
