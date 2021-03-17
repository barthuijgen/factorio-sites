export const queryValueAsArray = (value: string | string[] | undefined) => {
  if (value) {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(",");
  }
  return [];
};

export const stringifyQuery = (query: Record<string, string | string[] | null | undefined>) => {
  const keys = Object.keys(query).filter((key) => query[key] !== null);
  const href = keys.length
    ? "/?" +
      Object.keys(query)
        .filter((key) => query[key] !== null)
        .map((key) => `${key}=${query[key]}`)
        .join("&")
    : "/";
  return href;
};
