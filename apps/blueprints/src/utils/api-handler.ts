import { NextApiRequest, NextApiResponse } from "next";
import { getSessionByToken, init } from "@factorio-sites/database";
import { deleteSessionToken, getSessionToken, jsonReplaceErrors } from "@factorio-sites/node-utils";

type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;

interface CustomContext {
  session: Await<ReturnType<typeof getSessionByToken>>;
  ip: string;
  useragent: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: Record<string, unknown>
  ) {
    super(message);
  }
  toJSON() {
    return { ...this.data, status: this.status, message: this.message };
  }
}

export const apiHandler = (
  fn: (req: NextApiRequest, res: NextApiResponse, ctx: CustomContext) => Promise<any>
) => async (req: NextApiRequest, res: NextApiResponse) => {
  await init();

  const ip = (req.headers["x-forwarded-for"] || (req as any).ip) as string;
  const useragent = req.headers["user-agent"] as string;

  const session_token = getSessionToken(req);
  const session = session_token ? await getSessionByToken(session_token) : null;

  if (session_token && !session) {
    deleteSessionToken(res);
  }

  return fn(req, res, { session, ip, useragent }).catch((error) => {
    if (error instanceof ApiError) {
      res.status(error.status).send(JSON.stringify({ error }));
    } else if (process.env.NODE_ENV === "development") {
      res.status(500).send(JSON.stringify({ error }, jsonReplaceErrors));
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
