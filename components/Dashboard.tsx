'use client';

import React from 'react';
import {
    ArrowRight,
    CreditCard,
    Calendar,
    Megaphone,
    CheckCircle2,
    Clock,
    Info,
    Sparkles
} from 'lucide-react';

interface DashboardProps {
    userName?: string;
    studentId?: string;
    programName?: string;
    progress?: number;
}

const Dashboard: React.FC<DashboardProps> = ({
    userName = "Samuel Adekunle",
    studentId = "IH-2024-0892",
    programName = "Software Engineering (Web Track)",
    progress = 18
}) => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-2xl lg:p-12">
                <div className="relative z-10 space-y-6">
                    <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-wide backdrop-blur-md">
                        Training Hub
                    </span>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Welcome back, {userName}!
                        </h1>
                        <p className="max-w-md text-lg text-blue-100/90 leading-relaxed">
                            Track your learning journey at Ice Hub. You're making great progress in your software engineering track.
                        </p>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-blue-400/20 blur-[100px]" />

                {/* Geometric Shape Decoration */}
                <div className="absolute right-16 top-1/2 hidden -translate-y-1/2 lg:block">
                    <div className="relative h-48 w-48 border-[12px] border-white/10 rounded-[3rem] rotate-[30deg] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-4 bg-white/5 backdrop-blur-sm rounded-[2rem]"></div>
                        <div className="h-16 w-16 bg-white/10 rounded-2xl"></div>
                    </div>
                </div>
            </div>

            {/* Start Next Module Card */}
            <div className="group flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md sm:flex-row">
                <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-4 ring-blue-50/50">
                        <Sparkles className="h-7 w-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Start your next module</h3>
                        <p className="text-gray-500">Select a program to continue your learning journey.</p>
                    </div>
                </div>
                <button className="group/btn flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95">
                    Continue Learning
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </button>
            </div>

            {/* Student Overview Section */}
            <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Student Overview</h2>
                <div className="grid gap-6 lg:grid-cols-5">
                    {/* Profile Card */}
                    <div className="lg:col-span-3 flex flex-col items-start gap-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm">
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-3xl font-black text-blue-600 shadow-inner ring-8 ring-blue-50/30">
                                {userName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{userName}</h3>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-black text-green-600 uppercase tracking-wider">Active</span>
                                </div>
                                <p className="text-gray-500 font-medium">Student ID: <span className="font-mono font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md">{studentId}</span></p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-100"></div>
                        <div className="space-y-2">
                            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Enrolled Program</p>
                            <p className="text-2xl font-black text-gray-900">{programName}</p>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm text-center">
                        <div className="relative flex h-40 w-40 items-center justify-center mb-6">
                            {/* Circular Progress Bar Background */}
                            <svg className="h-full w-full -rotate-90 transform">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="72"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-gray-50"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="72"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 72}
                                    strokeDashoffset={2 * Math.PI * 72 * (1 - progress / 100)}
                                    strokeLinecap="round"
                                    className="text-blue-600 transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-black text-gray-900 leading-none">{progress}%</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-black text-gray-900">Overall Progress</h4>
                            <p className="text-sm font-medium text-gray-500">Course Completion</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning & Status Section */}
            <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Learning & Status</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Payment Status Card */}
                    <div className="group flex flex-col justify-between rounded-[2.25rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-4 ring-green-50/50">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-black text-green-600 uppercase tracking-wider">Paid</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Payment Status</h4>
                                <p className="text-sm font-medium text-gray-500">Last transaction successful</p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50/50 p-4 text-xs font-bold text-green-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            Next payment due: Mar 15, 2026
                        </div>
                    </div>

                    {/* Upcoming Session Card */}
                    <div className="group flex flex-col justify-between rounded-[2.25rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-4 ring-blue-50/50">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-black text-blue-600 uppercase tracking-wider">Upcoming</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Upcoming Session</h4>
                                <p className="text-sm font-medium text-gray-500">Intro to UI/UX Design</p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-blue-50/50 p-4 text-xs font-bold text-blue-700">
                            <Clock className="h-4 w-4 shrink-0" />
                            Tomorrow at 10:00 AM
                        </div>
                    </div>

                    {/* Announcements Card */}
                    <div className="group flex flex-col justify-between rounded-[2.25rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-4 ring-orange-50/50">
                                    <Megaphone className="h-6 w-6" />
                                </div>
                                <div className="relative h-2.5 w-2.5 rounded-full bg-orange-500">
                                    <div className="absolute inset-0 animate-ping rounded-full bg-orange-400 opacity-75"></div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Announcements</h4>
                                <p className="text-sm font-medium text-gray-500">Check new resources</p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-orange-50/50 p-4 text-xs font-bold text-orange-700">
                            <Info className="h-4 w-4 shrink-0" />
                            New library access granted
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
