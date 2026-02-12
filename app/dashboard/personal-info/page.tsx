'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    ShieldAlert,
    Camera,
    Loader2,
    CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PersonalInfoPage() {
    const { data: session, update: updateSession } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "", // Location
        emergencyContactName: "",
        emergencyContactPhone: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/user/profile');
                const data = await res.json();

                if (data.user) {
                    setFormData({
                        fullName: data.user.fullName || "",
                        email: data.user.email || "",
                        phoneNumber: data.user.phoneNumber || "",
                        address: data.user.address || "",
                        emergencyContactName: data.user.emergencyContactName || "",
                        emergencyContactPhone: data.user.emergencyContactPhone || ""
                    });
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchProfile();
        }
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            setSuccess(true);
            // Update session if name changed
            if (session?.user && formData.fullName !== session.user.name) {
                await updateSession();
            }

            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            console.error("Update error:", err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

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
                        <div className="h-32 w-32 rounded-[24px] bg-gray-100 overflow-hidden border border-gray-50 shadow-sm relative">
                            <Image
                                src="/images/starthero.jpg"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button className="absolute -right-2 -bottom-2 h-10 w-10 bg-white rounded-xl shadow-lg border border-gray-50 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform cursor-not-allowed opacity-70" title="Upload coming soon">
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="text-center sm:text-left space-y-3">
                        <h2 className="text-2xl font-extrabold text-gray-900">{formData.fullName || "Student"}</h2>
                        <p className="text-gray-400 font-bold text-sm tracking-tight text-blue-600">
                            {formData.email}
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                            <span className="px-3 py-1 bg-green-50 text-green-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100/50">
                                Active Student
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
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500/10"
                            />
                        </div>

                        <div className="space-y-3 opacity-60 cursor-not-allowed" title="Email cannot be changed">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Email Address</label>
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Phone size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Phone Number</label>
                            </div>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+234..."
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500/10"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin size={14} strokeWidth={2.5} />
                                <label className="text-xs font-bold text-gray-900">Location</label>
                            </div>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="City, Country"
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500/10"
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
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleChange}
                                    placeholder="Parent/Guardian Name"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500/10"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="emergencyContactPhone"
                                    value={formData.emergencyContactPhone}
                                    onChange={handleChange}
                                    placeholder="Contact Phone"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-12 flex items-center justify-end gap-4">
                    {success && (
                        <div className="flex items-center gap-2 text-green-600 font-bold text-sm animate-in fade-in slide-in-from-right-4">
                            <CheckCircle size={16} />
                            Saved successfully
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 font-bold text-sm">
                            {error}
                        </div>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:shadow-blue-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {saving && <Loader2 size={16} className="animate-spin" />}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
