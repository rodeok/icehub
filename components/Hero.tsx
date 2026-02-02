"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const slides = [
        {
            main: "Become a World Class",
            highlight: "Tech Talent",
            description: "Learn tech from top industry experts and explore global and funding opportunities in a thriving tech community.",
            image: "/images/icehubhero.jpg",
            layout: "overlay",
            buttons: [
                { text: "Learn More", icon: "▸" },
                { text: "Start Now", icon: "→" }
            ]
        },
        {
            main: "Your Journey to a Tech",
            highlight: "Career Starts Here",
            description: "Gain practical tech skills, startup guidance that connects you to career success, and global opportunities.",
            image: "/images/woman.png",
            layout: "split",
            buttons: [
                { text: "Learn More", icon: "▸" },
                { text: "Start Now", icon: "→" }
            ]
        }
    ];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full min-h-[500px] md:min-h-[650px] flex items-center bg-[#0a254d] overflow-hidden gpu"
        >
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {slide.layout === 'overlay' ? (
                        /* Layout 1: Background Overlay (Slide 1) */
                        <div className="relative w-full h-full flex items-center">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.highlight}
                                    fill
                                    priority={index === currentIndex}
                                    className="object-cover object-center opacity-80"
                                />
                            </div>

                            {/* Blue Curve Overlay */}
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

                            {/* Content Layer */}
                            <div className="container mx-auto px-6 md:px-12 relative z-20 pt-32 sm:pt-44 md:pt-16">
                                <div className={`max-w-2xl transition-all duration-1000 transform ${index === currentIndex ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                                    }`}>
                                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight !text-white mb-4">
                                        <span className="whitespace-nowrap">{slide.main}</span> <br />
                                        <span className="text-white">{slide.highlight}</span>
                                    </h1>

                                    <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-10 max-w-xl font-light !text-white opacity-95 leading-relaxed">
                                        {slide.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
                                        {slide.buttons.map((btn, btnIndex) => (
                                            <button
                                                key={btnIndex}
                                                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-[#0a254d]/80 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-[#0d3166] transition-[background-color,transform] hover:scale-105 flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg font-medium gpu"
                                            >
                                                {btn.text} <span>{btn.icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Layout 2: Split Layout with Hexagon (Slide 2) */
                        <div className="relative w-full h-full flex items-center bg-gradient-to-br from-[#083370] via-[#1066DF] to-[#083370]">
                            <div className="container mx-auto px-6 md:px-12 flex flex-row items-center justify-between gap-4 lg:gap-8 pt-32 sm:pt-44 lg:pt-16">
                                {/* Left Content */}
                                <div className={`flex-1 lg:max-w-xl text-left transition-all duration-1000 transform ${index === currentIndex ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                                    }`}>
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight !text-white mb-4">
                                        <span className="whitespace-nowrap">{slide.main}</span> <br />
                                        <span className="text-white">{slide.highlight}</span>
                                    </h1>

                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 font-light !text-white opacity-90 leading-relaxed">
                                        {slide.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center lg:justify-start w-full">
                                        {slide.buttons.map((btn, btnIndex) => (
                                            <button
                                                key={btnIndex}
                                                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-[#0a254d]/80 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-[#0d3166] transition-all hover:scale-105 flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg font-medium"
                                            >
                                                {btn.text} <span>{btn.icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Image (Hexagon) */}
                                <div className={`relative flex blur-md lg:blur-none items-center justify-center transition-all duration-1000 transform ${index === currentIndex ? "translate-x-0 opacity-100 scale-100" : "translate-x-10 opacity-0 scale-90"
                                    } lg:w-1/2`}>
                                    {/* Hexagon Border Effect */}
                                    <div className="relative w-[220px] h-[260px] sm:w-[280px] sm:h-[320px] md:w-[400px] md:h-[460px] bg-blue-400 p-[3px]"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                        }}
                                    >
                                        <div className="w-full h-full bg-white overflow-hidden relative"
                                            style={{
                                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                            }}
                                        >
                                            <Image
                                                src={slide.image}
                                                alt="Professional Woman"
                                                fill
                                                className="object-cover object-[center_20%]"
                                            />
                                        </div>
                                    </div>

                                    {/* Decorative elements (optional, but Figma has a slight blue halo) */}
                                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl -z-10 rounded-full scale-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <AnimatePresence>
                {isHovered && (
                    <>
                        <motion.button
                            key="prev-btn"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={prevSlide}
                            className="absolute left-4 md:left-8 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-[background-color,transform] group gpu"
                            aria-label="Previous slide"
                        >
                            {/* <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" /> */}
                        </motion.button>
                        <motion.button
                            key="next-btn"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={nextSlide}
                            className="absolute right-4 md:right-8 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-[background-color,transform] group gpu"
                            aria-label="Next slide"
                        >
                            {/* <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" /> */}
                        </motion.button>
                    </>
                )}
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-[width,background-color] duration-300 rounded-full ${index === currentIndex ? "w-8 h-2 bg-blue-500" : "w-2 h-2 bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
