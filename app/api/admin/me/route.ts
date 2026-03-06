import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session')?.value;

        if (!adminSession) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        if (adminSession === 'fallback_admin') {
            return NextResponse.json({
                success: true,
                admin: {
                    fullName: 'Fallback Admin',
                    email: 'admin',
                    role: 'superadmin',
                    twoFactorEnabled: false,
                    isFallback: true
                }
            });
        }

        await dbConnect();

        const admin = await Admin.findById(adminSession).select('-password -twoFactorSecret');

        if (!admin) {
            return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, admin });

    } catch (error) {
        console.error('Fetch me error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
