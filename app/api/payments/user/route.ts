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
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Calculate payment statistics
        const successfulPayments = payments.filter(p => p.status === 'success');
        const totalPaid = successfulPayments.reduce((sum, p) => sum + p.amount, 0);

        // Calculate total program fees
        const totalFees = user.enrolledPrograms.reduce(
            (sum: number, program: any) => sum + (program.price || 0),
            0
        );

        const outstandingBalance = totalFees - totalPaid;

        // Fixed price per program
        const PROGRAM_PRICE = 450000;

        // Users can now pay without enrolling first
        // unpaidPrograms will be empty array if no programs enrolled or if fully paid
        const unpaidPrograms = (totalPaid < PROGRAM_PRICE && user.enrolledPrograms.length > 0)
            ? user.enrolledPrograms
            : [];

        return NextResponse.json({
            payments,
            enrolledPrograms: user.enrolledPrograms,
            unpaidPrograms,
            stats: {
                totalFees,
                totalPaid,
                outstandingBalance,
                paymentsCount: payments.length,
            },
        });
    } catch (error: any) {
        console.error('Error fetching user payments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payment data' },
            { status: 500 }
        );
    }
}
