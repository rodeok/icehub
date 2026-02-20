import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Program from '@/models/Program';

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || 'All';

        const query: any = {};

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { uniqueCode: { $regex: search, $options: 'i' } },
            ];
        }

        if (status !== 'All') {
            if (status === 'Active') query.isActive = true;
            if (status === 'Inactive') query.isActive = false;
            // For 'Pending', we could define it as users with no enrolled programs yet
            // or those with isActive=true but something else. 
            // Let's assume Pending means newly registered but maybe not fully active.
            if (status === 'Pending') {
                // Example logic for "Pending": Active but no programs yet
                query.isActive = true;
                query.enrolledPrograms = { $size: 0 };
            }
        }

        const students = await User.find(query)
            .populate('enrolledPrograms')
            .sort({ createdAt: -1 });

        // Debug logging
        console.log(`Fetched ${students.length} students`);

        return NextResponse.json({
            students: students.map(student => ({
                name: student.fullName,
                email: student.email,
                id: student.uniqueCode || student._id.toString().substring(0, 8).toUpperCase(),
                userId: student._id.toString(), // Explicit string conversion
                program: (student.enrolledPrograms[0] as any)?.name || 'Not Enrolled',
                cohort: (student.enrolledPrograms[0] as any)?.curriculum?.[0] || 'N/A', // Using first curriculum item as cohort for now
                enrolled: new Date(student.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                status: student.isActive ? 'ACTIVE' : 'INACTIVE', // Simplify status logic for now
                initial: student.fullName.charAt(0).toUpperCase()
            })),
            total: students.length
        });
    } catch (error: any) {
        console.error('Error fetching students:', error);
        return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, email, id, programId, enrolledOn } = body;

        // Basic validation
        if (!name || !email || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if student already exists
        const existingUser = await User.findOne({ $or: [{ email }, { uniqueCode: id }] });
        if (existingUser) {
            return NextResponse.json({ error: 'Student with this email or ID already exists' }, { status: 400 });
        }

        const newUser = new User({
            fullName: name,
            email,
            uniqueCode: id,
            password: 'defaultPassword123', // Admin created students get a default password
            enrolledPrograms: programId ? [programId] : [],
            createdAt: enrolledOn ? new Date(enrolledOn) : new Date(),
            isActive: true
        });

        await newUser.save();

        if (programId) {
            await Program.findByIdAndUpdate(programId, { $inc: { enrolledCount: 1 } });
        }

        return NextResponse.json({ message: 'Student added successfully', student: newUser });
    } catch (error: any) {
        console.error('Error adding student:', error);
        return NextResponse.json({ error: 'Failed to add student' }, { status: 500 });
    }
}
