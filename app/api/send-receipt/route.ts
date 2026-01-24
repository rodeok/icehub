import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { reference, userData } = await req.json();
    console.log("Attempting to send receipt to:", userData?.email);

    if (!userData || !userData.email) {
      console.error("User data missing in receipt request");
      return NextResponse.json({ error: 'User data missing' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default sender for unverified domains
      to: [userData.email],
      subject: `Your Workspace Booking Receipt - ${userData.planTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a73e8;">Payment Received!</h2>
          <p>Hello <strong>${userData.name}</strong>,</p>
          <p>Thank you for booking a workspace at ICE HUB. Your payment was successful.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>Plan:</strong> ${userData.planTitle}</p>
            <p style="margin: 5px 0;"><strong>Billing:</strong> ${userData.selectedPrice}</p>
            <p style="margin: 5px 0;"><strong>Reference:</strong> ${reference}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <p style="margin-top: 20px;">We look forward to seeing you at the hub!</p>
          <p style="font-size: 12px; color: #666;">If you didn't make this payment, please contact support.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Catch block Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
