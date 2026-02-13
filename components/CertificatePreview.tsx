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
            className="w-[1123px] h-[794px] relative overflow-hidden shadow-2xl"
            style={{
                fontFamily: "'Playfair Display', serif", // Switched to a more elegant serif font if possible, otherwise Inter/Serif
                backgroundColor: colors.ivory,
                border: `20px solid ${colors.primary}`,
            }}
        >
            {/* Double Gold Border */}
            <div
                className="absolute inset-[10px] pointer-events-none"
                style={{ border: `2px solid ${colors.secondary}`, opacity: 0.8 }}
            />
            <div
                className="absolute inset-[30px] pointer-events-none border-dashed"
                style={{ border: `1px solid ${colors.secondary}`, opacity: 0.4 }}
            />

            {/* Corner Ornaments */}
            <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-32 h-32 m-8 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute top-0 right-0 w-32 h-32 m-8 rotate-90 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute bottom-0 left-0 w-32 h-32 m-8 -rotate-90 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute bottom-0 right-0 w-32 h-32 m-8 rotate-180 opacity-40" style={{ fill: colors.secondary }}>
                <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
            </svg>

            {/* Content Container */}
            <div className="h-full flex flex-col items-center justify-between py-16 px-24 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center space-y-8">
                    <div className="relative h-16 w-40 grayscale opacity-80">
                        <Image
                            src="/images/icehub.png"
                            alt="IceHub Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    <div className="text-center space-y-2">
                        <h1
                            className="text-6xl font-serif tracking-tight uppercase"
                            style={{ color: colors.primary, letterSpacing: '0.05em' }}
                        >
                            Certificate
                        </h1>
                        <p
                            className="text-xl font-bold uppercase tracking-[0.2em]"
                            style={{ color: colors.secondary }}
                        >
                            of Graduation
                        </p>
                    </div>
                </div>

                {/* Body Section */}
                <div className="text-center space-y-8 w-full">
                    <div className="space-y-4">
                        <p className="font-serif italic text-2xl text-gray-400">
                            This prestigious award is presented to
                        </p>
                        <div className="relative inline-block px-12 pb-4">
                            <h2
                                className="text-7xl font-bold tracking-tight"
                                style={{ color: colors.primary }}
                            >
                                {studentName}
                            </h2>
                            <div className="h-0.5 w-full absolute bottom-0 left-0" style={{ backgroundColor: colors.secondary }} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-lg font-medium max-w-2xl mx-auto leading-relaxed text-gray-600">
                            For demonstrating exceptional commitment, academic excellence, and technical proficiency through the completion of the intensive professional bootcamp in
                        </p>

                        <div className="space-y-2">
                            <h3
                                className="text-4xl font-black uppercase tracking-widest"
                                style={{ color: colors.primary }}
                            >
                                {programName}
                            </h3>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-[1px] w-12" style={{ backgroundColor: colors.secondary }} />
                                <span className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: colors.secondary }}>
                                    {weeks} Weeks Intensive Training
                                </span>
                                <div className="h-[1px] w-12" style={{ backgroundColor: colors.secondary }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="w-full grid grid-cols-3 items-end pt-12">
                    {/* Identification */}
                    <div className="space-y-4 border-l-2 pl-6" style={{ borderColor: colors.secondary }}>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Issued On</p>
                            <p className="text-sm font-bold text-gray-800">{issueDate}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Verify ID</p>
                            <p className="text-xs font-mono font-bold text-gray-800 uppercase">{certNumber}</p>
                        </div>
                    </div>

                    {/* Royal Gold Seal */}
                    <div className="flex justify-center">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            {/* Sunburst Pattern */}
                            <div className="absolute inset-0 rotate-45 border-[2px] opacity-20" style={{ borderColor: colors.secondary }} />
                            <div className="absolute inset-0 -rotate-45 border-[2px] opacity-20" style={{ borderColor: colors.secondary }} />

                            {/* The Seal */}
                            <div
                                className="relative z-10 w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                                    borderColor: colors.accent,
                                    boxShadow: '0 10px 30px -10px rgba(197, 160, 89, 0.5)'
                                }}
                            >
                                <svg viewBox="0 0 100 100" className="w-12 h-12 fill-white/80 mb-1">
                                    <path d="M50 0 L61.23 34.55 L97.55 34.55 L68.16 55.9 L79.39 90.45 L50 69.1 L20.61 90.45 L31.84 55.9 L2.45 34.55 L38.77 34.55 Z" />
                                </svg>
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Certified</p>
                                <p className="text-[8px] font-bold text-white/80 uppercase">ICEDT HUB 2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Signature Area */}
                    <div className="text-right space-y-2">
                        <div className="inline-block border-b-2 pr-12" style={{ borderColor: colors.primary }}>
                            <p className="font-serif italic text-3xl opacity-60 mb-1" style={{ color: colors.primary }}>Icehub</p>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-800">Executive Director, ICEDT</p>
                    </div>
                </div>
            </div>

            {/* Background Texture/Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
                <div className="grid grid-cols-6 gap-20 p-20 transform rotate-12">
                    {[...Array(24)].map((_, i) => (
                        <p key={i} className="text-xl font-black">ICEDT HUB</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
