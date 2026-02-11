'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Bell, ChevronDown, User, LogOut, Settings, Menu } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';

export default function DashNav({ uniqueCode }: { uniqueCode?: string }) {
    const { data: session } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    const displayId = uniqueCode || (session?.user as any)?.uniqueCode || 'IH-PENDING';
    const { toggleSidebar } = useSidebar();

    return (
        <header className="flex h-20 items-center justify-between bg-white px-4 sm:px-8 border-b border-gray-100/80 sticky top-0 z-40">
            {/* Left: Mobile Menu Toggle & Page Title */}
            <div className="flex items-center gap-4 sm:gap-10 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 sm:hidden hover:bg-gray-100 transition-colors"
                    aria-label="Toggle Menu"
                >
                    <Menu size={20} />
                </button>

                {/* Dynamic Title */}
                <div>
                    {pathname?.startsWith('/dashboard/programs/') && pathname.split('/').length > 3 ? (
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                                Welcome back, {session?.user?.name || 'Student'}
                            </h1>
                            <p className="text-sm text-gray-500">Software Development Bootcamp</p>
                        </div>
                    ) : (
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                            Dashboard
                        </h1>
                    )}
                </div>

                <div className="relative w-full max-w-md hidden md:block">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search programs, payments..."
                        className="w-full rounded-full border-none bg-gray-50/80 py-3 pl-12 pr-6 text-sm text-gray-700 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-100 focus:shadow-sm"
                    />
                </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-3 sm:gap-8">
                {/* Notification Bell */}
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50">
                    <Bell strokeWidth={1.5} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
                </button>

                {/* User Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 rounded-2xl p-1.5 transition-all hover:bg-gray-50 select-none group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900 leading-tight">
                                {session?.user?.name || 'User'}
                            </p>
                            <p className="text-[11px] font-medium text-gray-400">
                                ID: {displayId}
                            </p>
                        </div>

                        <div className="relative">
                            <div className="h-11 w-11 rounded-full border-2 border-gray-100 bg-gray-200 overflow-hidden shadow-sm">
                                <img
                                    src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=3b82f6&color=fff&bold=true`}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in duration-200">
                            <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                                <p className="text-sm font-bold text-gray-900 truncate">{session?.user?.email || 'samuel@example.com'}</p>
                            </div>

                            <Link
                                href="/dashboard/personal-info"
                                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
                            >
                                <User size={18} strokeWidth={1.5} />
                                My Profile
                            </Link>

                            <Link
                                href="/dashboard/settings"
                                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
                            >
                                <Settings size={18} strokeWidth={1.5} />
                                Settings
                            </Link>

                            <div className="my-1 h-px bg-gray-50" />

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                            >
                                <LogOut size={18} strokeWidth={2} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}