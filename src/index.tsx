import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { routes } from "./routes";
import { logger } from "hono/logger";
import { accessMiddleware } from "./middlewares/accessMiddleware";
import { captureException, flush } from "./instrument";
dotenv.config();

// Extend Hono Context to include custom variables
declare module "hono" {
  interface ContextVariableMap {
    requestBody: unknown;
    ip: string;
  }
}

const app = new Hono();

app.use("*", async (c, next) => {
  let body = null;
  try {
    body = await c.req.json();
  } catch {
    body = { warning: "Body not readable or not JSON" };
  }

  const ip =
    c.req.header("x-forwarded-for") ||
    c.req.header("cf-connecting-ip") ||
    c.req.header("x-real-ip") ||
    "unknown";

  c.set("requestBody", body);
  c.set("ip", ip);

  await next();
});

app.use(logger());
app.use(accessMiddleware());

app.get("/", (c) => {
  return c.text("Email microservice is running!");
});

app.get("/debug-sentry", () => {
  // This will be thrown, caught by your sentryError middleware, and sent to GlitchTip
  throw new Error("Debug Sentry: this error should appear in GlitchTip");
});

app.post("/capture-sentry", async (c) => {
  try {
    // simulate something going wrong
    JSON.parse("this is not valid JSON");
  } catch (err) {
    // captureException(err);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error("Manually captured an exception to GlitchTip");
  }
  return c.text("This will never run");
});

app.route("/", routes);

app.onError(async (err, c) => {
  const ip = c.get("ip");
  const body = c.get("requestBody");

  captureException(err, {
    ip,
    method: c.req.method,
    url: c.req.url,
    headers: c.req.header(),
    body,
  });
  await flush(2000);

  return c.text(err.message ?? "Internal Server Error", 500);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
