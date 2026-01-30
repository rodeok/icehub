'use client';

import Image from 'next/image';
import { BsTwitterX, BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

export default function NewsletterFooter() {
    return (
        <footer className="w-full bg-white">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-4 pt-24">
                <div className="bg-[#0B3470] rounded-2xl px-8 md:px-16 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10 !text-white">
                    {/* Left */}
                    <div className="max-w-lg">
                        <h3 className="text-3xl font-bold !text-white">Subscribe our newsletter</h3>
                        <p className="mt-4 text-sm !text-white leading-relaxed">
                            Subscribe to our newsletter and be the first to receive insights,
                            update and expert tips on our courses
                        </p>
                    </div>

                    {/* Right */}
                    <div className="w-full md:max-w-md">
                        <p className="text-sm mb-3 !text-white">Stay up to date</p>
                        <div className="flex bg-[#123F80] rounded-full p-1">
                            <input
                                type="email"
                                placeholder="Enter your mail"
                                className="flex-1 bg-transparent px-5 text-sm !text-white placeholder-white placeholder:opacity-70 focus:outline-none"
                            />
                            <button className="bg-blue-500 hover:bg-blue-600 transition text-sm font-medium px-6 py-3 rounded-full">
                                Subscribe
                            </button>
                        </div>
                        <p className="mt-3 text-xs !text-white">
                            By subscribing you are agreeing to privacy policy
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
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Blog</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-semibold !text-black">Support</h4>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li>Help Center</li>
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
        </footer>
    );
}
