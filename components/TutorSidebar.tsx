'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, GraduationCap, Settings, LogOut, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function TutorSidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/tutor/dashboard' },
        { icon: BookOpen, label: 'Programs', href: '/tutor/dashboard/programs' },
        { icon: GraduationCap, label: 'Courses', href: '/tutor/dashboard/courses' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-full shadow-2xl lg:shadow-none">
            <div className="h-20 flex items-center justify-between px-8 border-b border-gray-50">
                <div className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    TutorPortal.
                </div>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
                <nav className="space-y-1.5">
                    <p className="px-4 text-[10px] font-black tracking-widest text-gray-400 uppercase mb-4">Main Menu</p>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 shadow-b'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 leading-none'
                                    }`}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-gray-400'} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-50">
                <button
                    onClick={() => signOut({ callbackUrl: '/tutor/login' })}
                    className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl transition-all text-sm font-bold text-red-500 hover:bg-red-50"
                >
                    <LogOut size={20} strokeWidth={2} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
