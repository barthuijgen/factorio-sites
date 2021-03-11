import { useEffect, useState } from "react";
import { createState, useState as useGlobalState } from "@hookstate/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recordMapState = createState<Record<string, any>>({});

export const useFetch = <T>(
  url: string,
  options?: { skip?: boolean }
): { loading: boolean; data: T | null; error: Error | null } => {
  const dataState = useGlobalState(recordMapState);
  const skip = options?.skip ?? false;

  const data = dataState.nested(url).value;

  const [loading, setLoading] = useState(() => !data && !skip);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || data || skip) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        dataState.nested(url).set(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, skip]);

  return { loading, data: data ?? null, error };
};
