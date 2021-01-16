import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const secretManagerClient = new SecretManagerServiceClient();

export const getSecret = async (name: string): Promise<string | null> => {
  const [secret] = await secretManagerClient.accessSecretVersion({ name });
  return secret.payload?.data?.toString() ?? null;
};

export const getSecretOrThrow = async (name: string): Promise<string> => {
  const env = await getSecret(name);
  if (env) return env;
  throw Error(`environment variable ${name} not found`);
};

export const getEnv = (name: string): string | null => {
  return process.env[name] ?? null;
};

export const getEnvOrThrow = (name: string): string => {
  const env = getEnv(name);
  if (env) return env;
  throw Error(`environment variable ${name} not found`);
};
