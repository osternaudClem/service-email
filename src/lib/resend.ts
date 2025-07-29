import { Resend } from "resend";

import dotenv from "dotenv";
dotenv.config();

if (typeof process === "undefined" || !process.env.RESEND_KEY) {
  throw new Error("RESEND_KEY is not defined in the environment variables.");
}

export const resend = new Resend(process.env.RESEND_KEY);
