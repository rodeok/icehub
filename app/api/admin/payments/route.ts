import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import User from '@/models/User';
import Program from '@/models/Program';

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';

        // Fetch all payments with populated data
        // For larger datasets, pagination should be implemented here
        let query = {};

        if (search) {
            query = {
                $or: [
                    { reference: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const payments = await Payment.find(query)
            .populate('userId', 'fullName email')
            .populate('programId', 'name')
            .sort({ createdAt: -1 });

        return NextResponse.json(payments);
    } catch (error: any) {
        console.error('Error fetching payments:', error);
        return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
    }
}
