import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Program from '@/models/Program';
import User from '@/models/User';
import { getAuthSession } from '@/lib/auth';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateRequest, paymentVerifySchema } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    console.log('>>> [API/PAYMENTS/VERIFY] Request started');
    try {
        const body = await req.json();
        console.log('>>> [API/PAYMENTS/VERIFY] Request body:', body);
        // 1. Rate Limiting (20 requests per 10 minutes)
        const rateLimitResponse = await checkRateLimit(req, {
            endpoint: 'payment-verify',
            limit: 20,
            windowMs: 10 * 60 * 1000
        });
        if (rateLimitResponse) return rateLimitResponse;

        // 2. Input Validation & Sanitization
        const { success, data, errorResponse } = await validateRequest(paymentVerifySchema, body);

        if (!success) {
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const { reference, programId, fullName, email, phone, learningMode } = data as any;

        const session = await getAuthSession();
        await connectDB();

        // Note: For guest enrollment, we rely on the email/name provided in the form
        const userEmail = session?.user?.email || email;
        const userName = session?.user?.name || fullName;

        // programId is now optional - payment can be made without program selection
        if (!userEmail) {
            return NextResponse.json(
                { error: 'Please provide email for verification' },
                { status: 400 }
            );
        }

        // Verify payment with Flutterwave
        const flwSecretKey = process.env.FLW_SECRET_KEY;

        if (!flwSecretKey) {
            return NextResponse.json(
                { error: 'Flutterwave configuration missing' },
                { status: 500 }
            );
        }

        // We might get transaction_id from the client (after redirect)
        // reference here is tx_ref
        const transactionId = (data as any).transactionId; 

        if (!transactionId) {
             return NextResponse.json(
                { error: 'Transaction ID is required for verification' },
                { status: 400 }
            );
        }

        let verifyResponse;
        let retries = 3;
        while (retries > 0) {
            try {
                verifyResponse = await fetch(
                    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
                    {
                        headers: {
                            Authorization: `Bearer ${flwSecretKey}`,
                        },
                        signal: AbortSignal.timeout(15000)
                    }
                );
                break;
            } catch (error) {
                retries--;
                console.warn(`Flutterwave verification attempt failed. Retries left: ${retries}. Error:`, error);
                if (retries === 0) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        if (!verifyResponse) {
            throw new Error('Failed to establish connection to Flutterwave verification service');
        }

        const verifyData = await verifyResponse.json();

        if (verifyData.status !== 'success' || verifyData.data.status !== 'successful') {
            return NextResponse.json(
                { error: 'Payment verification failed' },
                { status: 400 }
            );
        }

        // Check if payment already recorded
        const existingPayment = await Payment.findOne({ reference: verifyData.data.tx_ref });
        if (existingPayment) {
            // Re-run the user update logic idempotently just in case the previous attempt 
            // recorded the payment but failed to update the user record.
            const finalUserId = session?.user?.id || existingPayment.userId || verifyData.data.meta?.userId;
            const finalProgramId = programId || existingPayment.programId || verifyData.data.meta?.programId;

            if (finalUserId && finalProgramId) {
                await User.findByIdAndUpdate(finalUserId, {
                    $addToSet: {
                        enrolledPrograms: finalProgramId,
                        paidPrograms: finalProgramId
                    },
                });

                await Program.findByIdAndUpdate(finalProgramId, {
                    $inc: { enrolledCount: 1 },
                });
            }

            return NextResponse.json(
                { message: 'Payment already verified', payment: existingPayment },
                { status: 200 }
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
            userId: session?.user?.id || verifyData.data.meta?.userId || undefined,
            programId: programId || verifyData.data.meta?.programId || undefined,
            reference: verifyData.data.tx_ref,
            amount: verifyData.data.amount, // Flutterwave returns standard amount
            currency: verifyData.data.currency,
            status: 'success',
            paymentMethod: 'flutterwave',
            flutterwaveResponse: verifyData.data,
            metadata: {
                ...verifyData.data.meta,
                fullName: userName,
                email: userEmail,
                phone,
                learningMode
            },
        });

        // Determine which programId and userId to use for user record updates
        const finalUserId = session?.user?.id || verifyData.data.meta?.userId;
        const finalProgramId = programId || verifyData.data.meta?.programId;

        // Update user's enrolled programs and program count
        if (finalUserId && finalProgramId) {
            await User.findByIdAndUpdate(finalUserId, {
                $addToSet: {
                    enrolledPrograms: finalProgramId,
                    paidPrograms: finalProgramId
                },
            });

            await Program.findByIdAndUpdate(finalProgramId, {
                $inc: { enrolledCount: 1 },
            });
        }

        // Send confirmation email via Resend
        try {
            const amountPaid = verifyData.data.amount;
            const isFullPayment = program && amountPaid >= program.price;
            const paymentStatusText = isFullPayment ? 'Full Payment' : 'Part Payment';

            const emailSubject = program
                ? `Enrollment Confirmed: ${program.name} (${paymentStatusText})`
                : `Payment Received - Select Your Program`;

            const emailBody = program ? `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #1D63ED;">Signup Successful!</h2>
                    <p>Hello <strong>${userName}</strong>,</p>
                    <p>Thank you for enrolling in <strong>${program.name}</strong> at ICEHub.</p>
                    <p>This email confirms that you have successfully signed up and made a <strong>${paymentStatusText.toLowerCase()}</strong>.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <h3>Enrollment Summary</h3>
                    <table style="width: 100%; text-align: left;">
                        <tr><th>Course:</th><td>${program.name}</td></tr>
                        <tr><th>Amount Paid:</th><td>₦${amountPaid.toLocaleString()}</td></tr>
                        <tr><th>Reference:</th><td>${verifyData.data.tx_ref}</td></tr>
                        <tr><th>Learning Mode:</th><td>${learningMode || 'To be confirmed'}</td></tr>
                        <tr><th>Payment Status:</th><td><strong>${paymentStatusText}</strong></td></tr>
                    </table>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p>We'll reach out to you shortly with more details about your class schedule.</p>
                    <p>Best regards,<br />The ICEHub Team</p>
                </div>
            ` : `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #1D63ED;">Payment Received!</h2>
                    <p>Hello <strong>${userName}</strong>,</p>
                    <p>Thank you for your payment of <strong>₦${amountPaid.toLocaleString()}</strong>.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <h3>Payment Summary</h3>
                    <table style="width: 100%; text-align: left;">
                        <tr><th>Amount Paid:</th><td>₦${amountPaid.toLocaleString()}</td></tr>
                        <tr><th>Reference:</th><td>${verifyData.data.tx_ref}</td></tr>
                        <tr><th>Status:</th><td>Success</td></tr>
                    </table>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Next Step:</strong> Please log in to your dashboard to select the program you'd like to enroll in with this payment.</p>
                    <p>Best regards,<br />The ICEHub Team</p>
                </div>
            `;

            await resend.emails.send({
                from: 'ICEHub Enrollment <blog@icehub-ng.com>',
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
