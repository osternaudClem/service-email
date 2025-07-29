import { Hono } from "hono";
import {
  sendAfterMeetingEmail,
  sendCancelMeetingEmail,
  sendConfirmationEmail,
  sendUpdateMeetingEmail,
} from "./azelysse.controller";
import { zodErrorHandler } from "../../utils/zodErrors";
import { zValidator } from "@hono/zod-validator";
import {
  AzelysseClientSchema,
  AzelysseMeetingSchema,
} from "./azelysse.schemas";

const router = new Hono();

router.post(
  "/new-meeting",
  zValidator("json", AzelysseMeetingSchema, zodErrorHandler),
  sendConfirmationEmail
);

router.post(
  "/update-meeting",
  zValidator("json", AzelysseMeetingSchema, zodErrorHandler),
  sendUpdateMeetingEmail
);

router.post(
  "/cancel-meeting",
  zValidator("json", AzelysseMeetingSchema, zodErrorHandler),
  sendCancelMeetingEmail
);

router.post(
  "/send-confirmation",
  zValidator("json", AzelysseClientSchema, zodErrorHandler),
  sendAfterMeetingEmail
);

export default router;
