'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BsTwitterX, BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

export default function NewsletterFooter() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubscribe = async () => {
        if (!email) {
            setMessage('Please enter an email address.');
            setError(true);
            return;
        }

        setLoading(true);
        setMessage('');
        setError(false);

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                setShowSuccessModal(true);
                setEmail('');
            } else {
                setMessage(data.error || 'Failed to subscribe.');
                setError(true);
            }
        } catch (err) {
            setMessage('An unexpected error occurred.');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="w-full bg-white">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24">
                <div className="bg-[#0B3470] rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8 sm:gap-10 !text-white">
                    {/* Left */}
                    <div className="max-w-lg">
                        <h3 className="text-2xl sm:text-3xl font-bold !text-white">Subscribe our newsletter</h3>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base !text-white leading-relaxed opacity-90">
                            Subscribe to our newsletter and be the first to receive insights,
                            updates and expert tips on our courses
                        </p>
                    </div>

                    {/* Right */}
                    <div className="w-full md:max-w-md">
                        <p className="text-sm mb-3 !text-white font-medium">Stay up to date</p>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }} className="flex flex-col sm:flex-row bg-[#123F80] rounded-full sm:p-1 overflow-hidden gap-2 sm:gap-0 p-2 sm:p-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-2.5 sm:px-5 sm:py-0 text-sm sm:text-base !text-white placeholder-white placeholder:opacity-70 focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-sm sm:text-base font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-2 text-sm ${error ? 'text-red-300' : 'text-green-300'}`}>
                                {message}
                            </p>
                        )}
                        <p className="mt-3 text-xs sm:text-sm !text-white opacity-80">
                            By subscribing you agree to our privacy policy
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 grid grid-cols-1 md:grid-cols-5 gap-12">
                {/* Brand */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                        <Image src="/images/icehub.png" alt="IceHub" width={40} height={40} />
                        <span className="text-2xl font-bold text-blue-600">ICEHUB</span>
                    </div>
                    <p className="mt-4 text-sm !text-black max-w-xs">
                        Learn, Connect, and Build the Future with Us
                    </p>

                    {/* Socials */}
                    <div className="flex gap-3 mt-6">
                        <a className="p-2 bg-black text-white rounded">
                            <BsTwitterX />
                        </a>
                        <a className="p-2 bg-blue-600 text-white rounded">
                            <BsFacebook />
                        </a>
                        <a className="p-2 bg-blue-700 text-white rounded">
                            <BsLinkedin size={16} />
                        </a>
                        <a className="p-2 bg-red-600 text-white rounded">
                            <BsYoutube size={16} />
                        </a>
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h4 className="font-semibold !text-black">Services</h4>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li><a href="/courses" className="hover:text-blue-600 transition">Courses</a></li>
                        <li><a href="/services/web-software" className="hover:text-blue-600 transition">Web and Software Solutions</a></li>
                        <li><a href="/services/startup-incubation" className="hover:text-blue-600 transition">Startup Incubation</a></li>
                        <li><a href="/services/workspace" className="hover:text-blue-600 transition">Workspace</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-semibold !text-black">Company</h4>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li><a href="/about" className="hover:text-blue-600 transition">About Us</a></li>
                        {/* <li><a href="/careers" className="hover:text-blue-600 transition">Careers</a></li> */}
                        <li><a href="/blogs" className="hover:text-blue-600 transition">Blog</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-semibold !text-black">Support</h4>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li><a href="https://chat.icehub-ng.com" className="hover:text-blue-600 transition">Help Center</a></li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                    <div className="flex gap-4">
                        <span>Terms & Conditions</span>
                        <span>Privacy Policy</span>
                    </div>
                    <span>ICE INNOVATION HUB. © 2025. All Rights Reserved</span>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Subscription Successful!</h3>
                        <p className="text-center text-gray-600 mb-6">
                            Thank you for subscribing to our newsletter. We'll keep you updated with the latest insights.
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200"
                        >
                            Continue
                        </button>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
}
