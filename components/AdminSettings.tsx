'use client';

import React, { useState } from 'react';
import {
    User,
    Shield,
    Bell,
    Palette,
    Database,
    Monitor,
    Smartphone,
    Lock,
    Camera,
    Trash2,
    ChevronRight
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'branding', label: 'Branding & UI', icon: Palette },
    { id: 'privacy', label: 'Data & Privacy', icon: Database },
];

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Manage your account, hub preferences and system configurations.</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Navigation */}
                <div className="lg:col-span-3 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-white border border-gray-100 shadow-sm text-blue-600'
                                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-700'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-blue-600' : 'text-gray-400'} />
                            <span className={`text-[13px] font-bold ${activeTab === item.id ? 'font-bold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-9 space-y-8">

                    {/* Profile Information Card */}
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50">
                            <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                            <p className="text-xs text-gray-400 mt-1 font-medium tracking-tight">Update your personal details and admin identity.</p>
                        </div>

                        <div className="p-8 space-y-10">
                            {/* Photo Upload Section */}
                            <div className="flex items-center gap-6">
                                <div className="h-24 w-24 rounded-3xl bg-gray-100 relative overflow-hidden border border-gray-50 shadow-sm">
                                    <Image
                                        src="/images/icehub.png"
                                        alt="Admin Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-sm">
                                        Change Photo
                                    </button>
                                    <button className="px-5 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Admin User"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none transition-all flex items-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-1">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@icehub.tech"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none transition-all flex items-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-1">Job Title</label>
                                    <input
                                        type="text"
                                        defaultValue="Hub Manager"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none transition-all flex items-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-1">Phone Number</label>
                                    <input
                                        type="text"
                                        defaultValue="+234 812 345 6789"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none transition-all flex items-center"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 bg-gray-50/30 flex justify-end border-t border-gray-50">
                            <button className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Device Management Section */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Device Management</h2>

                        <div className="space-y-4">
                            {/* Device 1 */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px] border border-gray-50 group hover:border-gray-100 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors shadow-sm">
                                        <Monitor size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">MacBook Pro - Lagos, NG</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Current Device</span>
                                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">•</span>
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Now</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-3 text-red-500/50 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100">
                                    <Lock size={18} />
                                </button>
                            </div>

                            {/* Device 2 */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px] border border-gray-50 group hover:border-gray-100 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors shadow-sm">
                                        <Smartphone size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">iPhone 15 Pro - Lagos, NG</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Mobile App</span>
                                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">•</span>
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">2 Hours Ago</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-3 text-red-500/50 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100">
                                    <Lock size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
