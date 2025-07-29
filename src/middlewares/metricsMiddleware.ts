import type { MiddlewareHandler } from "hono";
import { Counter } from "prom-client";
import { matchedRoutes, routePath } from "hono/route";

export const httpRequestCounter = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method"],
});

export const httpResponseCounter = new Counter({
  name: "http_responses_total",
  help: "Total number of HTTP responses",
  labelNames: ["status", "path"],
});

/** Prometheus metrics middleware that tracks HTTP requests by methods and responses by status code. */
export const metricsMiddleware: MiddlewareHandler = async (c, next) => {
  if (c.req.path.toLowerCase() === "/metrics") {
    // Skip metrics endpoint to avoid infinite loop.
    return next();
  }

  // HTTP Request.
  const { method } = c.req;
  httpRequestCounter.inc({ method });

  // Wait for other handlers to run.
  await next();

  // HTTP Response.
  const { status } = c.res;
  // Get a parameterized path name like `/posts/:id` instead of `/posts/1234`.
  // Tries to find actual route names first before falling back on potential middleware handlers like `app.use('*')`.
  const path =
    matchedRoutes(c).find((r) => r.method !== "ALL")?.path ?? routePath(c);
  httpResponseCounter.inc({ status, path });
};
