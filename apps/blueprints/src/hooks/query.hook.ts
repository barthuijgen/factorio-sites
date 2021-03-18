import { useRouter } from "next/router";
import { useCallback } from "react";
import { stringifyQuery } from "../utils/query.utils";

export const useRouterQueryToHref = () => {
  const router = useRouter();
  return useCallback(
    (override: Record<string, string | string[] | null>, overrideAll = false) => {
      const query = overrideAll ? override : { ...router.query, ...override };
      return stringifyQuery(query);
    },
    [router]
  );
};
