"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { User, Mail, BookOpen, Lock, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        courseId: "",
    });
    const [programs, setPrograms] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await fetch("/api/programs");
                const data = await res.json();
                if (data.programs) {
                    setPrograms(data.programs);
                    if (data.programs.length > 0) {
                        setFormData(prev => ({ ...prev, courseId: data.programs[0]._id }));
                    }
                }
            } catch (err) {
                console.error("Failed to fetch programs", err);
            }
        };
        fetchPrograms();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Register user
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    programId: formData.courseId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Registration failed");
                return;
            }

            // Sign in immediately after registration
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Account created but failed to log in automatically.");
                setTimeout(() => router.push("/login"), 2000);
            } else if (result?.ok) {
                router.push("/payment");
                router.refresh();
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            welcomeTitle="Hello! Welcome to Ice Hub"
            welcomeSubtitle="Join our community of digital innovators"
            formTitle="Create an Account"
            formSubtitle="Become a part of great innovators"
            sideIllustration="/images/authtable.png"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            placeholder="Enter your full name"
                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none text-gray-900 text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Email Address */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="Enter your email address"
                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none text-gray-900 text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Course Selection */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Selected Course
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={formData.courseId}
                            onChange={(e) =>
                                setFormData({ ...formData, courseId: e.target.value })
                            }
                            className="block w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none text-gray-900 text-sm appearance-none cursor-pointer"
                            required
                        >
                            {programs.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown size={18} />
                        </div>
                    </div>

                    {/* Selected Course Details */}
                    {formData.courseId && programs.find(p => p._id === formData.courseId) && (
                        <div className="mt-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex justify-between items-center animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Tuition Fee</p>
                                <p className="text-lg font-black text-gray-900">
                                    N{programs.find(p => p._id === formData.courseId).price.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Duration</p>
                                <p className="text-sm font-bold text-gray-700">
                                    {programs.find(p => p._id === formData.courseId).duration}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            placeholder="Password"
                            className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none text-gray-900 text-sm"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#186ADE] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Redirecting to payment page..." : "Proceed to pay"}
                    </button>
                </div>

                {/* Already have an account? */}
                <p className="text-center text-sm font-medium text-gray-900 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-bold">
                        Log In
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
