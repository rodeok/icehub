'use client';

import React, { useState, useEffect } from 'react';
import {
    Download,
    TrendingUp,
    UserMinus,
    BookOpen,
    Calendar,
    Award,
    Loader2
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

export default function AdminReportAndAnalytics() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/analytics');
            if (res.ok) {
                const result = await res.json();
                setData(result);
            }
        } catch (err) {
            console.error('Error fetching analytics:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="h-[600px] w-full flex flex-col items-center justify-center gap-4 bg-white rounded-[32px] border border-gray-50">
                <Loader2 size={40} className="animate-spin text-blue-600" />
                <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">Generating Real-time Reports...</p>
            </div>
        );
    }

    const { metrics = [], dailyEngagementData = [], enrollmentSplitData = [] } = data || {};

    const iconConfig: any = {
        'completion': { icon: Award, bg: 'bg-blue-50', color: 'text-blue-600' },
        'score': { icon: TrendingUp, bg: 'bg-purple-50', color: 'text-purple-600' },
        'dropout': { icon: UserMinus, bg: 'bg-red-50', color: 'text-red-500' },
        'active': { icon: BookOpen, bg: 'bg-green-50', color: 'text-green-600' }
    };

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
                {(metrics.length > 0 ? metrics : []).map((stat: any, index: number) => {
                    const config = iconConfig[stat.type] || iconConfig['completion'];
                    const Icon = config.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col gap-6">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-2xl ${config.bg} ${config.color}`}>
                                    <Icon size={20} />
                                </div>
                                <div className={`px-2 py-0.5 bg-green-50 text-green-500 rounded-lg text-[10px] font-black`}>
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Daily Engagement Bar Chart */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Daily Registrations</h3>
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-all">
                                <Calendar size={18} />
                            </button>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Last 7 Days</span>
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
                    <h3 className="text-xl font-bold text-gray-900">Program Split</h3>

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
                                        {enrollmentSplitData.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-gray-900">Hub</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share</span>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {(enrollmentSplitData.length > 0 ? enrollmentSplitData : []).map((item: any, index: number) => (
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
