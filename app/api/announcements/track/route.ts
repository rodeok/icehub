import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { id, type } = await request.json();

        if (!id || !type || !['view', 'click'].includes(type)) {
            return NextResponse.json({ error: 'Invalid tracking data' }, { status: 400 });
        }

        const update = type === 'view' ? { $inc: { views: 1 } } : { $inc: { clicks: 1 } };

        const announcement = await Announcement.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        if (!announcement) {
            return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, views: announcement.views, clicks: announcement.clicks });
    } catch (error: any) {
        console.error('Error tracking announcement activity:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
