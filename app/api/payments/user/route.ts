import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Program from '@/models/Program';
import User from '@/models/User';
import { getAuthSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        // Ensure models are registered (prevents MissingSchemaError during population)
        if (!process.env.SKIP_MODEL_TOUCH) {
            const _touch1 = Program.modelName;
            const _touch2 = User.modelName;
            const _touch3 = Payment.modelName;
        }

        console.log('[DEBUG] Payment API - User ID from session:', session.user.id);
        const mongoUri = process.env.MONGODB_URI || 'not set';
        console.log('[DEBUG] Payment API - DB Connected to:', mongoUri.substring(0, 20) + '...');

        // Fetch user's payments
        const payments = await Payment.find({ userId: session.user.id })
            .populate('programId', 'name price')
            .sort({ createdAt: -1 });

        // Fetch user's enrolled programs
        const user = await User.findById(session.user.id).populate(
            'enrolledPrograms',
            'name price _id'
        );

        if (!user) {
            console.error('[DEBUG] Payment API - User not found in DB for ID:', session.user.id);
            return NextResponse.json(
                { error: 'User not found', debugId: session.user.id },
                { status: 404 }
            );
        }

        // Calculate payment statistics
        const successfulPayments = payments.filter(p => p.status === 'success');
        const totalPaid = Math.round(successfulPayments.reduce((sum, p) => sum + p.amount, 0));

        const REGISTRATION_FEE = 10000;

        // Calculate total program fees
        let totalFees = (user.enrolledPrograms || []).reduce(
            (sum: number, program: any) => {
                const price = program?.price || 0;
                return sum + price;
            },
            0
        );

        // Add registration fee if user has any enrolled programs or has made payments
        if ((user.enrolledPrograms && user.enrolledPrograms.length > 0) || totalPaid > 0) {
            totalFees += REGISTRATION_FEE;
        }

        const outstandingBalance = Math.round(Math.max(totalFees - totalPaid, 0));

        // unpaidPrograms will be empty array if fully paid
        const unpaidPrograms = (totalPaid < totalFees && user.enrolledPrograms.length > 0)
            ? user.enrolledPrograms
            : [];

        const responseData = {
            payments,
            enrolledPrograms: (user.enrolledPrograms || []).filter((p: any) => p !== null),
            unpaidPrograms,
            registrationFee: REGISTRATION_FEE,
            stats: {
                totalFees,
                totalPaid,
                outstandingBalance,
                paymentsCount: payments.length,
            },
        };

        return NextResponse.json(responseData);
    } catch (error: any) {
        console.error('Detailed Error fetching user payments:', {
            message: error.message,
            stack: error.stack,
            userId: (await getAuthSession())?.user?.id
        });
        return NextResponse.json(
            { error: 'Failed to fetch payment data', details: error.message },
            { status: 500 }
        );
    }
}
