import type { NextRequest } from "next/server";
import { getClientMetadata } from "@/lib/security";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  request: NextRequest,
  options: { key?: string; limit?: number; windowMs?: number } = {}
) {
  const { ip } = getClientMetadata(request);
  const key = options.key ? `${options.key}:${ip}` : ip;
  const limit = options.limit ?? 12;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  bucket.count += 1;

  return {
    success: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt
  };
}
