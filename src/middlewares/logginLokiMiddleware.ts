import type { MiddlewareHandler } from "hono";
import pino from "pino";
import pinoLoki from "pino-loki";

const logger = pino(
  {
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      log: (object) => object, // allow full object
    },
  },
  pinoLoki({
    batching: true,
    interval: 5,
    host: "http://10.0.0.1:3100",
    labels: { job: "service-email" },
    replaceTimestamp: true,
  })
);

export const logginLokiMiddleware: MiddlewareHandler = async (c, next) => {
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

  // Send to Loki as a JSON string
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
