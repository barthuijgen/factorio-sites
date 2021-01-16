import { ValidationErrorItem } from "sequelize/types";

export const parseSequelizeError = (reason: any): Record<string, string> | null => {
  const errors: Record<string, string> = {};

  if (Array.isArray(reason.errors)) {
    reason.errors.forEach((error: ValidationErrorItem) => {
      if (error.type === "unique violation") {
        errors[error.path] = `${error.path} is alraedy taken.`;
      }
    });
    if (Object.keys(errors).length) {
      return errors;
    }
  }

  return null;
};
