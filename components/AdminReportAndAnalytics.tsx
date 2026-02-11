'use client';

import React from 'react';
import {
    Download,
    TrendingUp,
    UserMinus,
    BookOpen,
    Calendar,
    Award
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const stats = [
    {
        label: 'COMPLETION RATE',
        value: '82.4%',
        trend: '+4.5%',
        icon: Award,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        trendColor: 'text-green-500',
        trendBg: 'bg-green-50'
    },
    {
        label: 'AVG. TEST SCORE',
        value: '78%',
        trend: '+2.1%',
        icon: TrendingUp,
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        trendColor: 'text-green-500',
        trendBg: 'bg-green-50'
    },
    {
        label: 'DROPOUT RATE',
        value: '5.2%',
        trend: '-1.2%',
        icon: UserMinus,
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
        trendColor: 'text-red-500',
        trendBg: 'bg-red-50'
    },
    {
        label: 'ACTIVE STUDENTS',
        value: '842',
        trend: '+12%',
        icon: BookOpen,
        iconBg: 'bg-green-50',
        iconColor: 'text-green-600',
        trendColor: 'text-green-500',
        trendBg: 'bg-green-50'
    }
];

const dailyEngagementData = [
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 30 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 45 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 75 },
    { name: 'Sun', value: 40 }
];

const enrollmentSplitData = [
    { name: 'Bootcamps', value: 45, color: '#2563eb' },
    { name: 'Online Courses', value: 35, color: '#a855f7' },
    { name: 'Incubation', value: 20, color: '#10b981' }
];

export default function AdminReportAndAnalytics() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Deep dive into hub performance, revenue trends and student success rates.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${stat.iconBg} ${stat.iconColor}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className={`px-2 py-0.5 ${stat.trendBg} ${stat.trendColor} rounded-lg text-[10px] font-black`}>
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Daily Engagement Bar Chart */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Daily Engagement</h3>
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-all">
                                <Calendar size={18} />
                            </button>
                            <div className="h-10 w-24 bg-gray-50 rounded-xl" /> {/* Placeholder per image */}
                        </div>
                    </div>

                    <div className="h-[400px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyEngagementData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#2563eb"
                                    radius={[8, 8, 8, 8]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Enrollment Split Donut Chart */}
                <div className="lg:col-span-4 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-8">
                    <h3 className="text-xl font-bold text-gray-900">Enrollment Split</h3>

                    <div className="flex-1 flex flex-col justify-center gap-12">
                        <div className="relative h-[240px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={enrollmentSplitData}
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {enrollmentSplitData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-gray-900">100%</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</span>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {enrollmentSplitData.map((item, index) => (
                                <div key={index} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
