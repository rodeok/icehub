import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import speakeasy from 'speakeasy';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session')?.value;

        if (!adminSession) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await request.json();
        const { token, adminId } = body;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Must provide 6-digit TOTP token' },
                { status: 400 }
            );
        }

        // Determine which admin we are verifying for
        const targetAdminId = adminId || adminSession;

        if (targetAdminId === 'fallback_admin') {
            return NextResponse.json(
                { success: false, message: 'Fallback admin cannot use 2FA' },
                { status: 400 }
            );
        }

        const admin = await Admin.findById(targetAdminId);

        if (!admin) {
            return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
        }

        if (!admin.twoFactorSecret) {
            return NextResponse.json(
                { success: false, message: 'No 2FA secret found. Call /generate first' },
                { status: 400 }
            );
        }

        // Verify the 6-digit token using the generated secret
        const isVerified = speakeasy.totp.verify({
            secret: admin.twoFactorSecret,
            encoding: 'base32',
            token: token,
            window: 1 // Allow 1 step (30s) drift
        });

        if (isVerified) {
            // Confirm the 2FA setup is complete
            admin.twoFactorEnabled = true;
            await admin.save();

            return NextResponse.json({ success: true, message: '2FA Activation successful!' });
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid 2FA code. Please try again.' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('2FA verify error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
