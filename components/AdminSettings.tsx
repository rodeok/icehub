'use client';

import React, { useState, useEffect } from 'react';
import {
    User,
    Shield,
    Bell,
    Palette,
    Database,
    Monitor,
    Smartphone,
    Lock,
    Plus,
    QrCode
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

    // Admin State
    const [currentAdmin, setCurrentAdmin] = useState<any>(null);
    const [admins, setAdmins] = useState<any[]>([]);

    // UI State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // 2FA Flow State
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [twoFactorToken, setTwoFactorToken] = useState('');
    const [setupAdminId, setSetupAdminId] = useState('');

    // New Admin Form State
    const [showAddAdmin, setShowAddAdmin] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ fullName: '', email: '', password: '' });

    useEffect(() => {
        fetchMe();
    }, []);

    useEffect(() => {
        if (activeTab === 'security') {
            fetchAdmins();
        }
    }, [activeTab]);

    const fetchMe = async () => {
        try {
            const res = await fetch('/api/admin/me');
            const data = await res.json();
            if (data.success) {
                setCurrentAdmin(data.admin);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAdmins = async () => {
        try {
            const res = await fetch('/api/admin/admins');
            const data = await res.json();
            if (data.success) {
                setAdmins(data.admins);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleGenerate2FA = async (adminId?: string) => {
        setError('');
        setSuccess('');
        try {
            const res = await fetch('/api/admin/2fa/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminId })
            });
            const data = await res.json();
            if (data.success) {
                setQrCodeUrl(data.qrCodeUrl);
                setSetupAdminId(adminId || currentAdmin._id);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to generate 2FA');
        }
    };

    const handleVerify2FA = async () => {
        setError('');
        try {
            const res = await fetch('/api/admin/2fa/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: twoFactorToken, adminId: setupAdminId })
            });
            const data = await res.json();
            if (data.success) {
                setSuccess('2FA successfully enabled!');
                setQrCodeUrl('');
                setTwoFactorToken('');
                fetchMe();
                fetchAdmins();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to verify 2FA token');
        }
    };

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await fetch('/api/admin/admins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAdmin)
            });
            const data = await res.json();
            if (data.success) {
                setSuccess('Admin created successfully');
                setShowAddAdmin(false);
                setNewAdmin({ fullName: '', email: '', password: '' });
                fetchAdmins();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to create admin');
        }
    };

    if (isLoading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Manage your account, hub preferences and system configurations.</p>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">{error}</div>}
            {success && <div className="p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-medium">{success}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

                <div className="lg:col-span-9 space-y-8">
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-gray-50">
                                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                                <p className="text-xs text-gray-400 mt-1 font-medium tracking-tight">Update your personal details and admin identity.</p>
                            </div>
                            <div className="p-8 space-y-10">
                                <div className="flex items-center gap-6">
                                    <div className="h-24 w-24 rounded-3xl bg-gray-100 relative overflow-hidden border border-gray-50 shadow-sm">
                                        <Image src="/images/icehub.png" alt="Admin Avatar" fill className="object-cover" />
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-1">Full Name</label>
                                        <input type="text" defaultValue={currentAdmin?.fullName || 'Admin User'} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none flex items-center" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest pl-1">Email Address</label>
                                        <input type="email" defaultValue={currentAdmin?.email || 'admin@icehub.tech'} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none flex items-center" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8">
                            {/* Personal Security */}
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Two-Factor Authentication (2FA)</h2>
                                        <p className="text-xs text-gray-400 mt-1 font-medium tracking-tight">Add an extra layer of security to your account.</p>
                                    </div>
                                    {currentAdmin?.twoFactorEnabled ? (
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold flex items-center gap-2">
                                            <Shield size={14} /> Enabled
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleGenerate2FA()}
                                            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
                                        >
                                            Activate 2FA
                                        </button>
                                    )}
                                </div>

                                {qrCodeUrl && setupAdminId === currentAdmin?._id && !currentAdmin?.twoFactorEnabled && (
                                    <div className="mt-4 p-6 bg-gray-50 rounded-2xl flex flex-col items-center gap-4">
                                        <p className="text-sm text-gray-600 text-center font-medium">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc) and enter the 6-digit code below.</p>
                                        <Image src={qrCodeUrl} alt="2FA QR Code" width={200} height={200} className="rounded-xl shadow-sm bg-white p-2" />
                                        <div className="flex gap-3 mt-4 w-full max-w-sm">
                                            <input
                                                type="text"
                                                placeholder="6-digit code"
                                                value={twoFactorToken}
                                                onChange={(e) => setTwoFactorToken(e.target.value)}
                                                className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-blue-500"
                                            />
                                            <button
                                                onClick={handleVerify2FA}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700"
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Admin Management */}
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Admin Management</h2>
                                        <p className="text-xs text-gray-400 mt-1 font-medium tracking-tight">Manage other admins and their security settings.</p>
                                    </div>
                                    <button
                                        onClick={() => setShowAddAdmin(!showAddAdmin)}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-sm"
                                    >
                                        <Plus size={16} /> Add Admin
                                    </button>
                                </div>

                                {showAddAdmin && (
                                    <form onSubmit={handleAddAdmin} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-4">
                                        <h3 className="text-sm font-bold">Create New Admin</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input required type="text" placeholder="Full Name" value={newAdmin.fullName} onChange={e => setNewAdmin({ ...newAdmin, fullName: e.target.value })} className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none" />
                                            <input required type="email" placeholder="Email" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none" />
                                            <input required type="password" placeholder="Password" value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none" />
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold">Save Admin</button>
                                        </div>
                                    </form>
                                )}

                                <div className="space-y-4">
                                    {admins.map((admin) => (
                                        <div key={admin._id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 rounded-[24px] border border-gray-50 transition-all gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm font-bold text-lg">
                                                    {admin.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">{admin.fullName} {admin._id === currentAdmin?._id && '(You)'}</h4>
                                                    <p className="text-xs text-gray-500">{admin.email}</p>
                                                    <div className="mt-1 flex gap-2">
                                                        {admin.twoFactorEnabled ? (
                                                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">2FA Enabled</span>
                                                        ) : (
                                                            <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">2FA Disabled</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-3">
                                                <button
                                                    onClick={() => handleGenerate2FA(admin._id)}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50"
                                                >
                                                    <QrCode size={14} /> Generate 2FA
                                                </button>
                                            </div>

                                            {/* Nested QR display for other admins */}
                                            {qrCodeUrl && setupAdminId === admin._id && (
                                                <div className="w-full md:w-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-3">
                                                    <Image src={qrCodeUrl} alt="2FA QR Code" width={120} height={120} className="rounded-lg" />
                                                    <div className="flex w-full gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Code"
                                                            value={twoFactorToken}
                                                            onChange={(e) => setTwoFactorToken(e.target.value)}
                                                            className="w-20 px-3 py-2 border rounded-lg text-xs outline-none"
                                                        />
                                                        <button
                                                            onClick={handleVerify2FA}
                                                            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
                                                        >
                                                            Verify
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
