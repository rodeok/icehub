'use client';

import React from 'react';
import {
    Send,
    Megaphone,
    Search,
    Sliders,
    Eye,
    Users,
    Calendar,
    MoreVertical,
    Globe,
    Target,
    Clock,
    MousePointer2
} from 'lucide-react';

const announcements = [
    {
        title: 'New Guest Lecture: Future of AI in Fintech',
        target: 'All Students',
        views: '0',
        clicks: '0',
        date: '2026-02-15 14:00',
        status: 'SCHEDULED',
        statusType: 'warning',
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-50'
    },
    {
        title: 'Capstone Project Submission Deadline Extended',
        target: 'Fullstack Bootcamp',
        views: '450',
        clicks: '124',
        date: '2026-02-08 09:30',
        status: 'PUBLISHED',
        statusType: 'success',
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50'
    },
    {
        title: 'Hub Renovation: Weekend Access Changes',
        target: 'Physical Cohorts',
        views: '890',
        clicks: '45',
        date: '2026-02-01 16:45',
        status: 'PUBLISHED',
        statusType: 'success',
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50'
    }
];

export default function AdminAnouncement() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Broadcast important updates and schedule reminders for your hub community.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    <Send size={16} strokeWidth={2.5} />
                    New Broadcast
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Announcements Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Search & Filter */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search announcements..."
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm shadow-sm outline-none transition-all focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 transition-all shadow-sm">
                            <Sliders size={18} />
                        </button>
                    </div>

                    {/* Announcements List */}
                    <div className="space-y-4">
                        {announcements.map((ann, index) => (
                            <div key={index} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className={`h-12 w-12 ${ann.iconBg} ${ann.iconColor} rounded-xl flex items-center justify-center`}>
                                            <Megaphone size={20} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{ann.title}</h3>
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <Target size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Target:</span>
                                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{ann.target}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest ${ann.statusType === 'success' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-400'
                                            }`}>
                                            {ann.status}
                                        </span>
                                        <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Eye size={14} />
                                            <span className="text-[11px] font-black text-gray-700">{ann.views} <span className="text-gray-400 font-bold ml-0.5">Views</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <MousePointer2 size={14} />
                                            <span className="text-[11px] font-black text-gray-700">{ann.clicks} <span className="text-gray-400 font-bold ml-0.5">Clicks</span></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar size={14} />
                                        <span className="text-[11px] font-bold tracking-tight">{ann.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Audience Insights Card */}
                    <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl flex flex-col gap-8">
                        <h3 className="text-lg font-bold !text-white">Audience Insights</h3>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                                    <span className="text-gray-400">Open Rate</span>
                                    <span className="text-white">72%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                                    <span className="text-gray-400">Avg Engagement</span>
                                    <span className="text-white">45%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 font-bold text-sm text-white leading-relaxed relative">
                            "Students in the Fullstack cohort are most active between 6 PM and 9 PM."
                            {/* Accent line per image */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600/30 rounded-l-2xl" />
                        </div>
                    </div>

                    {/* Target Groups Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-900">Target Groups</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                                        <Users size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">All Registered</span>
                                </div>
                                <span className="text-xs font-black text-gray-400">1,289</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                                        <Globe size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">Active Cohorts</span>
                                </div>
                                <span className="text-xs font-black text-gray-400">450</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                                        <Clock size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">Incubation Program</span>
                                </div>
                                <span className="text-xs font-black text-gray-400">42</span>
                            </div>
                        </div>

                        <button className="w-full mt-2 py-3.5 bg-gray-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-100 transition-all">
                            Manage Segments
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
