import { NextResponse } from 'next/server';


// HARDCODED CREDENTIALS
// In a real app, these should be in environment variables
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Set a cookie for the admin session
            // In production, use 'secure: true' and 'httpOnly: true'
            const response = NextResponse.json({ success: true });
            response.cookies.set('admin_session', 'true', {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: 'strict',
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
