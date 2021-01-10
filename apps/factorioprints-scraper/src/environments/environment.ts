export const environment = {
  production: false,
};

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "D:\\git\\factorio-sites\\credentials\\factorio-sites.json";
process.env.POSTGRES_HOST = "127.0.0.1";
process.env.POSTGRES_DB = "factorio-blueprints";
process.env.POSTGRES_USER = "factorio-blueprints";
process.env.POSTGRES_PASSWORD = "local";
process.env.SYNCHRONIZE_DB = "true";
