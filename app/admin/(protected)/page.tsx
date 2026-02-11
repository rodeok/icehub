'use client';

import React from 'react';
import {
    Users,
    BookOpen,
    CreditCard,
    Award,
    TrendingUp,
    TrendingDown,
    MoreVertical,
    ChevronRight,
    Clock,
    CheckCircle2
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import Image from 'next/image';

const enrollmentData = [
    { name: 'Jan', value: 4500 },
    { name: 'Feb', value: 5200 },
    { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 6500 },
    { name: 'May', value: 6200 },
    { name: 'Jun', value: 7800 },
    { name: 'Jul', value: 8200 },
];

const stats = [
    {
        title: 'Total Students',
        value: '1,289',
        trend: '+12.5%',
        isPositive: true,
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        title: 'Active Programs',
        value: '24',
        trend: '+2.4%',
        isPositive: true,
        icon: BookOpen,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
    },
    {
        title: 'Pending Payments',
        value: '142',
        trend: '-5.2%',
        isPositive: false,
        icon: CreditCard,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
    },
    {
        title: 'Certificates Issued',
        value: '856',
        trend: '+8.1%',
        isPositive: true,
        icon: Award,
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
];

const recentActivity = [
    {
        user: 'Sarah Connor',
        action: 'enrolled in Fullstack Bootcamp',
        time: '2 HOURS AGO',
        image: '/images/icehub.png',
        status: 'online'
    },
    {
        user: 'John Smith',
        action: 'completed payment for UX Design',
        time: '5 HOURS AGO',
        image: '/images/icehub.png',
        status: 'offline'
    },
    {
        user: 'Elena Rodriguez',
        action: 'submitted Capstone Project',
        time: '1 DAY AGO',
        image: '/images/icehub.png',
        status: 'offline'
    },
    {
        user: 'Marcus Wright',
        action: 'earned Digital Literacy Certificate',
        time: '2 DAYS AGO',
        image: '/images/icehub.png',
        status: 'online'
    }
];

const performanceData = [
    { name: 'Fullstack Web Development', enrolled: 450, trend: '+15%', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'UX/UI Design Foundations', enrolled: 320, trend: '+8%', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Data Science Incubation', enrolled: 180, trend: '+22%', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Mobile App Bootcamp', enrolled: 240, trend: '-3%', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Section: Chart & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Enrollment Trends</h2>
                            <p className="text-sm text-gray-400">Monthly student registrations for 2026</p>
                        </div>
                        <div className="h-8 w-24 bg-gray-50 rounded-lg"></div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={enrollmentData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                        <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-6 flex-1">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border">
                                        <Clock size={20} className="text-gray-400" />
                                    </div>
                                    {activity.status === 'online' && (
                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm font-bold text-gray-900">{activity.user}</p>
                                        <span className="text-[10px] font-bold text-gray-400">{activity.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-0.5">{activity.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Performance & Utilization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Program Performance */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Program Performance</h2>
                        <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-50">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Program Name</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enrolled</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trend</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {performanceData.map((program, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${program.bg} ${program.color}`}>
                                                    <program.icon size={16} />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{program.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700">{program.enrolled}</td>
                                        <td className={`px-6 py-4 text-xs font-bold ${program.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{program.trend} {program.trend.startsWith('+') ? '↗' : '↘'}</td>
                                        <td className="px-6 py-4">
                                            <button className="p-1 rounded-lg hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                                                <ChevronRight size={16} className="text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Hub Utilization */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Hub Utilization</h2>
                        <div className="p-1 rounded-full bg-green-50 text-green-500">
                            <CheckCircle2 size={16} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <UtilizationItem label="Capacity" value={82} color="bg-blue-600" />
                        <UtilizationItem label="Instructor Load" value={65} color="bg-purple-500" />
                        <UtilizationItem label="Storage Used" value={48} color="bg-orange-500" />
                    </div>

                    <button className="w-full mt-10 py-3 rounded-xl bg-gray-50 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors">
                        View System Logs
                    </button>
                </div>
            </div>
        </div>
    );
}

function UtilizationItem({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">{label}</span>
                <span className="text-sm font-bold text-gray-900">{value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
