import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Progress from '@/models/Progress';
import Program from '@/models/Program';
import { getAuthSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const user = await User.findById(session.user.id)
            .select('-password')
            .populate('enrolledPrograms')
            .populate({ path: 'paidPrograms', strictPopulate: false });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Helper to parse duration like "10:00" to seconds
        const parseDuration = (durationStr: string): number => {
            if (!durationStr) return 0;
            const parts = durationStr.split(':').map(Number);
            if (parts.length === 2) return parts[0] * 60 + parts[1];
            if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
            return parts[0] || 0;
        };

        // Fetch real-time stats
        const progressRecords = await Progress.find({ userId: user._id });

        const lessonsCompleted = progressRecords.filter(p => p.status === 'completed').length;
        const totalSecondsWatched = progressRecords.reduce((acc, p) => acc + (p.secondsWatched || 0), 0);
        const hoursSpent = parseFloat((totalSecondsWatched / 3600).toFixed(1));

        // Get total lessons and calculate granular progress
        let totalLessonsCount = 0;
        let cumulativeProgressValue = 0;
        let assignmentsCount = 0;

        if (user.enrolledPrograms && user.enrolledPrograms.length > 0) {
            const programs = await Program.find({ _id: { $in: user.enrolledPrograms } });

            programs.forEach(program => {
                program.modules?.forEach((module: any) => {
                    assignmentsCount++; // Estimate 1 assignment per module

                    module.lessons?.forEach((lesson: any) => {
                        totalLessonsCount++;

                        // Find progress for this specific lesson
                        const lessonId = lesson._id?.toString() || lesson.id?.toString();
                        const record = progressRecords.find(p => p.lessonId === lessonId);

                        if (record) {
                            if (record.status === 'completed') {
                                cumulativeProgressValue += 1;
                            } else {
                                // Add partial progress based on duration
                                const durationSeconds = parseDuration(lesson.duration);
                                if (durationSeconds > 0) {
                                    const ratio = Math.min(1, (record.secondsWatched || 0) / durationSeconds);
                                    cumulativeProgressValue += ratio;
                                }
                            }
                        }
                    });
                });
            });
        }

        // Default if no programs found
        if (assignmentsCount === 0) assignmentsCount = 0;

        // Calculate granular progress percentage
        const progressPercentage = totalLessonsCount > 0
            ? Math.min(100, Math.round((cumulativeProgressValue / totalLessonsCount) * 100))
            : (user.progress || 0);

        // Update user progress in DB if it changed
        if (progressPercentage !== user.progress) {
            await User.findByIdAndUpdate(user._id, { progress: progressPercentage });
            user.progress = progressPercentage;
        }

        // Calculate upcoming deadlines (Mock estimation based on enrollment date)
        const upcomingDeadlines = 3;

        const stats = {
            lessonsCompleted,
            hoursSpent,
            totalLessons: totalLessonsCount,
            assignments: assignmentsCount,
            upcomingDeadlines,
            progress: user.progress
        };

        return NextResponse.json({ user, stats }, { status: 200 });
    } catch (error: any) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get profile' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const { fullName, phoneNumber, address, experienceLevel, emergencyContactName, emergencyContactPhone } = body;

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            {
                fullName,
                phoneNumber,
                address,
                experienceLevel,
                emergencyContactName,
                emergencyContactPhone
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'Profile updated successfully', user: updatedUser },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update profile' },
            { status: 500 }
        );
    }
}
