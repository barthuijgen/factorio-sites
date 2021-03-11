// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseDatabaseError = (reason: any): Record<string, string> | null => {
  const errors: Record<string, string> = {};
  console.log(reason);

  if (reason.code === "P2002") {
    reason.meta.target.forEach((field: string) => {
      errors[field] = `${field} is already taken`;
    });
  }

  return Object.keys(errors).length ? errors : null;
};
