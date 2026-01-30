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
} from 'lucide-react';

export default function SideDash() {
    const pathname = usePathname();

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
            name: 'Education Background',
            href: '/dashboard/education',
            icon: GraduationCap,
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
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200 bg-white">
            <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
                <div>
                    <div className="flex items-center pl-2.5 mb-8 mt-2">
                        <Link href="/" className="flex items-center gap-2">
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
                    </div>
                    <ul className="space-y-2 font-medium">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
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
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-100 group"
                    >
                        <LogOut className="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900" />
                        <span className="ml-3 text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
