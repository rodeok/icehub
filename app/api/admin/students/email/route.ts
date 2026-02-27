import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { to, subject, message } = body;

        if (!to || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'IceHub Admin <blogmailnot@icehub-ng.com>', // Replace with your verified sender
            to: [to],
            subject: subject,
            html: `<div style="font-family: sans-serif; color: #333;">
                <h2>Message from IceHub Administration</h2>
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
                <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} IceHub. All rights reserved.</p>
            </div>`,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully', data });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
