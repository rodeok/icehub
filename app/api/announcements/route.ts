import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';

export async function GET() {
    try {
        await connectDB();
        const announcements = await Announcement.find({ status: 'PUBLISHED' })
            .sort({ createdAt: -1 })
            .limit(5);
        return NextResponse.json(announcements);
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
    }
}
