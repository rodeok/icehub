import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
    try {
        await connectDB();
        // Fetch published blogs, sorted by newest first
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error: any) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}
