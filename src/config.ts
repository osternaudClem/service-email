import dotenv from "dotenv";

import pkg from "../package.json";

type PackageJson = { version: string };

const EnvKeys = Object.freeze({
  NODE_ENV: "NODE_ENV",
  PORT: "PORT",
  GLITCHTIP_DSN: "GLITCHTIP_DSN",
  LOKI_URL: "LOKI_URL",
});

type EnvKey = keyof typeof EnvKeys;

// Load .env into process.env
dotenv.config();

const getEnv = (
  key: EnvKey,
  opts: {
    required?: boolean;
    default?: string;
  } = {}
): string | undefined => {
  const value = process.env[key] ?? opts.default;

  if (opts.required && (!value || value === undefined || value === "")) {
    throw new Error(`Missing required env var ${key}.`);
  }

  return value;
};

export const config = {
  app: {
    port: Number(getEnv("PORT", { default: "3000" })),
    nodeEnv: getEnv("NODE_ENV", { default: "development" }),
    version: (pkg as unknown as PackageJson).version,
  },
  sentry: {
    dsn: getEnv(EnvKeys.GLITCHTIP_DSN),
  },
  loki: {
    url: getEnv(EnvKeys.LOKI_URL),
  },
};
