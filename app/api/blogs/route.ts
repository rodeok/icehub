import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
    try {
        // Rate limit: 60 requests per 10 minutes
        const rateLimitResponse = await checkRateLimit(req, {
            endpoint: 'blogs-list',
            limit: 60,
            windowMs: 10 * 60 * 1000
        });
        if (rateLimitResponse) return rateLimitResponse;

        await connectDB();
        // Fetch published blogs, sorted by newest first
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error: any) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}
