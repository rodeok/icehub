import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Program from '@/models/Program';

export async function GET() {
    try {
        await connectDB();

        // 1. All Registered
        const totalRegistered = await User.countDocuments({});

        // 2. Get Frontend and Backend programs
        const [frontendPrograms, backendPrograms] = await Promise.all([
            Program.find({ category: 'frontend' }).select('_id'),
            Program.find({ category: 'backend' }).select('_id')
        ]);

        const frontendIds = frontendPrograms.map(p => p._id);
        const backendIds = backendPrograms.map(p => p._id);

        // 3. Count users in these categories
        const [frontendCount, backendCount] = await Promise.all([
            User.countDocuments({ enrolledPrograms: { $in: frontendIds } }),
            User.countDocuments({ enrolledPrograms: { $in: backendIds } })
        ]);

        return NextResponse.json({
            all: totalRegistered,
            frontend: frontendCount,
            backend: backendCount
        });
    } catch (error: any) {
        console.error('Error fetching announcement stats:', error);
        return NextResponse.json({ error: 'Failed to fetch audience stats' }, { status: 500 });
    }
}
