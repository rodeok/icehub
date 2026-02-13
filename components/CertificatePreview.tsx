'use client';

import React from 'react';
import Image from 'next/image';

interface CertificateProps {
    studentName: string;
    programName: string;
    weeks: number;
    issueDate: string;
    certNumber: string;
}

export default function CertificatePreview({
    studentName,
    programName,
    weeks,
    issueDate,
    certNumber,
}: CertificateProps) {
    // Updated Premium Color Palette
    const colors = {
        primary: '#0c1a33',    // Deep Midnight Blue
        secondary: '#c5a059',  // Sophisticated Gold
        accent: '#e5c07b',     // Light Gold
        text: '#1a1a1a',       // Near Black
        subtext: '#4a4a4a',    // Dark Gray
        background: '#ffffff', // Pure White
        ivory: '#fdfcf8',      // Ivory Background
        border: '#c5a059',     // Gold Border
    };

    return (
        <div
            id="certificate-to-print"
            className="w-full max-w-[1123px] aspect-[1.414/1] relative overflow-hidden shadow-2xl mx-auto"
            style={{
                backgroundColor: colors.ivory,
                border: `clamp(10px, 1.8vw, 20px) solid ${colors.primary}`,
            }}
        >
            {/* Decorative Borders */}
            <div
                className="absolute inset-[1%] pointer-events-none"
                style={{ border: `2px solid ${colors.secondary}`, opacity: 0.8 }}
            />
            <div
                className="absolute inset-[3%] pointer-events-none border-dashed border-spacing-4"
                style={{ border: `1px solid ${colors.secondary}`, opacity: 0.4 }}
            />

            {/* Corner Ornaments */}
            <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-[12%] aspect-square m-[3%] opacity-40 transition-transform" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute top-0 right-0 w-[12%] aspect-square m-[3%] rotate-90 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute bottom-0 left-0 w-[12%] aspect-square m-[3%] -rotate-90 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute bottom-0 right-0 w-[12%] aspect-square m-[3%] rotate-180 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>

            {/* Content Wrapper */}
            <div className="h-full flex flex-col items-center justify-between py-[6%] px-[10%] relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center space-y-[2%] w-full">
                    <div className="relative h-[8vw] max-h-20 w-[20vw] max-w-44 mb-[1%]">
                        <Image
                            src="/images/icehub.png"
                            alt="IceHub Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="text-center">
                        <h1
                            className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif leading-none tracking-[0.05em] uppercase"
                            style={{ color: colors.primary }}
                        >
                            Certificate
                        </h1>
                        <p
                            className="text-[clamp(0.8rem,1.8vw,1.25rem)] font-black uppercase tracking-[0.3em] mt-1"
                            style={{ color: colors.secondary }}
                        >
                            of Graduation
                        </p>
                    </div>
                </div>

                {/* Recipient Section */}
                <div className="text-center space-y-[3%] w-full flex-grow flex flex-col justify-center">
                    <div className="space-y-[1%]">
                        <p className="font-serif italic text-[clamp(1rem,2vw,1.5rem)] text-gray-500">
                            This distinguished merit is proudly presented to
                        </p>
                        <div className="relative inline-block px-[5%]">
                            <h2
                                className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight py-2 leading-[1.1]"
                                style={{ color: colors.primary }}
                            >
                                {studentName}
                            </h2>
                            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mt-2" />
                        </div>
                    </div>

                    <div className="space-y-[2%]">
                        <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] font-medium max-w-2xl mx-auto leading-relaxed text-gray-600 px-4">
                            In recognition of successful completion and outstanding performance in the professional certification program for:
                        </p>

                        <div className="space-y-[1%]">
                            <h3
                                className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-widest leading-none py-2"
                                style={{ color: colors.primary }}
                            >
                                {programName}
                            </h3>
                            <div className="flex items-center justify-center gap-[2%]">
                                <div className="h-[1px] w-[10%] bg-gradient-to-r from-transparent to-[#c5a059]" />
                                <span className="text-[clamp(0.6rem,1.2vw,0.85rem)] font-black uppercase tracking-[0.4em] text-nowrap" style={{ color: colors.secondary }}>
                                    {weeks} Weeks intensive Mastery
                                </span>
                                <div className="h-[1px] w-[10%] bg-gradient-to-l from-transparent to-[#c5a059]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Validation Section */}
                <div className="w-full flex items-end justify-between pt-[4%] border-t border-gray-100/50">
                    {/* Security & ID */}
                    <div className="w-1/3 space-y-[4%] text-left">
                        <div>
                            <p className="text-[clamp(0.5rem,1vw,0.7rem)] font-black uppercase tracking-[0.2em] text-gray-400">Date of Award</p>
                            <p className="text-[clamp(0.7rem,1.3vw,1rem)] font-bold text-gray-800">{issueDate}</p>
                        </div>
                        <div>
                            <p className="text-[clamp(0.5rem,1vw,0.7rem)] font-black uppercase tracking-[0.2em] text-gray-400">Verification ID</p>
                            <p className="text-[clamp(0.6rem,1.1vw,0.85rem)] font-mono font-bold text-gray-700">{certNumber}</p>
                        </div>
                    </div>

                    {/* Authentication Seal */}
                    <div className="w-1/3 flex justify-center pb-[1%]">
                        <div className="relative w-[15vw] max-w-40 aspect-square flex items-center justify-center">
                            {/* Decorative Seal Background */}
                            <div className="absolute inset-0 rotate-45 border-[2px] opacity-10 rounded-xl" style={{ borderColor: colors.secondary }} />
                            <div className="absolute inset-0 -rotate-45 border-[2px] opacity-10 rounded-xl" style={{ borderColor: colors.secondary }} />

                            <div
                                className="relative z-10 w-[80%] aspect-square rounded-full border-4 flex flex-col items-center justify-center shadow-2xl overflow-hidden scale-110"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                                    borderColor: colors.accent,
                                    boxShadow: '0 15px 35px -10px rgba(197, 160, 89, 0.6)'
                                }}
                            >
                                <svg viewBox="0 0 100 100" className="w-[40%] aspect-square fill-white/90 mb-[2%] drop-shadow-md">
                                    <path d="M50 0 L61.23 34.55 L97.55 34.55 L68.16 55.9 L79.39 90.45 L50 69.1 L20.61 90.45 L31.84 55.9 L2.45 34.55 L38.77 34.55 Z" />
                                </svg>
                                <p className="text-[clamp(0.5rem,1vw,0.7rem)] font-black text-white uppercase tracking-widest text-center px-1">Verified</p>
                                <p className="text-[clamp(0.4rem,0.8vw,0.5rem)] font-bold text-white/80 uppercase tracking-tighter">ICEHUB 2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Authorization Signature */}
                    <div className="w-1/3 text-right space-y-[2%]">
                        <div className="inline-block border-b-2 border-slate-900 pb-1 w-[80%] max-w-60">
                            <p className="font-serif italic text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none mb-1 pr-2" style={{ color: colors.primary }}>
                                Icehub Director
                            </p>
                        </div>
                        <p className="text-[clamp(0.5rem,1vw,0.7rem)] font-black uppercase tracking-[0.15em] text-gray-800 leading-tight">
                            Executive Director<br />
                            <span className="text-gray-400">ICEDT HUB NIGERIA</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Premium Subtle Watermark Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025] select-none overflow-hidden transform skew-y-12">
                <div className="grid grid-cols-8 gap-[5%] p-[2%]">
                    {[...Array(48)].map((_, i) => (
                        <p key={i} className="text-[clamp(0.8rem,1.5vw,1.2rem)] font-black text-nowrap">ICEHUB ACADEMY</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
