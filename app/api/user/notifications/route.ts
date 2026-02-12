import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Fetch user to get current enrolled programs
        const user = await User.findById((session.user as any).id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch announcements that are either 'all' or for the user's programs
        const notifications = await Announcement.find({
            $or: [
                { targetType: 'all' },
                {
                    targetType: 'program',
                    targetId: { $in: user.enrolledPrograms }
                }
            ],
            status: 'PUBLISHED'
        }).sort({ createdAt: -1 });

        return NextResponse.json(notifications);
    } catch (error: any) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}
