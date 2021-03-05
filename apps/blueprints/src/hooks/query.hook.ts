import { useRouter } from "next/router";
import { useCallback } from "react";

export const useRouterQueryToHref = () => {
  const router = useRouter();
  return useCallback(
    (override: Record<string, string | string[] | null>) => {
      const query = { ...router.query, ...override };
      const keys = Object.keys(query).filter((key) => query[key] !== null);
      const href = keys.length
        ? "/?" +
          Object.keys(query)
            .filter((key) => query[key] !== null)
            .map((key) => `${key}=${query[key]}`)
            .join("&")
        : "/";
      return href;
    },
    [router]
  );
};
