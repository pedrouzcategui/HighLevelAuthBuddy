import { remember } from "@epic-web/remember";
import { Resend } from "resend";

export const resend = remember(
  "resend",
  () => new Resend(process.env.RESEND_API_KEY),
);
