import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .max(2000)
  .optional()
  .or(z.literal("").transform(() => undefined));

const checkboxBoolean = z.preprocess((value) => {
  if (value === true || value === "true" || value === "on" || value === "1" || value === 1) {
    return true;
  }

  if (
    value === false ||
    value === "false" ||
    value === "off" ||
    value === "0" ||
    value === 0 ||
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return false;
  }

  return value;
}, z.boolean());

export const leadStatuses = [
  "New",
  "Contacted",
  "Interested",
  "Quoted",
  "Follow Up",
  "Won",
  "Lost",
  "Spam"
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: optionalString,
  whatsapp: optionalString,
  serviceInterested: optionalString,
  budget: optionalString,
  eventDate: optionalString,
  location: optionalString,
  message: optionalString,
  leadSource: z.string().trim().max(120).default("Website"),
  utmSource: optionalString,
  utmCampaign: optionalString,
  utmMedium: optionalString,
  marketingConsent: checkboxBoolean.default(false),
  newsletterConsent: checkboxBoolean.default(false),
  consentAccepted: checkboxBoolean.refine(Boolean, "Consent is required")
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  whatsapp: optionalString,
  service: z.string().trim().min(2).max(140),
  date: z.string().trim().min(4).max(80),
  time: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(180),
  budget: optionalString,
  message: optionalString,
  consentAccepted: checkboxBoolean.refine(Boolean, "Consent is required")
});

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(180),
  consentAccepted: checkboxBoolean.refine(Boolean, "Consent is required")
});

export const consentSchema = z.object({
  category: z.enum(["necessary", "analytics", "marketing", "newsletter"]),
  accepted: checkboxBoolean,
  email: optionalString,
  source: z.string().trim().max(120).default("cookie-banner")
});

export const emailComposeSchema = z.object({
  to: z.string().trim().email().max(180),
  subject: z.string().trim().min(2).max(180),
  html: z.string().trim().min(2).max(20_000),
  leadId: optionalString
});

export const gdprRequestSchema = z.object({
  email: z.string().trim().email().max(180),
  consentAccepted: checkboxBoolean.refine(Boolean, "Consent confirmation is required")
});

export type LeadInput = z.infer<typeof leadSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
