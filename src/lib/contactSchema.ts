import { z } from "zod";

export const sectorValues = [
  "chemistry",
  "food",
  "construction",
  "distribution",
  "industry",
  "other",
] as const;

export type Sector = (typeof sectorValues)[number];

export const contactSchema = z.object({
  name: z.string().min(2, "nameRequired"),
  email: z.string().min(1, "emailRequired").email("emailInvalid"),
  company: z.string().min(2, "companyRequired"),
  role: z.string().optional().default(""),
  sector: z.enum(sectorValues).optional(),
  message: z.string().min(10, "messageRequired"),
  // honeypot
  website: z.string().max(0).optional(),
  locale: z.enum(["fr", "en"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
