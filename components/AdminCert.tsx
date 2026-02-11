'use client';

import React from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Award,
    ExternalLink,
    CheckCircle2,
    Clock,
    Lock,
    QrCode,
    Mail,
    ChevronRight
} from 'lucide-react';

const certificateData = [
    {
        name: 'Sarah Connor',
        program: 'FULLSTACK WEB DEVELOPMENT',
        progress: 100,
        eligibility: 'ELIGIBLE',
        status: 'PENDING',
        statusType: 'warning'
    },
    {
        name: 'Elena Rodriguez',
        program: 'DATA SCIENCE INCUBATION',
        progress: 100,
        eligibility: 'ELIGIBLE',
        status: 'GENERATED',
        statusType: 'success'
    },
    {
        name: 'David Lee',
        program: 'FULLSTACK WEB DEVELOPMENT',
        progress: 100,
        eligibility: 'ELIGIBLE',
        status: 'DOWNLOADED',
        statusType: 'success'
    },
    {
        name: 'John Smith',
        program: 'UX DESIGN FOUNDATIONS',
        progress: 85,
        eligibility: 'IN PROGRESS',
        status: 'LOCKED',
        statusType: 'muted'
    }
];

export default function AdminCert() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Issue, track and verify digital credentials for program graduates.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    <Plus size={18} strokeWidth={2.5} />
                    Design Template
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Table Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Filter Bar */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search students or programs..."
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-32 bg-gray-50 rounded-xl" /> {/* Placeholder per image */}
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
                                Bulk Issue
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-gray-50">
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Progress</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Eligibility</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {certificateData.map((cert, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-6">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">{cert.program}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-xs font-black text-gray-900">{cert.progress}%</span>
                                                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${cert.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                                                            style={{ width: `${cert.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-wider ${cert.eligibility === 'ELIGIBLE' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-400'}`}>
                                                    {cert.eligibility}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {cert.status === 'PENDING' && <Clock size={12} className="text-orange-400" />}
                                                    {cert.status === 'GENERATED' && <Award size={12} className="text-blue-500" />}
                                                    {cert.status === 'DOWNLOADED' && <CheckCircle2 size={12} className="text-green-500" />}
                                                    {cert.status === 'LOCKED' && <Lock size={12} className="text-gray-300" />}
                                                    <span className={`text-[9px] font-black tracking-widest ${cert.statusType === 'success' ? 'text-blue-500' :
                                                        cert.statusType === 'warning' ? 'text-orange-400' : 'text-gray-300'
                                                        }`}>
                                                        {cert.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {cert.status === 'PENDING' ? (
                                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black hover:bg-blue-700 transition-all shadow-sm">
                                                            Issue Now
                                                        </button>
                                                    ) : (
                                                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                            <ExternalLink size={16} />
                                                        </button>
                                                    )}
                                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Badge System Card */}
                    <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                                <Award size={28} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-xl font-bold mb-3 !text-white">Digital Badge System</h2>
                            <p className="!text-white text-sm leading-relaxed mb-8">
                                Your certificates are blockchain-verifiable. Graduates can share them directly to LinkedIn.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="h-10 w-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center">
                                        <QrCode size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold !text-white">Verifiable QR</p>
                                        <p className="text-[10px] !text-white">Scan to verify</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="h-10 w-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold !text-white">Auto-Email</p>
                                        <p className="text-[10px] !text-white">On graduation</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-blue-600 rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/40 hover:bg-blue-700 transition-all">
                                Upgrade System
                            </button>
                        </div>
                        {/* Abstract background effect per image */}
                        <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Total Issued</span>
                                <span className="text-lg font-black text-gray-900">856</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Verified Views</span>
                                <span className="text-lg font-black text-gray-900">2,410</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Pending Claim</span>
                                <span className="text-lg font-black text-orange-400">42</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
