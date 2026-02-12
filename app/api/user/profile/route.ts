import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
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
            .populate('enrolledPrograms');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
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
