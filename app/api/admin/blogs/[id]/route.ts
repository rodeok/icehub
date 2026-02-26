import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function PUT(
    req: NextRequest,
    context: any
) {
    try {
        const { params } = context;
        // next v15+ uses async params
        const resolvedParams = await Promise.resolve(params);
        const { id } = resolvedParams;
        await connectDB();
        const body = await req.json();

        const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBlog);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: any
) {
    try {
        const { params } = context;
        const resolvedParams = await Promise.resolve(params);
        const { id } = resolvedParams;
        await connectDB();

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
