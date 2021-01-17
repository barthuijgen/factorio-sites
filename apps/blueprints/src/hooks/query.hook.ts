import { useRouter } from "next/router";
import { useCallback } from "react";

export const useRouterQueryToHref = () => {
  const router = useRouter();
  return useCallback(
    (override: Record<string, string>) => {
      const query = { ...router.query, ...override };
      const href =
        "/?" +
        Object.keys(query)
          .map((key) => `${key}=${query[key]}`)
          .join("&");
      return href;
    },
    [router]
  );
};
