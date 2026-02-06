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

        if (!reference || !programId || !userEmail) {
            return NextResponse.json(
                { error: 'Please provide payment reference, programId, and email' },
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

        const verifyResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${paystackSecretKey}`,
                },
            }
        );

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

        // Get program details
        const program = await Program.findById(programId);
        if (!program) {
            return NextResponse.json(
                { error: 'Program not found' },
                { status: 404 }
            );
        }

        // Create payment record
        const payment = await Payment.create({
            userId: session?.user?.id || undefined,
            programId,
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

        // Update user's enrolled programs if logged in
        if (session?.user?.id) {
            await User.findByIdAndUpdate(session.user.id, {
                $addToSet: { enrolledPrograms: programId },
            });
        }

        // Update program enrollment count
        await Program.findByIdAndUpdate(programId, {
            $inc: { enrolledCount: 1 },
        });

        // Send confirmation email via Resend
        try {
            await resend.emails.send({
                from: 'ICEHub Enrollment <onboarding@resend.dev>', // Replace with your verified domain
                to: userEmail,
                subject: `Enrollment Confirmed: ${program.name}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #1D63ED;">Enrollment Successful!</h2>
                        <p>Hello <strong>${userName}</strong>,</p>
                        <p>Thank you for enrolling in <strong>${program.name}</strong> at ICEHub.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <h3>Enrollment Summary</h3>
                        <table style="width: 100%; text-align: left;">
                            <tr><th>Course:</th><td>${program.name}</td></tr>
                            <tr><th>Amount Paid:</th><td>N${(verifyData.data.amount / 100).toLocaleString()}</td></tr>
                            <tr><th>Reference:</th><td>${reference}</td></tr>
                            <tr><th>Learning Mode:</th><td>${learningMode || 'To be confirmed'}</td></tr>
                            <tr><th>Status:</th><td>Paid</td></tr>
                        </table>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p>We'll reach out to you shortly with more details about your class schedule.</p>
                        <p>Best regards,<br />The ICEHub Team</p>
                    </div>
                `,
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
