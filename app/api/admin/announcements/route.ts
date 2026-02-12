import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';

export async function GET() {
    try {
        await connectDB();
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        return NextResponse.json(announcements);
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const { title, message, targetType, targetId, targetName, status } = body;

        if (!title || !message) {
            return NextResponse.json({ error: 'Title and message are required' }, { status: 400 });
        }

        const newAnnouncement = new Announcement({
            title,
            message,
            targetType,
            targetId: targetId || null,
            targetName: targetName || 'All Students',
            status: status || 'PUBLISHED',
        });

        await newAnnouncement.save();

        return NextResponse.json(newAnnouncement, { status: 201 });
    } catch (error: any) {
        console.error('Error creating announcement:', error);
        return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
    }
}
