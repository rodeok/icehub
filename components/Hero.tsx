import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-[600px] flex items-center bg-black overflow-hidden">

            {/* 1. The Main Image (Background) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/icehubhero.jpg"
                    alt="Tech Talent"
                    className="w-full h-full object-cover object-center opacity-80" // Slightly dimmed to help text pop
                />
            </div>

            {/* 2. The Blue Curve Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: `
                        radial-gradient(
                          circle at -10% 50%, 
                          #083370 0%, 
                          #1066DF 40%, 
                          transparent 70%
                        ),
                        linear-gradient(155.25deg, #083370 7.57%, #1066DF 71.81%)
                    `,
                    maskImage: 'radial-gradient(circle at 0% 50%, black 40%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(circle at 0% 50%, black 40%, transparent 75%)',
                }}
            />

            {/* 3. Content Layer */}
            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="max-w-2xl">
                    {/* Added !text-white to force override any global styles */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 !text-white">
                        Become a World Class <br />
                        <span className="text-white">Tech Talent</span>
                    </h1>

                    <p className="text-lg md:text-xl mb-10 max-w-lg font-light !text-white opacity-95">
                        Learn tech from top industry experts and explore global and
                        funding opportunities in a thriving tech community.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-3 bg-[#0a254d] text-white border border-white/20 rounded-lg hover:bg-[#0d3166] transition-colors flex items-center gap-2">
                            Learn More <span>▸</span>
                        </button>
                        <button className="px-8 py-3 bg-[#0a254d] text-white border border-white/20 rounded-lg hover:bg-[#0d3166] transition-colors flex items-center gap-2">
                            Start Now <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;