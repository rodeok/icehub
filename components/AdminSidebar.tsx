'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    User,
    CreditCard,
    Award,
    Megaphone,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';


const sidebarItems = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin',
    },
    {
        title: 'Students',
        icon: Users,
        href: '/admin/students',
    },
    {
        title: 'Programs / Courses',
        icon: BookOpen,
        href: '/admin/programs',
    },
    {
        title: 'Instructors',
        icon: User,
        href: '/admin/instructors',
    },
    {
        title: 'Payments',
        icon: CreditCard,
        href: '/admin/payments',
    },
    {
        title: 'Certificates',
        icon: Award,
        href: '/admin/certificates',
    },
    {
        title: 'Announcements',
        icon: Megaphone,
        href: '/admin/announcements',
    },
    {
        title: 'Reports & Analytics',
        icon: BarChart3,
        href: '/admin/analytics',
    },
    {
        title: 'Settings',
        icon: Settings,
        href: '/admin/settings',
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <aside className="hidden w-64 flex-col border-r border-gray-100 bg-white md:flex h-screen sticky top-0">
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-6 py-8">
                <Image
                    src="/images/icehub.png"
                    alt="ICE HUB"
                    width={40}
                    height={40}
                    priority
                    className="object-contain"
                />
                <span className="text-xl font-bold text-gray-900">Ice Hub</span>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 space-y-1 px-4 py-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {/* Active Indicator Border */}
                            {isActive && (
                                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-blue-600" />
                            )}

                            <Icon
                                size={20}
                                className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
                                strokeWidth={1.5}
                            />
                            <span className="relative">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Section */}
            <div className="border-t border-gray-100 p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                    <LogOut size={20} strokeWidth={1.5} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
