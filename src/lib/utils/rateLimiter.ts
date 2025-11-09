/**
 * Simple, environment-aware rate limiter for Next.js APIs.
 * Works both in local Node and serverless environments.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (replace with Redis or Upstash in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limiter configuration
 */
const RATE_LIMIT_CONFIG = {
  windowMs: 60_000, // 1 minute window
  maxRequests: process.env.NODE_ENV === 'development' ? 1000 : 10, // higher limit for dev
};

/**
 * Check and update the rate limit for an identifier (e.g. IP)
 */
export function checkRateLimit(identifier: string): {
  success: boolean;
  remaining: number;
  resetTime: number;
} {
  // Skip limiting in dev if desired
  if (process.env.NODE_ENV === 'development') {
    return {
      success: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests,
      resetTime: Date.now() + RATE_LIMIT_CONFIG.windowMs,
    };
  }

  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  // Case 1: First request or window expired
  if (!existing || now > existing.resetTime) {
    const resetTime = now + RATE_LIMIT_CONFIG.windowMs;

    rateLimitStore.set(identifier, { count: 1, resetTime });

    return {
      success: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime,
    };
  }

  // Case 2: Within window, limit exceeded
  if (existing.count >= RATE_LIMIT_CONFIG.maxRequests) {
    console.warn(`[RateLimiter] Limit exceeded for ${identifier}`);
    return {
      success: false,
      remaining: 0,
      resetTime: existing.resetTime,
    };
  }

  // Case 3: Increment count
  existing.count += 1;
  rateLimitStore.set(identifier, existing);

  return {
    success: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - existing.count,
    resetTime: existing.resetTime,
  };
}

/**
 * Clean up expired rate limit entries
 * (Avoid memory leaks during long uptime)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Periodic cleanup (Node/server-side only)
if (typeof window === 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Optional helper to display debug info
 */
export function getRateLimitStatus(identifier: string) {
  const entry = rateLimitStore.get(identifier);
  if (!entry) return null;

  return {
    count: entry.count,
    resetInMs: Math.max(0, entry.resetTime - Date.now()),
    remaining: Math.max(0, RATE_LIMIT_CONFIG.maxRequests - entry.count),
  };
}
