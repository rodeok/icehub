import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateRequest, schemas } from '@/lib/validation';
import { z } from 'zod';

const subscribeSchema = z.object({
    email: schemas.email
}).strict();

export async function POST(req: Request) {
    try {
        // 1. Rate Limiting (5 requests per 15 minutes)
        const rateLimitResponse = await checkRateLimit(req, {
            endpoint: 'subscribe',
            limit: 5,
            windowMs: 15 * 60 * 1000
        });
        if (rateLimitResponse) return rateLimitResponse;

        // 2. Input Validation & Sanitization
        const body = await req.json();
        const { success, data, errorResponse } = await validateRequest(subscribeSchema, body);
        
        if (!success) {
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const { email } = data as { email: string };

        await connectDB();

        // Check if the subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({ error: 'Email is already subscribed' }, { status: 409 });
        }

        // Create a new subscriber
        await Subscriber.create({ email });

        return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 201 });
    } catch (error: any) {
        console.error('Subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
