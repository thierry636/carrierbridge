import { z } from "zod";

/** Matches the options offered on the contact page — everything priced by scope. */
export const subjectValues = [
  "business",
  "enterprise",
  "secure",
  "connectors",
  "tender",
  "other",
] as const;

export const budgetValues = [
  "under100k",
  "100k500k",
  "500k1m",
  "1m3m",
  "over3m",
] as const;

export type Subject = (typeof subjectValues)[number];
export type Budget = (typeof budgetValues)[number];

export const contactSchema = z.object({
  name: z.string().min(2, "name"),
  email: z.string().min(1, "email").email("email"),
  company: z.string().min(2, "company"),
  role: z.string().max(120).optional().default(""),
  phone: z.string().max(40).optional().default(""),
  subject: z.enum(subjectValues, { errorMap: () => ({ message: "subject" }) }),
  budget: z.enum(budgetValues).optional(),
  message: z.string().min(10, "message"),
  consent: z.literal(true, { errorMap: () => ({ message: "consent" }) }),
  /** Honeypot: bots fill it, people never see it. */
  website: z.string().max(0).optional(),
  locale: z.enum(["fr", "en"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
