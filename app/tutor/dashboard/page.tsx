import React from 'react';
import { Users, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

export default function TutorDashboard() {
    const stats = [
        { label: 'Total Students', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Programs', value: '4', change: 'Steady', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Courses Taught', value: '12', change: '+2', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Average Rating', value: '4.9', change: '+0.1', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Welcome back to your workspace. Here's a summary of your performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                                <stat.icon size={24} strokeWidth={2} />
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-sm font-bold text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Recent Activity Stubs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        <p className="text-gray-400 italic text-sm">No recent activity to display.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Tasks</h3>
                    <div className="space-y-4">
                        <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-sm text-gray-700">
                            Grade Assignments
                        </button>
                        <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-sm text-gray-700">
                            Create New Course Material
                        </button>
                        <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-sm text-gray-700">
                            Message Students
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
