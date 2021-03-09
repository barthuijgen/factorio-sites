import { NextPageContext } from "next";
import { getSessionByToken, init } from "@factorio-sites/database";
import { getSessionToken } from "@factorio-sites/node-utils";

interface GetServerSidePropsReturn {
  props: Record<string, any>;
}

type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;

interface CustomContext {
  session: Await<ReturnType<typeof getSessionByToken>>;
  redirect: (url: string, code?: 301 | 302) => void;
}

export const pageHandler = (
  fn: (
    context: NextPageContext,
    ctx: CustomContext
  ) => Promise<GetServerSidePropsReturn | undefined | void>
) => async (context: NextPageContext) => {
  await init();

  const session_token = getSessionToken(context.req);
  const session = session_token ? await getSessionByToken(session_token) : null;

  const redirect: CustomContext["redirect"] = (url, code = 302) => {
    if (!context.res) throw Error("Missing res in server side context");
    context.res.statusCode = code;
    context.res.setHeader("Location", url);
    context.res.end();
  };

  const result = await fn(context, { session, redirect });
  return result !== undefined ? result : { props: {} };
};
