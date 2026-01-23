import React from 'react';

export default function BlueprintHero() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/images/icehubhero.jpg")',
                }}
            >
                {/* Yellow/Warm overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/40 via-orange-50/30 to-yellow-100/40"></div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-blue-500 rounded-full"></div>

            {/* Content Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="text-black">Our Story is </span>
                        <span className="text-blue-600">Blueprint for</span>
                        <br />
                        <span className="text-blue-600">Your Future</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        We're not just a tech hub, we're a launchpad for careers. Discover the passion,
                        <br className="hidden md:block" />
                        purpose, and people powering the next generation of innovators
                    </p>
                </div>
            </div>

            {/* Background people image overlay effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-transparent via-white/20 to-white/60"></div>
            </div>
        </div>
    );
}