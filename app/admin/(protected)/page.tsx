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
    CheckCircle2,
    Loader2
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { useEffect, useState } from 'react';

interface DashboardData {
    stats: any[];
    enrollmentData: any[];
    recentActivity: any[];
    performanceData: any[];
    availableCourses: any[];
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                if (!response.ok) throw new Error('Failed to fetch dashboard data');
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-gray-500 font-medium tracking-tight">Gathering latest insights...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 max-w-md text-center">
                    <p className="font-bold">Error loading dashboard</p>
                    <p className="text-sm mt-1">{error || 'Something went wrong while connecting to the server.'}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const { stats, enrollmentData, recentActivity, performanceData, availableCourses } = data;

    const getStatIcon = (title: string) => {
        switch (title) {
            case 'Total Students': return Users;
            case 'Active Programs': return BookOpen;
            case 'Pending Payments': return CreditCard;
            case 'Certificates Issued': return Award;
            default: return Users;
        }
    };

    const getStatColor = (title: string) => {
        switch (title) {
            case 'Total Students': return { text: 'text-blue-600', bg: 'bg-blue-50' };
            case 'Active Programs': return { text: 'text-purple-600', bg: 'bg-purple-50' };
            case 'Pending Payments': return { text: 'text-orange-600', bg: 'bg-orange-50' };
            case 'Certificates Issued': return { text: 'text-green-600', bg: 'bg-green-50' };
            default: return { text: 'text-gray-600', bg: 'bg-gray-50' };
        }
    };
    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat: any, index: number) => {
                    const Icon = getStatIcon(stat.title);
                    const colors = getStatColor(stat.title);
                    return (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                                    <Icon size={24} />
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
                    );
                })}
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
                        {recentActivity.map((activity: any, index: number) => (
                            <div key={index} className="flex gap-4">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                                        <Clock size={20} className="text-gray-400" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
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
                                {performanceData.map((program: any, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                                    <BookOpen size={16} />
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

                {/* Available Courses / Programs */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                        <h2 className="text-lg font-bold text-gray-900">Available Courses</h2>
                        <div className="p-1 rounded-full bg-blue-50 text-blue-500">
                            <BookOpen size={16} />
                        </div>
                    </div>

                    <div className="space-y-4 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
                        {availableCourses && availableCourses.length > 0 ? (
                            availableCourses.map((course: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-all border border-gray-50">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{course.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{course.isActive ? 'Active' : 'Draft'}</span>
                                            <span>• {course.enrolledCount} Students</span>
                                        </p>
                                    </div>
                                    <span className="text-xs font-bold text-blue-600 capitalize bg-blue-50 px-2 py-1 rounded-lg">{course.skillLevel}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic text-center py-4">No courses available.</p>
                        )}
                    </div>

                    <button className="w-full mt-4 py-3 rounded-xl bg-gray-50 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors">
                        View Complete Catalog
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
