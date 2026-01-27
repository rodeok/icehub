import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { reference, userData } = await req.json();
    console.log("Attempting to send receipt to:", userData?.email);

    if (!userData || !userData.email) {
      console.error("User data missing in receipt request");
      return NextResponse.json({ error: 'User data missing' }, { status: 400 });
    }

    // Generate QR code data URL for email
    const qrData = `ICE HUB Verification\nRef: ${reference}\nUser: ${userData.name}\nPlan: ${userData.planTitle}\nAmount: ${userData.selectedPrice}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [userData.email],
      subject: `Your Workspace Booking Receipt - ${userData.planTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <img src="https://icehub11.vercel.app/images/icehub.png" style="height: 40px; object-fit: contain;" alt="ICE HUB Logo" />
            <h2 style="color: #1a73e8; margin: 0;">Payment Received!</h2>
          </div>
          <p>Hello <strong>${userData.name}</strong>,</p>
          <p>Thank you for booking a workspace at ICE HUB. Your payment was successful.</p>
          
          <div style="display: flex; gap: 20px; align-items: start; margin: 20px 0;">
            <div style="flex: 1; background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
                <p style="margin: 5px 0;"><strong>Plan:</strong> ${userData.planTitle}</p>
                <p style="margin: 5px 0;"><strong>Billing:</strong> ${userData.selectedPrice}</p>
                <p style="margin: 5px 0;"><strong>Reference:</strong> ${reference}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <div style="text-align: center;">
                <img src="${qrCodeDataUrl}" width="100" height="100" style="border-radius: 8px; border: 1px solid #eee;" />
                <p style="font-size: 8px; color: #999; margin-top: 4px;">Verification QR</p>
            </div>
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
