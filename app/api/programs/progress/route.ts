
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Progress from '@/models/Progress';

// Save progress
export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { programId, moduleId, lessonId, secondsWatched, status } = body;

        if (!programId || !moduleId || !lessonId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await connectDB();

        const progress = await Progress.findOneAndUpdate(
            {
                userId: session.user.id,
                programId,
                moduleId,
                lessonId
            },
            {
                $set: {
                    secondsWatched: secondsWatched || 0,
                    status: status || 'in_progress',
                    lastWatchedAt: new Date(),
                    ...(status === 'completed' ? { completedAt: new Date() } : {})
                }
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ progress }, { status: 200 });

    } catch (error: any) {
        console.error('Save progress error:', error);
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }
}

// Get progress for a program
export async function GET(req: NextRequest) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const programId = searchParams.get('programId');

        if (!programId) {
            return NextResponse.json({ error: 'Program ID required' }, { status: 400 });
        }

        await connectDB();

        const progress = await Progress.find({
            userId: session.user.id,
            programId
        });

        return NextResponse.json({ progress }, { status: 200 });

    } catch (error: any) {
        console.error('Get progress error:', error);
        return NextResponse.json({ error: 'Failed to get progress' }, { status: 500 });
    }
}
