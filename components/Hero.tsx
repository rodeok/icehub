import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative w-full min-h-[600px] flex bg-[#f8f9fa] overflow-hidden">
            {/* Main Flex Container */}
            <div className="relative w-full flex flex-col lg:flex-row h-full">

                {/* Left Column - Blue Background */}
                <div className="relative w-full lg:w-[55%] bg-[#004DB3] flex items-center z-20 min-h-[500px] lg:min-h-[600px]">
                    <div className="w-full max-w-xl pl-6 pr-12 lg:pl-24 lg:pr-8 text-white space-y-8 py-12 lg:py-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Become a World-class <br /> Tech Talent
                        </h1>
                        <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed max-w-md">
                            Learn tech from top Industry experts and explore global and funding opportunities in a thriving tech community
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex items-center gap-2 bg-[#091E42] hover:bg-[#0d2b5c] text-white px-8 py-3.5 rounded-full font-medium transition-colors text-sm shadow-lg group cursor-pointer">
                                Learn More
                                <Play size={10} className="fill-current" />
                            </button>

                            <button className="flex items-center gap-2 bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-medium transition-colors text-sm group cursor-pointer">
                                Start Now
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* The Curved Divider - Absolute positioned on the right edge.
                     Using translate-x-full to push it completely to the right of the blue container.
                     The SVG width determines how far it extends into the image area.
                 */}
                    <div className="hidden lg:block absolute top-0 right-0 bottom-0 h-full w-24 xl:w-32 z-20 translate-x-[99%] pointer-events-none">
                        <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Convex curve: Starts at 0,0 (top-left local), curves out to 100,50 (mid-right), back to 0,100 (bottom-left) */}
                            <path d="M 0 0 C 60 10 100 30 100 50 C 100 70 60 90 0 100 Z" fill="#004DB3" />
                        </svg>
                    </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative w-full lg:w-[55%] h-[400px] lg:h-auto lg:-ml-[5%]">
                    <Image
                        src="/images/icehubhero.jpg"
                        alt="Happy tech students"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
