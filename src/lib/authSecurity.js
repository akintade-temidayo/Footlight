import { createHash, randomInt } from 'crypto';

const rateLimits = globalThis.__footlightAuthRateLimits || new Map();
globalThis.__footlightAuthRateLimits = rateLimits;

export function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  if (password.length > 128) {
    return 'Password must be at most 128 characters.';
  }
  return null;
}

export function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function createResetCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

export function hashResetCode(code) {
  return createHash('sha256').update(String(code)).digest('hex');
}

export function getClientAddress(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export function checkRateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const existing = rateLimits.get(key);

  if (!existing || now >= existing.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearRateLimit(key) {
  rateLimits.delete(key);
}
