'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutGrid,
    BookOpen,
    User,
    GraduationCap,
    CreditCard,
    Award,
    LogOut,
    X,
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

export default function SideDash() {
    const pathname = usePathname();
    const { isOpen, closeSidebar } = useSidebar();

    const navItems = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            name: 'Programs / Courses',
            href: '/dashboard/programs',
            icon: BookOpen,
        },
        {
            name: 'Personal Information',
            href: '/dashboard/profile',
            icon: User,
        },
        {
            name: 'Payments',
            href: '/dashboard/payments',
            icon: CreditCard,
        },
        {
            name: 'Certificates',
            href: '/dashboard/certificates',
            icon: Award,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm sm:hidden transition-opacity duration-300"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 border-r border-gray-200 bg-white ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
                    }`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pl-2.5 mb-8 mt-2">
                            <Link href="/" className="flex items-center gap-2" onClick={closeSidebar}>
                                <div className="text-blue-500">
                                    <Image
                                        src="/images/icehub.png"
                                        alt="IceHub Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                            {/* Mobile Close Button */}
                            <button
                                onClick={closeSidebar}
                                className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                aria-label="Close Sidebar"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <ul className="space-y-2 font-medium">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={closeSidebar}
                                            className={`flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 group ${isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : ''
                                                }`}
                                        >
                                            <Icon
                                                className={`w-5 h-5 transition duration-75 ${isActive
                                                    ? 'text-blue-600'
                                                    : 'text-gray-400 group-hover:text-gray-900'
                                                    }`}
                                            />
                                            <span className="ml-3 text-sm">{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={() => {
                                closeSidebar();
                                signOut({ callbackUrl: '/login' });
                            }}
                            className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-100 group"
                        >
                            <LogOut className="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900" />
                            <span className="ml-3 text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
