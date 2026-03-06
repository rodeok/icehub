import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session')?.value;

        if (!adminSession) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        let body = {};
        try {
            body = await request.json();
        } catch (e) {
            // body is optional
        }

        // If an admin ID is passed, generate for that admin (assuming super admin / fellow admin).
        // Otherwise, generate for the currently logged-in admin (by session ID).
        const targetAdminId = (body as any).adminId || adminSession;

        if (targetAdminId === 'fallback_admin') {
            return NextResponse.json(
                { success: false, message: 'Cannot generate 2FA for the hardcoded fallback admin. Please create a real admin account first.' },
                { status: 400 }
            );
        }

        const admin = await Admin.findById(targetAdminId);

        if (!admin) {
            return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
        }

        // Generate speakeasy secret
        const secret = speakeasy.generateSecret({
            name: `Icehub Admin (${admin.email})`
        });

        // Store the base32 secret in the DB temporarily
        // We do NOT set twoFactorEnabled to true yet, that happens in /verify
        admin.twoFactorSecret = secret.base32;
        await admin.save();

        // Generate QR code for Google Authenticator/Authy
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || '');

        return NextResponse.json({
            success: true,
            secret: secret.base32,
            qrCodeUrl,
            message: 'QR Code generated successfully. Scan the QR code to finish setup.'
        });

    } catch (error) {
        console.error('2FA generate error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
