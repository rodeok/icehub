import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Program from '@/models/Program';

export async function GET() {
    try {
        await connectDB();

        // Ensure models are registered (especially on Vercel cold starts)
        const _userModel = User.modelName;
        const _programModel = Program.modelName;

        // Fetch all students
        const users = await User.find({})
            .populate('enrolledPrograms', 'name weeks category')
            .select('fullName email enrolledPrograms')
            .lean();

        // Flatten the data for the UI
        const eligible = users.flatMap((user: any) => {
            // Filter out any null entries in enrolledPrograms that might occur if a program was deleted
            const validPrograms = (user.enrolledPrograms || []).filter((p: any) => p !== null);

            if (validPrograms.length === 0) {
                // Return a "placeholder" entry for students without programs
                return [{
                    userId: user._id,
                    name: user.fullName,
                    email: user.email,
                    programId: null,
                    programName: 'No Program Assigned',
                    weeks: 0,
                    category: 'None'
                }];
            }
            return validPrograms.map((program: any) => ({
                userId: user._id,
                name: user.fullName,
                email: user.email,
                programId: program._id,
                programName: program.name,
                weeks: program.weeks || 4,
                category: program.category
            }));
        });

        return NextResponse.json(eligible);
    } catch (error: any) {
        console.error('CRITICAL: Error fetching eligible students:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return NextResponse.json({
            error: 'Failed to fetch eligibility data',
            details: error.message
        }, { status: 500 });
    }
}
