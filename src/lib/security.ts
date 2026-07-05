import type { NextRequest } from "next/server";

export function sanitizeText(value: unknown, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function sanitizeNullableText(value: unknown) {
  const text = sanitizeText(value);
  return text.length > 0 ? text : undefined;
}

export function sanitizeEmail(value: unknown) {
  return sanitizeText(value).toLowerCase();
}

export function getClientMetadata(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";

  return {
    ip,
    browser: request.headers.get("user-agent") || "unknown"
  };
}

export function utmFromRequest(request: NextRequest) {
  const url = new URL(request.url);

  return {
    utmSource: sanitizeNullableText(url.searchParams.get("utm_source")),
    utmCampaign: sanitizeNullableText(url.searchParams.get("utm_campaign")),
    utmMedium: sanitizeNullableText(url.searchParams.get("utm_medium"))
  };
}
