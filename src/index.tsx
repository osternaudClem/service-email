import { serve } from "@hono/node-server";
import { Hono } from "hono";

import dotenv from "dotenv";
import { routes } from "./routes";
import { logger } from "hono/logger";
dotenv.config();

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", routes);

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
