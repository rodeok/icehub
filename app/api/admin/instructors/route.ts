import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Instructor from '@/models/Instructor';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

        const { fullName, username, password, specialty, email, role, bio, imageUrl, cohorts } = body;

        if (!fullName || !username || !password || !specialty || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newInstructor = new Instructor({
            fullName,
            username,
            password: hashedPassword,
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

        // Send Email Notification with Credentials
        try {
            const loginUrl = 'https://icehub-ng.com/tutor/login'; // Update appropriately

            await resend.emails.send({
                from: 'ICE HUB Admin <blog@icehub-ng.com>',
                to: newInstructor.email,
                subject: 'Welcome to ICE HUB! Your Tutor Credentials',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <img src="https://icehub-ng.com/images/icehub.png" style="height: 60px; object-fit: contain;" alt="ICE HUB Logo" />
                        </div>
                        
                        <h2 style="color: #1a365d; margin-top: 0; font-size: 24px; text-align: center;">Welcome to the Team, ${newInstructor.fullName}!</h2>
                        
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                            You have been officially added as an instructor at ICE HUB. We are thrilled to have you on board! 
                            Below are your secure login credentials to access the Tutor Gateway.
                        </p>

                        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #2563eb;">
                            <p style="margin: 0 0 10px 0; color: #374151; font-size: 15px;">
                                <strong style="color: #111827; display: inline-block; width: 90px;">Username:</strong> 
                                <span style="font-family: monospace; background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${username}</span>
                            </p>
                            <p style="margin: 0; color: #374151; font-size: 15px;">
                                <strong style="color: #111827; display: inline-block; width: 90px;">Password:</strong> 
                                <span style="font-family: monospace; background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${password}</span>
                            </p>
                        </div>

                        <div style="text-align: center; margin-bottom: 30px;">
                            <a href="${loginUrl}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Login to Tutor Portal</a>
                        </div>

                        <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                            For security reasons, please do not share your credentials with anyone. If you have any issues logging in, please contact the administration.
                        </p>
                    </div>
                `,
            });
            console.log('Credentials email sent to', newInstructor.email);
        } catch (emailError) {
            console.error('Failed to send credentials email:', emailError);
            // We intentionally do not throw the error here so the instructor is still created even if the email fails.
        }

        return NextResponse.json(newInstructor, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }
        console.error('Error creating instructor:', error);
        return NextResponse.json({ error: 'Failed to create instructor' }, { status: 500 });
    }
}
