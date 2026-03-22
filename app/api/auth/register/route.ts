import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/bcrypt';
import { generateUniqueUserCode } from '@/utils/generateCode';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateRequest, registerSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
    try {
        // 1. Rate Limiting (3 requests per 30 minutes)
        const rateLimitResponse = await checkRateLimit(req, {
            endpoint: 'register',
            limit: 3,
            windowMs: 30 * 60 * 1000
        });
        if (rateLimitResponse) return rateLimitResponse;

        // 2. Input Validation & Sanitization
        const body = await req.json();
        const { success, data, errorResponse } = await validateRequest(registerSchema, body);

        if (!success) {
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const { fullName, email, password, phoneNumber, address, experienceLevel, programId } =
            data as any;

        await connectDB();

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
