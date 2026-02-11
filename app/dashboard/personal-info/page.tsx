'use client';

import React from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    ShieldAlert,
    Camera
} from 'lucide-react';
import Image from 'next/image';

export default function PersonalInfoPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Manage your profile and contact details</p>
            </div>

            {/* Main Profile Card */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden p-8 lg:p-12">

                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-[24px] bg-gray-100 overflow-hidden border border-gray-50 shadow-sm">
                            <Image
                                src="/images/starthero.jpg" // Using existing image from previous steps
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button className="absolute -right-2 -bottom-2 h-10 w-10 bg-white rounded-xl shadow-lg border border-gray-50 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="text-center sm:text-left space-y-3">
                        <h2 className="text-2xl font-extrabold text-gray-900">Alex Johnson</h2>
                        <p className="text-gray-400 font-bold text-sm tracking-tight">Software Development Student</p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                            <span className="px-3 py-1 bg-green-50 text-green-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100/50">
                                Verified
                            </span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100/50">
                                Ice Hub ID: IH-2024-001
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-50 pt-12 space-y-12">
                    {/* Info Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <User size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Full Name</label>
                            </div>
                            <input
                                type="text"
                                defaultValue="Alex Johnson"
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Email Address</label>
                            </div>
                            <input
                                type="email"
                                defaultValue="alex.johnson@example.com"
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Phone size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Phone Number</label>
                            </div>
                            <input
                                type="text"
                                defaultValue="+234 800 123 4567"
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Location</label>
                            </div>
                            <input
                                type="text"
                                defaultValue="Lagos, Nigeria"
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* Emergency Contact Section */}
                    <div className="pt-4 space-y-8">
                        <div className="flex items-center gap-2 text-red-500">
                            <ShieldAlert size={16} strokeWidth={2.5} />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Emergency Contact</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Contact Name</label>
                                <input
                                    type="text"
                                    defaultValue="Mary Johnson"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                                <input
                                    type="text"
                                    defaultValue="+234 800 987 6543"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-12 flex justify-end">
                    <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:shadow-blue-300">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
