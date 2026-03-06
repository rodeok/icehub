import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';

// HARDCODED CREDENTIALS (Fallback when DB is empty)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { username, password, token } = body;

        // Check if there are any admins in the DB
        const adminCount = await Admin.countDocuments();

        if (adminCount === 0) {
            // Fallback to hardcoded admin if DB is empty
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                const response = NextResponse.json({ success: true, fallback: true });
                response.cookies.set('admin_session', 'fallback_admin', {
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60 * 24, // 1 day
                    sameSite: 'strict',
                });
                return response;
            }
        }

        // DB Admin Authentication
        // Accept either username (which might be typed as email) or email directly
        const admin = await Admin.findOne({ email: username.toLowerCase() });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        if (!admin.isActive) {
            return NextResponse.json(
                { success: false, message: 'Account is deactivated' },
                { status: 403 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 2FA Check
        if (admin.twoFactorEnabled) {
            if (!admin.twoFactorSecret) {
                return NextResponse.json(
                    { success: false, message: '2FA is enabled but no secret is configured' },
                    { status: 500 }
                );
            }

            if (!token) {
                // Prompt client for token
                return NextResponse.json({ requires2FA: true, success: true });
            }

            const isTokenValid = speakeasy.totp.verify({
                secret: admin.twoFactorSecret,
                encoding: 'base32',
                token: token,
                window: 1 // allow 30 seconds before/after
            });

            if (!isTokenValid) {
                return NextResponse.json(
                    { success: false, message: 'Invalid 2FA token' },
                    { status: 400 }
                );
            }
        }

        // Authentication successful
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_session', admin._id.toString(), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: 'strict',
        });

        return response;

    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
