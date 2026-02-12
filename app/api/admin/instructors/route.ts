import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Instructor from '@/models/Instructor';

export async function GET() {
    try {
        await connectDB();
        const instructors = await Instructor.find({}).sort({ createdAt: -1 });
        return NextResponse.json(instructors);
    } catch (error: any) {
        console.error('Error fetching instructors:', error);
        return NextResponse.json({ error: 'Failed to fetch instructors' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const { fullName, specialty, email, role, bio, imageUrl, cohorts } = body;

        if (!fullName || !specialty || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newInstructor = new Instructor({
            fullName,
            specialty,
            email,
            role: role || 'Instructor',
            bio,
            imageUrl,
            cohorts: cohorts || [],
            isActive: true,
            statusColor: 'bg-green-500',
            rating: 5.0,
            studentsCount: 0,
            coursesCount: (cohorts || []).length
        });

        await newInstructor.save();
        return NextResponse.json(newInstructor, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }
        console.error('Error creating instructor:', error);
        return NextResponse.json({ error: 'Failed to create instructor' }, { status: 500 });
    }
}
