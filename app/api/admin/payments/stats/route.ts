import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function GET() {
    try {
        await connectDB();

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
            .populate('userId', 'fullName initial')
            .sort({ updatedAt: -1 })
            .limit(4)
            .lean();

        const pendingUsers = await Payment.find({ status: 'pending' })
            .populate('userId', 'fullName')
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();

        return NextResponse.json({
            totalRevenue,
            pendingCount,
            pendingValue,
            successRate,
            targetProgress,
            pendingUsers: pendingUsers.map((u: any) => u.userId?.fullName?.[0] || '?'),
            totalPendingCount: pendingCount
        });
    } catch (error: any) {
        console.error('Error fetching payment stats:', error);
        return NextResponse.json({ error: 'Failed to fetch payment stats' }, { status: 500 });
    }
}
