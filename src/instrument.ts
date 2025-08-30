import {
  init,
  captureException as sentryCapture,
  flush as sentryFlush,
  setTag as sentrySetTag,
  setUser,
  setContext,
  Scope,
} from "@sentry/node";

import { config } from "./config";

const hasDsn = Boolean(config.sentry.dsn);

if (hasDsn) {
  init({
    dsn: config.sentry.dsn,
    environment: config.app.nodeEnv,
    release: config.app.version || undefined,
    tracesSampleRate: 1.0,
  });
} else {
  console.warn("⚠️ Sentry DSN not provided, Sentry is disabled");
}

type ContextInfo = {
  ip?: string;
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

export const captureException = (
  error: unknown,
  context?: ContextInfo
): void => {
  if (!hasDsn) return;

  if (context?.ip) {
    setUser({ ip_address: context.ip });
  }

  if (context) {
    setContext("request", {
      method: context.method,
      url: context.url,
      headers: context.headers,
      body: context.body,
    });
  }

  sentryCapture(error);
};

export function flush(timeout?: number): Promise<boolean> {
  return hasDsn ? sentryFlush(timeout) : Promise.resolve(true);
}

export function setTag(key: string, value: string): void {
  if (hasDsn) {
    sentrySetTag(key, value);
  }
}
