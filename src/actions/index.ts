import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const MAILERSEND_API_KEY = import.meta.env.MAILERSEND_API_KEY;
const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL;
const FROM_EMAIL = import.meta.env.FROM_EMAIL;

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Please enter a valid email address"),
      message: z
        .string()
        .min(10, "Please write at least 10 characters")
        .max(5000, "Message must be less than 5000 characters"),
      // Honeypot — hidden from humans, bots fill it. Must stay empty.
      website: z.string().max(0, "Bot detected").optional(),
    }),
    handler: async ({ email, message, website }) => {
      // Silently accept (but don't send) if the honeypot is filled
      if (website) {
        return { success: true };
      }

      const mailerSend = new MailerSend({ apiKey: MAILERSEND_API_KEY });

      const emailParams = new EmailParams()
        .setFrom(new Sender(FROM_EMAIL, "whitfield.dev"))
        .setTo([new Recipient(CONTACT_EMAIL, "Ben Whitfield")])
        .setReplyTo(new Recipient(email))
        .setSubject(`New contact form message from ${email}`)
        .setText(`From: ${email}\n\nMessage:\n${message}`);

      try {
        await mailerSend.email.send(emailParams);
      } catch (error) {
        console.error("Failed to send contact email:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send message. Please try again later.",
        });
      }

      return { success: true };
    },
  }),
};
