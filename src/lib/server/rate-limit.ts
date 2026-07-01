import "server-only";

// In-memory sliding-window rate limiter, shared by any public POST endpoint
// (chat, newsletter signup). Sufficient for a single PM2 process on one VPS —
// no Redis needed at this scale. Resets on process restart, which is
// acceptable here since restarts only happen via manual deploys.

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

export interface RateLimitConfig {
  /** Unique key per limiter instance, e.g. "chat" or "newsletter". */
  key: string;
  /** Max requests allowed within `windowMs`. */
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

/**
 * Checks and records a request against a sliding window for `identifier`
 * (typically an IP address) under the given config. Call once per request.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  const bucketKey = `${config.key}:${identifier}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const bucket = buckets.get(bucketKey) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => t > windowStart);

  if (bucket.timestamps.length >= config.limit) {
    const oldest = bucket.timestamps[0];
    buckets.set(bucketKey, bucket);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: oldest + config.windowMs - now,
    };
  }

  bucket.timestamps.push(now);
  buckets.set(bucketKey, bucket);
  return {
    allowed: true,
    remaining: config.limit - bucket.timestamps.length,
    retryAfterMs: 0,
  };
}

/**
 * Extracts the client IP from a Request, preferring the Nginx-forwarded
 * header. Falls back to a constant so local dev (no proxy in front) doesn't
 * throw — every visitor shares one bucket in that case, which is fine since
 * dev never faces real traffic.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Periodically sweep expired entries so the Map doesn't grow unbounded across
// a long-lived PM2 process. Cheap: only runs every 10 minutes, only touches
// keys that are already candidates for GC anyway.
const SWEEP_INTERVAL_MS = 10 * 60 * 1000;
const MAX_BUCKET_AGE_MS = 24 * 60 * 60 * 1000; // matches the longest window used (daily cap)

setInterval(() => {
  const cutoff = Date.now() - MAX_BUCKET_AGE_MS;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}, SWEEP_INTERVAL_MS).unref();
