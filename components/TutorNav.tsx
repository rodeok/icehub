'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function TutorNav() {
    const { data: session } = useSession();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0 z-10 sticky top-0">
            <div className="flex items-center gap-4 flex-1">
                {/* Search */}
                <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100/50 w-full max-w-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search resources, students..."
                        className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-900 w-full placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell size={22} strokeWidth={2} />
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900 leading-none">{session?.user?.name || 'Tutor'}</p>
                        <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Instructor</p>
                    </div>
                    <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-sm text-white flex items-center justify-center border-2 border-white ring-2 ring-gray-50">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
