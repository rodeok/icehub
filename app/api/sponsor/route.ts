import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, phone, hasCandidate, specificCourse, message } = await req.json();

        if (!name || !email || !phone) {
            return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Sponsorship Inquiry <blog@icehub-ng.com>',
            to: ['contact@icehub-ng.com'], // Or the desired company email
            replyTo: email,
            subject: `New Scholarship Sponsorship  from ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a73e8; margin-top: 0;">New Sponsorship Inquiry</h2>
          <p>You have received a new inquiry to sponsor a student with a full scholarship.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 5px 0;"><strong>Has Specific Candidate:</strong> ${hasCandidate}</p>
            <p style="margin: 5px 0;"><strong>Has Specific Course:</strong> ${specificCourse}</p>
          </div>

          ${message ? `
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
              ${message}
            </div>
          ` : ''}

          <p style="margin-top: 20px; font-size: 12px; color: #666;">This message was sent from the sponsor page on your website.</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Sponsor API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
