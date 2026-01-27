import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center bg-white overflow-hidden py-20">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/icehubhero.jpg" 
          alt="Team Background" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* The "Foggy" Radial Overlay - This creates the exact center-white fade */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,1) 15%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 80%)'
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        {/* Main Heading */}
        <h1 className="text-[32px] md:text-[48px] font-black text-[#111111] leading-[1.1] tracking-tight mb-4">
          Our Story is <span className="text-[#1D63ED]">Blueprint for Your Future</span>
        </h1>
        
        {/* Subtext - Note the lowercase style and lighter font weight */}
        <p className="text-[13px] md:text-[15px] text-[#444444] max-w-[550px] mx-auto leading-relaxed font-normal">
          we're not just a tech hub, we're a launchpad for careers. Discover the passion, 
          purpose, and people powering the next generation of innovators
        </p>

        {/* Decorative Floating Dots */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 hidden lg:block">
           <div className="relative w-40 h-64">
              {/* Purple Dot */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-[#8B5CF6] rounded-full" />
              {/* Large Green Dot */}
              <div className="absolute top-32 right-4 w-4 h-4 bg-[#10B981] rounded-full" />
              {/* Small Green Dot */}
              <div className="absolute top-48 left-12 w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
              {/* Orange Dot */}
              <div className="absolute bottom-16 left-0 w-2 h-2 bg-[#F59E0B] rounded-full" />
              {/* Small Purple Dot */}
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[#A855F7] rounded-full" />
              {/* Blue Dot */}
              <div className="absolute bottom-0 right-8 w-3 h-3 bg-[#3B82F6] rounded-full" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;