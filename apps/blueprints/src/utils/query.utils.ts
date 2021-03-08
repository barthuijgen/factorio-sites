export const queryValueAsArray = (value: string | string[] | undefined) => {
  if (value) {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(",");
  }
  return [];
};
