import { NextPageContext } from "next";
import { getSessionByToken, init } from "@factorio-sites/database";
import { getSessionToken } from "@factorio-sites/node-utils";

interface GetServerSidePropsReturn {
  props: Record<string, any>;
}

type Await<T> = T extends PromiseLike<infer U> ? Await<U> : T;

interface CustomContext {
  session: Await<ReturnType<typeof getSessionByToken>>;
}

export const pageHandler = (
  fn: (
    context: NextPageContext,
    ctx: CustomContext
  ) => Promise<GetServerSidePropsReturn | undefined>
) => async (context: NextPageContext) => {
  await init();

  const session_token = getSessionToken(context.req);
  const session = session_token ? await getSessionByToken(session_token) : null;

  return fn(context, { session });
};
