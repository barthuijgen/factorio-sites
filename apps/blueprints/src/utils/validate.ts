import { AuthContextProps } from "../providers/auth";
import { parseBlueprintStringClient } from "@factorio-sites/web-utils";
const validateEmail = (value: string) => {
  if (!value) {
    return "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Invalid email address";
  }
};

const validateRequired = (value: string) => {
  if (!value) {
    return "Required";
  }
};

const filterUndefined = (errors: Record<string, string | undefined>): Record<string, string> => {
  return Object.keys(errors)
    .filter((key) => errors[key] !== undefined)
    .reduce<Record<string, string>>((obj, key) => {
      obj[key] = errors[key] as string;
      return obj;
    }, {});
};

interface LoginFormValues {
  email: string;
  password: string;
}

export const validateLoginForm = (values: LoginFormValues) => {
  const errors = {} as Partial<LoginFormValues>;
  errors.email = validateEmail(values.email);
  errors.password = validateRequired(values.password);
  return filterUndefined(errors);
};

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
}

export const validateRegisterForm = (values: RegisterFormValues) => {
  const errors = {} as Partial<RegisterFormValues>;
  errors.email = validateEmail(values.email);
  errors.username = validateRequired(values.username);
  errors.password = validateRequired(values.password);

  if (!values.password_confirm) {
    errors.password_confirm = "Required";
  } else if (values.password !== values.password_confirm) {
    errors.password_confirm = "Passwords must be the same";
  }

  return filterUndefined(errors);
};

interface UserFormValues {
  email: string;
  username: string;
}

export const validateUserForm = (auth: AuthContextProps) => (values: UserFormValues) => {
  const errors = {} as Partial<UserFormValues>;

  // Email required if no steam_id
  if (values.email || !auth?.steam_id) {
    errors.email = validateEmail(values.email);
  }
  errors.username = validateRequired(values.username);

  return filterUndefined(errors);
};

interface CreateBlueprintValues {
  title: string;
  description: string;
  string: string;
}

export const validateCreateBlueprintForm = (values: CreateBlueprintValues) => {
  const errors = {} as Partial<CreateBlueprintValues>;
  errors.title = validateRequired(values.title);
  errors.description = validateRequired(values.description);
  errors.string = validateRequired(values.string);

  // If string is set also validate it to be parsable
  if (!errors.string && !parseBlueprintStringClient(values.string)) {
    errors.string = "Not recognised as a blueprint string";
  }

  return filterUndefined(errors);
};
