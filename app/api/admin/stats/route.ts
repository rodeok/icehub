import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Program from '@/models/Program';
import Payment from '@/models/Payment';
import Certificate from '@/models/Certificate';

export async function GET() {
    try {
        await connectDB();

        // Ensure models are registered for population
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const models = [User, Program, Payment, Certificate];

        // 1. Stats Overview
        const [totalStudents, activeProgramsCount, pendingPaymentsCount, certificatesIssuedCount] = await Promise.all([
            User.countDocuments(),
            Program.countDocuments({ isActive: true }),
            Payment.countDocuments({ status: 'pending' }),
            Certificate.countDocuments({ status: 'issued' }),
        ]);

        // 2. Enrollment Trends (Monthly registrations for 2026)
        const year = 2026;
        const enrollmentTrends = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id': 1 } },
        ]);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedTrends = months.map((month, index) => {
            const found = enrollmentTrends.find(item => item._id === index + 1);
            return {
                name: month,
                value: found ? found.count : 0
            };
        });

        // 3. Recent Activity (Last 5 activities)
        // Combine latest user registrations and successful payments for general activity
        const [latestUsers, latestPayments] = await Promise.all([
            User.find().sort({ createdAt: -1 }).limit(5),
            Payment.find({ status: 'success' }).populate('userId').populate('programId').sort({ updatedAt: -1 }).limit(5),
        ]);

        const recentActivity = [
            ...latestUsers.map(user => ({
                user: user.fullName,
                action: 'joined ICEHUB',
                time: user.createdAt,
                type: 'registration'
            })),
            ...latestPayments.map(payment => ({
                user: (payment.userId as any)?.fullName || 'Guest',
                action: `paid for ${(payment.programId as any)?.name || 'a program'}`,
                time: payment.updatedAt,
                type: 'payment'
            }))
        ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);

        // 4. Program Performance
        const programPerformance = await Program.find({ isActive: true })
            .select('name enrolledCount category')
            .sort({ enrolledCount: -1 })
            .limit(5);

        const performanceData = programPerformance.map(program => ({
            name: program.name,
            enrolled: program.enrolledCount,
            category: program.category,
            // Assuming some default trend for now as we don't have historical snapshots per program
            trend: '+0%',
            isPositive: true
        }));

        return NextResponse.json({
            stats: [
                { title: 'Total Students', value: totalStudents.toLocaleString(), trend: '+0%', isPositive: true },
                { title: 'Active Programs', value: activeProgramsCount.toString(), trend: '+0%', isPositive: true },
                { title: 'Pending Payments', value: pendingPaymentsCount.toString(), trend: '+0%', isPositive: false },
                { title: 'Certificates Issued', value: certificatesIssuedCount.toString(), trend: '+0%', isPositive: true },
            ],
            enrollmentData: formattedTrends,
            recentActivity: recentActivity.map(act => ({
                ...act,
                time: formatTimeAgo(act.time)
            })),
            performanceData
        });
    } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json({
            error: error.message || 'Failed to fetch dashboard statistics'
        }, { status: 500 });
    }
}

function formatTimeAgo(date: Date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'JUST NOW';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} MINUTES AGO`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} HOURS AGO`;
    return `${Math.floor(diffInSeconds / 86400)} DAYS AGO`;
}
