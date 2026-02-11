'use client';

import { Search, MapPin, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function AdminNav() {
    return (
        <header className="sticky top-0 z-50 flex h-20 items-center justify-between bg-white px-8 border-b border-gray-100">
            {/* Search Bar */}
            <div className="relative w-96">
                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Type to search..."
                    className="w-full rounded-xl border-none bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-100"
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-8">
                {/* Icons Group */}
                <div className="flex items-center gap-2 rounded-2xl bg-gray-50 p-1.5">
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-white hover:shadow-sm transition-all">
                        <MapPin size={20} strokeWidth={1.5} />
                    </button>
                    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-white hover:shadow-sm transition-all">
                        <Bell size={20} strokeWidth={1.5} />
                        <span className="absolute top-2.5 right-3 h-1.5 w-1.5 rounded-full bg-red-500" />
                    </button>
                </div>

                <div className="h-8 w-px bg-gray-100" />

                {/* Profile Section */}
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900 leading-tight">Admin User</p>
                        <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Hub Manager</p>
                    </div>

                    <div className="relative">
                        <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                            <Image
                                src="/images/icehub.png"
                                alt="Admin Profile"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    </div>

                    <ChevronDown size={16} className="text-gray-400" />
                </div>
            </div>
        </header>
    );
}
