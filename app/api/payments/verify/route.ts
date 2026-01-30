import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Program from '@/models/Program';
import User from '@/models/User';
import { getAuthSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const { reference, programId } = body;

        if (!reference || !programId) {
            return NextResponse.json(
                { error: 'Please provide payment reference and programId' },
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
            userId: session.user.id,
            programId,
            reference,
            amount: verifyData.data.amount / 100, // Paystack returns amount in kobo
            currency: verifyData.data.currency,
            status: 'success',
            paystackResponse: verifyData.data,
            metadata: verifyData.data.metadata,
        });

        // Update user's enrolled programs
        await User.findByIdAndUpdate(session.user.id, {
            $addToSet: { enrolledPrograms: programId },
        });

        // Update program enrollment count
        await Program.findByIdAndUpdate(programId, {
            $inc: { enrolledCount: 1 },
        });

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
