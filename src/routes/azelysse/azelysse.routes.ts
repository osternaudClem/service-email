import { Hono } from "hono";
import { sendConfirmationEmail } from "./azelysse.controller";

const router = new Hono();

router.post("/new-metting", sendConfirmationEmail);

export default router;
