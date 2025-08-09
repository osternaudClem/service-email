import type { MiddlewareHandler } from "hono";
import pino from "pino";
import pinoLoki from "pino-loki";
import { config } from "../config";

let logginLokiMiddleware: MiddlewareHandler;

if (!config.loki.url) {
  console.warn(
    "[Loki] Skipping logging middleware — 'LOKI_URL' not set in environment."
  );

  // Just return next() if Loki is disabled
  logginLokiMiddleware = async (_c, next) => {
    await next();
  };
} else {
  const logger = pino(
    {
      base: undefined,
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        log: (object) => object,
      },
    },
    pinoLoki({
      batching: false,
      interval: 5,
      host: config.loki.url,
      labels: { job: "service-email" },
      replaceTimestamp: true,
    })
  );

  logginLokiMiddleware = async (c, next) => {
    const start = Date.now();
    const req = c.req;

    const method = req.method;
    const path = req.path;
    const query = req.query();
    const params = req.param();

    if (path === "/metrics") {
      return await next();
    }

    // Convert headers to plain object
    const headers: Record<string, string> = {};
    for (const [key, value] of req.raw.headers.entries()) {
      headers[key] = value;
    }

    // Parse JSON body if possible
    let body: unknown = null;
    try {
      body = await req.json();
    } catch {}

    // Intercept response body
    let resultBody: unknown = null;
    const originalJson = c.json;
    c.json = (data: unknown, init?: ResponseInit) => {
      resultBody = data;
      // @ts-ignore
      return originalJson.call(c, data, init);
    };

    await next();

    logger.info({
      msg: "HTTP request log",
      method,
      path,
      query,
      params,
      headers,
      body,
      status: c.res.status,
      result: resultBody,
      duration_ms: Date.now() - start,
    });
  };
}

export { logginLokiMiddleware };
