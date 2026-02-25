import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Program from '@/models/Program';
import User from '@/models/User';
import { getAuthSession } from '@/lib/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();
        await connectDB();

        const body = await req.json();
        const { reference, programId, fullName, email, phone, learningMode } = body;

        // Note: For guest enrollment, we rely on the email/name provided in the form
        const userEmail = session?.user?.email || email;
        const userName = session?.user?.name || fullName;

        // programId is now optional - payment can be made without program selection
        if (!reference || !userEmail) {
            return NextResponse.json(
                { error: 'Please provide payment reference and email' },
                { status: 400 }
            );
        }

        // Verify payment with Paystack
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!paystackSecretKey) {
            return NextResponse.json(
                { error: 'Paystack configuration missing' },
                { status: 500 }
            );
        }

        let verifyResponse;
        let retries = 3;
        while (retries > 0) {
            try {
                verifyResponse = await fetch(
                    `https://api.paystack.co/transaction/verify/${reference}`,
                    {
                        headers: {
                            Authorization: `Bearer ${paystackSecretKey}`,
                        },
                        // Increase timeout to 15s if possible, Next.js fetch supports signal
                        signal: AbortSignal.timeout(15000)
                    }
                );
                // If fetch succeeds but status is not ok (e.g. 5xx), maybe we should retry? 
                // However, Paystack API usually returns 200 with status field in body for success/failure of transaction.
                // Network errors (like timeout) will be caught below.
                break;
            } catch (error) {
                retries--;
                console.warn(`Paystack verification attempt failed. Retries left: ${retries}. Error:`, error);
                if (retries === 0) throw error;
                // Wait 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        if (!verifyResponse) {
            throw new Error('Failed to establish connection to Paystack verification service');
        }

        const verifyData = await verifyResponse.json();

        if (!verifyData.status || verifyData.data.status !== 'success') {
            return NextResponse.json(
                { error: 'Payment verification failed' },
                { status: 400 }
            );
        }

        // Check if payment already recorded
        const existingPayment = await Payment.findOne({ reference });
        if (existingPayment) {
            return NextResponse.json(
                { error: 'Payment already recorded' },
                { status: 409 }
            );
        }

        // Program is now optional - user can pay first, select program later
        let program = null;
        if (programId) {
            program = await Program.findById(programId);
            if (!program) {
                return NextResponse.json(
                    { error: 'Program not found' },
                    { status: 404 }
                );
            }
        }

        // Create payment record
        const payment = await Payment.create({
            userId: session?.user?.id || undefined,
            programId: programId || undefined, // Optional - can be null
            reference,
            amount: verifyData.data.amount / 100, // Paystack returns amount in kobo
            currency: verifyData.data.currency,
            status: 'success',
            paymentMethod: 'paystack',
            paystackResponse: verifyData.data,
            metadata: {
                ...verifyData.data.metadata,
                fullName: userName,
                email: userEmail,
                phone,
                learningMode
            },
        });

        // Update user's enrolled programs and program count only if program was selected
        if (session?.user?.id && programId) {
            await User.findByIdAndUpdate(session.user.id, {
                $addToSet: {
                    enrolledPrograms: programId,
                    paidPrograms: programId
                },
            });

            await Program.findByIdAndUpdate(programId, {
                $inc: { enrolledCount: 1 },
            });
        }

        // Send confirmation email via Resend
        try {
            const emailSubject = program
                ? `Enrollment Confirmed: ${program.name}`
                : `Payment Received - Select Your Program`;

            const emailBody = program ? `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #1D63ED;">Enrollment Successful!</h2>
                    <p>Hello <strong>${userName}</strong>,</p>
                    <p>Thank you for enrolling in <strong>${program.name}</strong> at ICEHub.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <h3>Enrollment Summary</h3>
                    <table style="width: 100%; text-align: left;">
                        <tr><th>Course:</th><td>${program.name}</td></tr>
                        <tr><th>Amount Paid:</th><td>₦${(verifyData.data.amount / 100).toLocaleString()}</td></tr>
                        <tr><th>Reference:</th><td>${reference}</td></tr>
                        <tr><th>Learning Mode:</th><td>${learningMode || 'To be confirmed'}</td></tr>
                        <tr><th>Status:</th><td>Paid</td></tr>
                    </table>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p>We'll reach out to you shortly with more details about your class schedule.</p>
                    <p>Best regards,<br />The ICEHub Team</p>
                </div>
            ` : `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #1D63ED;">Payment Received!</h2>
                    <p>Hello <strong>${userName}</strong>,</p>
                    <p>Thank you for your payment of <strong>₦${(verifyData.data.amount / 100).toLocaleString()}</strong>.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <h3>Payment Summary</h3>
                    <table style="width: 100%; text-align: left;">
                        <tr><th>Amount Paid:</th><td>₦${(verifyData.data.amount / 100).toLocaleString()}</td></tr>
                        <tr><th>Reference:</th><td>${reference}</td></tr>
                        <tr><th>Status:</th><td>Paid</td></tr>
                    </table>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Next Step:</strong> Please log in to your dashboard to select the program you'd like to enroll in with this payment.</p>
                    <p>Best regards,<br />The ICEHub Team</p>
                </div>
            `;

            await resend.emails.send({
                from: 'ICEHub Enrollment <onboarding@resend.dev>',
                to: userEmail,
                subject: emailSubject,
                html: emailBody,
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // We don't return error here because payment was already successful
        }

        return NextResponse.json(
            {
                message: 'Payment verified successfully',
                payment,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
