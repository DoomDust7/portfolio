import { NextRequest, NextResponse } from "next/server";

/*
 * Sliding window counter rate limiter (Alex Xu, System Design Interview Ch. 4).
 * Limit: 3 requests per hour per IP. Returns 429 with Retry-After on breach.
 * Uses in-memory Map — sufficient for single-instance Vercel serverless.
 */
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const windowMap = new Map<string, number[]>();

function slidingWindowAllow(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (windowMap.get(ip) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= LIMIT) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    windowMap.set(ip, timestamps);
    return { allowed: false, retryAfter };
  }

  timestamps.push(now);
  windowMap.set(ip, timestamps);
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfter } = slidingWindowAllow(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(LIMIT),
          "X-RateLimit-Window": "3600s",
        },
      }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // In production: integrate Resend, SendGrid, or similar.
  // For now, log the contact and return success.
  console.log(`Contact from ${body.name} <${body.email}>: ${body.message}`);

  return NextResponse.json({ ok: true });
}
