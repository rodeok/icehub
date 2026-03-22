import { NextResponse } from 'next/server';
import RateLimit from '@/models/RateLimit';
import connectDB from './mongodb';
import { getAuthSession } from './auth';

export interface RateLimitOptions {
  limit: number;      // Max points in the window
  windowMs: number;   // Window in milliseconds
  endpoint: string;   // Identifier for the endpoint group (e.g., 'subscribe')
}

/**
 * Checks the rate limit for a given request.
 * Returns a NextResponse with 429 status if exceeded, or null if allowed.
 */
export async function checkRateLimit(req: Request, options: RateLimitOptions) {
  try {
    await connectDB();

    // 1. Identify the client (IP or Authenticated User ID)
    const session = await getAuthSession();
    const userId = (session?.user as any)?.id;
    
    // Attempt to get IP from headers, fallback to localhost for dev
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    
    // Priority: User ID (if logged in) > IP Address
    const identifier = userId ? `user:${userId}` : `ip:${ip}`;
    const key = `rate_limit:${options.endpoint}:${identifier}`;

    const now = new Date();
    const expireAt = new Date(now.getTime() + options.windowMs);

    // 2. Atomic increment and upsert
    // If it doesn't exist, create it with points: 1 and expireAt: now + windowMs
    // If it does exist, just increment points
    const limitEntry = await RateLimit.findOneAndUpdate(
      { key },
      { 
        $inc: { points: 1 },
        $setOnInsert: { expireAt }
      },
      { upsert: true, new: true }
    );

    // 3. Check if limit exceeded
    if (limitEntry && limitEntry.points > options.limit) {
      const resetTime = limitEntry.expireAt;
      const retryAfterSeconds = Math.ceil((resetTime.getTime() - now.getTime()) / 1000);
      
      return NextResponse.json(
        { 
          error: 'Too Many Requests', 
          message: `Too many attempts for this action. Please try again in ${retryAfterSeconds} seconds.`,
          retryAfter: retryAfterSeconds
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfterSeconds.toString(),
            'X-RateLimit-Limit': options.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toISOString(),
          }
        }
      );
    }

    // Success: Return null to allow the endpoint to proceed
    // We can also add rate limit headers to the successful response later if needed
    return null;
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail open if rate limiter itself fails, to avoid blocking users
    return null;
  }
}
