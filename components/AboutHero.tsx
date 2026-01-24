import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
    return (
        <section className="relative w-full h-[600px] lg:h-[800px] overflow-hidden bg-white pt-24 md:pt-0 flex items-center justify-center">
            {/* Background Image with Fade to White at Bottom */}
            <div className="absolute inset-0">
                <Image
                    src="/images/icehubhero.jpg"
                    alt="Ice Hub Tech Students"
                    fill
                    priority
                    className="object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] text-slate-900">
                        Our Story is <span className="text-[#1a73e8]">Blueprint for Your Future</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        we&apos;re not just a tech hub, we&apos;re a launchpad for careers. Discover the passion,
                        purpose, and people powering the next generation of innovators
                    </p>
                </div>
            </div>

            {/* Decorative Floating Dots (Right Side) */}
            <div className="absolute bottom-20 right-[15%] flex flex-col items-center gap-12 z-20 pointer-events-none hidden md:flex">
                <div className="flex gap-16 items-center">
                    <div className="w-2.5 h-2.5 bg-purple-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-5 h-5 bg-[#00D166] rounded-full shadow-xl"></div>
                </div>
                <div className="flex gap-10 items-center mr-16">
                    <div className="w-2 h-2 bg-orange-400 rounded-full shadow-lg"></div>
                    <div className="w-2.5 h-2.5 bg-[#4B40FF] rounded-full shadow-lg"></div>
                </div>
                <div className="flex gap-24 items-center mr-8">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg"></div>
                    <div className="w-2.5 h-2.5 bg-[#1400FF] rounded-full shadow-lg"></div>
                </div>
            </div>

            {/* Background Warmth Overlays */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-yellow-50/20 to-transparent"></div>
            </div>
        </section>
    );
}