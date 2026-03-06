import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session');

        if (!adminSession) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Return all admins except the password and secrets
        const admins = await Admin.find({}).select('-password -twoFactorSecret').sort({ createdAt: -1 });

        return NextResponse.json({ success: true, admins });
    } catch (error) {
        console.error('Fetch admins error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session');

        if (!adminSession) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await request.json();
        const { fullName, email, password, role } = body;

        if (!fullName || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return NextResponse.json(
                { success: false, message: 'Admin with this email already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role || 'admin',
            twoFactorEnabled: false
        });

        // Remove sensitive data before returning
        const { password: _, ...adminResponse } = newAdmin.toObject();

        return NextResponse.json({ success: true, admin: adminResponse });
    } catch (error) {
        console.error('Create admin error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
