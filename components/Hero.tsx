'use client';

import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-white">
            {/* Right Image */}
            <div className="absolute right-0 top-0 h-full w-1/2">
                <Image
                    src="/images/icehubhero.jpg"
                    alt="Tech talents"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Left Blue Shape */}
            <div className="absolute left-0 top-0 h-full w-[65%] rounded-r-[120px] bg-gradient-to-br from-[#0b4fb3] via-[#0d5bd1] to-[#0a4aa3]" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="max-w-xl pl-20 text-white">
                    <h1 className="mb-6 text-5xl font-bold leading-tight">
                        Become a World-class
                        <br />
                        Tech Talent
                    </h1>

                    <p className="mb-10 max-w-md text-lg leading-relaxed text-white/90">
                        Learn tech from top industry experts and explore global and funding
                        opportunities in a thriving tech community
                    </p>

                    <div className="flex gap-4">
                        <button className="rounded-full bg-[#0a3f8f] px-8 py-3 font-medium text-white transition hover:bg-[#083777]">
                            Learn More →
                        </button>

                        <button className="rounded-full bg-[#062f6e] px-8 py-3 font-medium text-white transition hover:bg-[#05275c]">
                            Start Now →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
