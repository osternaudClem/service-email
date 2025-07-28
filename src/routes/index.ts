import { Hono } from "hono";

import azelysseRoutes from "./azelysse/azelysse.routes";

export const routes = new Hono();

routes.route("/azelysse", azelysseRoutes);
