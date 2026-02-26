import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Default to current date string if not provided
        if (!body.date) {
            body.date = new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        }

        // Generate slug from title
        if (body.title && !body.slug) {
            let baseSlug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            // Ensure uniqueness
            let slug = baseSlug;
            let counter = 1;
            while (await Blog.findOne({ slug })) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
            body.slug = slug;
        }

        const newBlog = await Blog.create(body);
        return NextResponse.json(newBlog, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
