'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import {
    ArrowRight,
    Calendar,
    CheckCircle,
    Clock,
    BookOpen,
    ArrowUpRight,
    Play,
    ChevronRight,
    Users,
    Zap
} from 'lucide-react';

interface DashboardProps {
    userName?: string;
    studentId?: string;
    programName?: string;
    progress?: number;
}

const Dashboard: React.FC<DashboardProps> = ({
    userName = "",
    studentId,
    programName = "Software Development Bootcamp",
    progress = 60
}) => {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4 sm:px-6">
            {/* Top Grid: Progress & bootcamp info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Overall Progress Card */}
                <div className="lg:col-span-2 bg-white rounded-[20px] p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0">
                                <h2 className="text-lg font-bold text-gray-900">Overall Progress</h2>
                                <p className="text-gray-400 text-xs font-medium">{programName}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-blue-600">{progress}%</span>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0">Completed</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-3">
                            <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center">
                                        <CheckCircle className="w-2.5 h-2.5 text-green-500" strokeWidth={4} />
                                    </div>
                                    <span>24/40 Modules</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center">
                                        <ArrowUpRight className="w-2.5 h-2.5 text-blue-600" strokeWidth={4} />
                                    </div>
                                    <span>Current stage: Frontend Dev</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bootcamp Info Card (Blue) */}
                <div className="bg-blue-600 rounded-[20px] p-5 sm:p-6 !text-white shadow-xl shadow-blue-200 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-[8px] font-black uppercase tracking-[0.2em] !text-white/90">Bootcamp Info</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Calendar className="w-3.5 h-3.5 !text-white" />
                                </div>
                                <div className="!text-white">
                                    <p className="text-[8px] font-bold uppercase tracking-wider !text-white">Duration</p>
                                    <p className="text-xs font-bold !text-white">6 Months (Jan - June)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Zap className="w-3.5 h-3.5 !text-white" />
                                </div>
                                <div className="!text-white">
                                    <p className="text-[8px] font-bold uppercase tracking-wider !text-white">Learning Mode</p>
                                    <p className="text-xs font-bold !text-white">Hybrid (Online + Physical)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Users className="w-3.5 h-3.5 !text-white" />
                                </div>
                                <div className="!text-white">
                                    <p className="text-[8px] font-bold uppercase tracking-wider !text-white">Lead Instructor</p>
                                    <p className="text-xs font-bold !text-white">Sarah Jenkins</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-white/10 hover:bg-white/20 transition-all py-2.5 rounded-xl font-bold text-[10px] backdrop-blur-md border border-white/10 !text-white">
                            View Schedule
                        </button>
                    </div>
                    {/* Decorative Background Circles */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
                </div>
            </div>

            {/* Middle Grid: Active Lesson & Announcements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Active Lesson Card */}
                <div className="lg:col-span-2 bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row group transition-all hover:shadow-md">
                    <div className="md:w-48 lg:w-56 relative shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                            alt="Course Thumbnail"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">In Progress</span>
                                <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-bold">
                                    <Clock className="w-3 h-3" />
                                    <span>12h remaining</span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">React & Next.js Advanced Patterns</h3>
                                <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
                                    Master hooks, context, server components, and performance optimization for modern web apps.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-100">
                                Continue Learning
                                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Announcements Card */}
                <div className="bg-white rounded-[20px] p-5 sm:p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">Announcements</h3>

                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                            <div>
                                <p className="text-[13px] font-bold text-gray-900 leading-tight">Project Phase 1 Submissions</p>
                                <p className="text-[11px] font-bold text-gray-400 mt-0.5">Due Tomorrow</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                            <div>
                                <p className="text-[13px] font-bold text-gray-900 leading-tight">Hackathon Registration Open</p>
                                <p className="text-[11px] font-bold text-gray-400 mt-0.5">Feb 10th</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                            <div>
                                <p className="text-[13px] font-bold text-gray-900 leading-tight">New Course Resources Added</p>
                                <p className="text-[11px] font-bold text-gray-400 mt-0.5">2h ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Lessons Completed', value: '124', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Hours Spent', value: '45.5', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Assignments', value: '12', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Upcoming Deadlines', value: '3', icon: Calendar, color: 'text-red-500', bg: 'bg-red-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 flex flex-col gap-3 group hover:border-blue-100 transition-all">
                        <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xl font-black text-gray-900">{stat.value}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

