import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import User from '@/models/User';
import Program from '@/models/Program';

export async function GET() {
    try {
        await connectDB();

        // Ensure models are registered for population (avoids tree-shaking issues)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const models = [User, Program];

        // 1. Total Revenue (Success only)
        const totalRevenueResult = await Payment.aggregate([
            { $match: { status: 'success' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalRevenue = totalRevenueResult[0]?.total || 0;

        // 2. Pending Invoices
        const pendingCount = await Payment.countDocuments({ status: 'pending' });
        const pendingValueResult = await Payment.aggregate([
            { $match: { status: 'pending' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const pendingValue = pendingValueResult[0]?.total || 0;

        // 3. Success Rate
        const totalCount = await Payment.countDocuments({});
        const successCount = await Payment.countDocuments({ status: 'success' });
        const successRate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;

        // 4. Monthly Target Progress (Hardcoded for now as placeholders in UI were 75% etc)
        // In a real system, you'd have a 'Target' model.
        const monthlyTarget = 5000000; // 5M NGN
        const targetProgress = (totalRevenue / monthlyTarget) * 100;

        // 5. Recent successful payments for the metrics view (avatars)
        const recentSuccess = await Payment.find({ status: 'success' })
            .populate('userId', 'fullName')
            .sort({ updatedAt: -1 })
            .limit(4)
            .lean();

        const pendingUsers = await Payment.find({ status: 'pending' })
            .populate('userId', 'fullName')
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();

        return NextResponse.json({
            totalRevenue: Number(totalRevenue) || 0,
            pendingCount: Number(pendingCount) || 0,
            pendingValue: Number(pendingValue) || 0,
            successRate: Number(successRate) || 0,
            targetProgress: Number(targetProgress) || 0,
            pendingUsers: (pendingUsers || []).map((u: any) => u.userId?.fullName?.[0] || '?'),
            totalPendingCount: Number(pendingCount) || 0
        });
    } catch (error: any) {
        console.error('Error fetching payment stats:', error);
        return NextResponse.json({
            error: error.message || 'Failed to fetch payment stats',
            totalRevenue: 0,
            pendingCount: 0,
            pendingValue: 0,
            successRate: 0,
            targetProgress: 0,
            pendingUsers: [],
            totalPendingCount: 0
        }, { status: 500 });
    }
}
