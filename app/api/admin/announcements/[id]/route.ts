import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

        if (!deletedAnnouncement) {
            return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Announcement deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting announcement:', error);
        return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
    }
}
