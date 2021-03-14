import { useEffect, useState } from "react";

/**
 * Get URL safely without SSR-Hydration problems
 * @returns
 */
export function useUrl() {
  const [url, setUrl] = useState<URL | null>(null);

  useEffect(() => {
    setUrl(new URL(window.location.href));
  }, []);

  return url;
}
