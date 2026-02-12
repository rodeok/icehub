import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Program from '@/models/Program';
import Certificate from '@/models/Certificate';
import Payment from '@/models/Payment';

export async function GET() {
    try {
        await connectDB();

        // 1. Core Metrics
        const [totalStudents, activeStudents, certificatesIssued, totalPayments] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isActive: true }),
            Certificate.countDocuments({ status: 'issued' }),
            Payment.countDocuments({ status: 'success' }),
        ]);

        // Total Enrollments (sum of all users' enrolledPrograms length)
        const users = await User.find({}, 'enrolledPrograms');
        const totalEnrollments = users.reduce((acc, user) => acc + (user.enrolledPrograms?.length || 0), 0);

        const completionRate = totalEnrollments > 0 ? (certificatesIssued / totalEnrollments) * 100 : 0;
        const dropoutRate = totalStudents > 0 ? ((totalStudents - activeStudents) / totalStudents) * 100 : 0;

        // 2. Enrollment Split (Program Categories)
        const programsByCategory = await Program.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: '$enrolledCount' }
                }
            }
        ]);

        const totalEnrolledInCategory = programsByCategory.reduce((acc, cur) => acc + cur.count, 0);

        // Define color mapping for categories
        const colors = {
            'frontend': '#2563eb',
            'backend': '#7c3aed',
            'mobile-dev': '#db2777',
            'data-analytics': '#10b981',
            'cyber-security': '#f59e0b',
            'graphics-design': '#ef4444',
            'product-design': '#6366f1',
            'digital-literacy': '#14b8a6',
            'next-gen': '#8b5cf6',
            'skit': '#f43f5e'
        };

        const enrollmentSplitData = programsByCategory.map(item => ({
            name: item._id.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            value: totalEnrolledInCategory > 0 ? Math.round((item.count / totalEnrolledInCategory) * 100) : 0,
            color: (colors as any)[item._id] || '#94a3b8'
        })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5 categories

        // 3. Daily Engagement (Registration trends for the last 7 days)
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            last7Days.push(d);
        }

        const dailyEngagements = await Promise.all(last7Days.map(async (day) => {
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);

            const count = await User.countDocuments({
                createdAt: { $gte: day, $lt: nextDay }
            });

            return {
                name: day.toLocaleDateString('en-US', { weekday: 'short' }),
                value: count
            };
        }));

        return NextResponse.json({
            metrics: [
                {
                    label: 'COMPLETION RATE',
                    value: `${completionRate.toFixed(1)}%`,
                    trend: '+0.0%',
                    type: 'completion'
                },
                {
                    label: 'AVG. TEST SCORE',
                    value: '78%', // Mocked for now
                    trend: '+0.0%',
                    type: 'score'
                },
                {
                    label: 'DROPOUT RATE',
                    value: `${dropoutRate.toFixed(1)}%`,
                    trend: '+0.0%',
                    type: 'dropout'
                },
                {
                    label: 'ACTIVE STUDENTS',
                    value: activeStudents.toString(),
                    trend: '+0%',
                    type: 'active'
                }
            ],
            dailyEngagementData: dailyEngagements,
            enrollmentSplitData
        });

    } catch (error: any) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
