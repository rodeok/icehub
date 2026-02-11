'use client';

import React, { useState } from 'react';
import { Search, Bell, Settings, Filter, CheckCircle2, MoreVertical, Clock } from 'lucide-react';

export default function NotificationsPage() {
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const notifications = [
        {
            id: 1,
            title: 'Project Submission Graded',
            description: 'Your Phase 1 project has been graded by Sarah Jenkins. You achieved a score of 95/100. Great job on the layout and responsiveness!',
            time: '10:30 AM, Feb 2, 2026',
            category: 'ACADEMIC',
            icon: <Search className="text-blue-500" size={18} />,
            bg: 'bg-blue-50',
            isRead: false,
        },
        {
            id: 2,
            title: 'New Resource: Advanced CSS Grid',
            description: 'A new video tutorial on "Advanced CSS Grid Layouts" has been added to Module 2. Check it out now.',
            time: '09:15 AM, Feb 2, 2026',
            category: 'RESOURCES',
            icon: <Bell className="text-blue-500" size={18} />,
            bg: 'bg-blue-50',
            isRead: false,
        },
        {
            id: 3,
            title: 'Upcoming Payment Deadline',
            description: 'Your next tuition installment is due in 3 days. Please ensure your payment is processed by Feb 5th to maintain access.',
            time: '08:00 AM, Feb 2, 2026',
            category: 'BILLING',
            icon: <Settings className="text-red-500" size={18} />,
            bg: 'bg-red-50',
            isRead: false,
        },
        {
            id: 4,
            title: 'Hackathon Registration',
            description: 'Registration for the Ice Hub Spring Hackathon is now open. Team up and build something amazing!',
            time: 'Yesterday, Feb 1, 2026',
            category: 'EVENTS',
            icon: <Bell className="text-blue-500" size={18} />,
            bg: 'bg-blue-50',
            isRead: true,
        },
        {
            id: 5,
            title: 'Community Meeting',
            description: 'Join the monthly community meeting tonight at 6:00 PM on Discord.',
            time: '2 days ago, Jan 31, 2026',
            category: 'SOCIAL',
            icon: <Bell className="text-blue-500" size={18} />,
            bg: 'bg-blue-50',
            isRead: true,
        },
    ];

    const filteredNotifications = filter === 'all' ? notifications : notifications.filter(n => !n.isRead);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-500 mt-0.5 text-sm font-medium">Stay updated with your courses, payments, and events</p>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        Mark all as read
                    </button>

                    <div className="flex items-center bg-gray-100/80 p-1 rounded-xl">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'unread' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Unread
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {/* Search & Filter Bar */}
                <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            className="w-full bg-gray-50/80 border-none rounded-xl py-3 pl-12 pr-4 text-sm text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                        />
                    </div>
                    <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                        <Filter size={20} />
                    </button>
                </div>

                {/* Notifications List */}
                <div className="divide-y divide-gray-50">
                    {filteredNotifications.map((notif) => (
                        <div key={notif.id} className="p-6 transition-all hover:bg-gray-50/50 group cursor-pointer">
                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                                <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ${notif.bg} shadow-sm group-hover:scale-105 transition-transform`}>
                                    {notif.icon}
                                </div>

                                <div className="flex-1 space-y-1.5 min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <h3 className="text-[17px] font-bold text-gray-900 leading-tight">
                                            {notif.title}
                                        </h3>
                                        {!notif.isRead && (
                                            <div className="h-2 w-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
                                        )}
                                        <span className="px-2.5 py-0.5 bg-gray-100 text-[#94a3b8] text-[9.5px] font-bold rounded uppercase tracking-wider">
                                            {notif.category}
                                        </span>
                                    </div>
                                    <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                                        {notif.description}
                                    </p>
                                    <div className="flex items-center gap-2 pt-0.5 text-gray-400">
                                        <Clock size={13} strokeWidth={2.5} />
                                        <span className="text-[12px] font-bold">{notif.time}</span>
                                    </div>
                                </div>

                                <button className="p-2 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredNotifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Bell className="text-gray-300" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No notifications found</h3>
                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
