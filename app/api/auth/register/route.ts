import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/bcrypt';
import { generateUniqueUserCode } from '@/utils/generateCode';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { fullName, email, password, phoneNumber, address, experienceLevel, programId } =
            body;

        // Validation
        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Generate a unique code using the utility
        const uniqueCode = await generateUniqueUserCode();

        // Create new user
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNumber,
            address,
            experienceLevel: experienceLevel || 'beginner',
            uniqueCode,
            enrolledPrograms: programId ? [programId] : [],
        });

        return NextResponse.json(
            {
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    uniqueCode: user.uniqueCode,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to register user' },
            { status: 500 }
        );
    }
}
