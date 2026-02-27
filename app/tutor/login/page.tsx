'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function TutorLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
                isTutor: 'true'
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/tutor/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-blue-50/50">
            {/* Left side text/graphics */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-blue-600 p-12 text-white">
                <div className="max-w-md text-center">
                    <Link href="/" className="inline-block mb-10 bg-white/10 p-4 rounded-3xl">
                        <Image src="/images/icehub.png" alt="ICE HUB" width={80} height={80} className="mx-auto" />
                    </Link>
                    <h1 className="text-4xl font-bold mb-6">Welcome back, Mentor!</h1>
                    <p className="text-blue-100 text-lg">Sign in to manage your programs, track your students' progress, and access your academy resources exclusively on the ICE HUB Tutor Portal.</p>
                </div>
            </div>

            {/* Right side login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-hidden shadow-2xl rounded-l-[40px] z-10 -ml-8 lg:mt-0 relative">
                <div className="w-full max-w-md">
                    <div className="mb-8 lg:hidden text-center">
                        <Link href="/">
                            <Image src="/images/icehub.png" alt="ICE HUB" width={60} height={60} className="mx-auto mb-4" />
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-900">Tutor Portal</h2>
                    </div>

                    <h2 className="hidden lg:block text-3xl font-bold text-gray-900 mb-2">Sign In to Dashboard</h2>
                    <p className="text-gray-500 mb-8">Enter your credentials to access your account.</p>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-gray-700">Password</label>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Are you a student? <Link href="/login" className="text-blue-600 font-bold hover:underline">Student Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
