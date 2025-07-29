import { type MiddlewareHandler } from "hono";

export const accessMiddleware = (): MiddlewareHandler => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment variables");
  }

  return async (c, next) => {
    if (c.req.path === "/metrics") {
      return next();
    }
    const clientKey = c.req.header("x-api-key");

    if (!clientKey || clientKey !== apiKey) {
      console.error("Unauthorized access attempt");
      return c.json({ message: "Unauthorized" }, 401);
    }

    await next();
  };
};
