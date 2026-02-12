import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Program from '@/models/Program';

export async function GET() {
    try {
        await connectDB();

        // Fetch all students
        const users = await User.find({})
            .populate('enrolledPrograms', 'name weeks category')
            .select('fullName email enrolledPrograms')
            .lean();

        // Flatten the data for the UI
        const eligible = users.flatMap((user: any) => {
            if (!user.enrolledPrograms || user.enrolledPrograms.length === 0) {
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
            return user.enrolledPrograms.map((program: any) => ({
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
        console.error('Error fetching eligible students:', error);
        return NextResponse.json({ error: 'Failed to fetch eligibility data' }, { status: 500 });
    }
}
