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
    // Define brand colors as hex to avoid "lab()" color issues in html2canvas
    const colors = {
        blue900: '#1e3a8a',
        blue800: '#1e40af',
        blue600: '#2563eb',
        blue50: '#eff6ff',
        gray900: '#111827',
        gray500: '#6b7280',
        gray400: '#9ca3af',
        white: '#ffffff',
    };

    return (
        <div
            id="certificate-to-print"
            className="w-[1123px] h-[794px] relative p-12 overflow-hidden shadow-2xl"
            style={{
                fontFamily: "'Inter', sans-serif",
                backgroundImage: 'radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%)',
                backgroundColor: colors.white,
                border: `16px solid ${colors.blue900}`
            }}
        >
            {/* Elegant Border Inset */}
            <div
                className="absolute inset-4 pointer-events-none"
                style={{ border: `2px solid ${colors.blue900}`, opacity: 0.3 }}
            />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 m-8" style={{ borderLeft: `8px solid ${colors.blue600}`, borderTop: `8px solid ${colors.blue600}` }} />
            <div className="absolute top-0 right-0 w-32 h-32 m-8" style={{ borderRight: `8px solid ${colors.blue600}`, borderTop: `8px solid ${colors.blue600}` }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 m-8" style={{ borderLeft: `8px solid ${colors.blue600}`, borderBottom: `8px solid ${colors.blue600}` }} />
            <div className="absolute bottom-0 right-0 w-32 h-32 m-8" style={{ borderRight: `8px solid ${colors.blue600}`, borderBottom: `8px solid ${colors.blue600}` }} />

            {/* Content Container */}
            <div className="h-full flex flex-col items-center justify-between py-12 px-20">
                {/* Logo & Header */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative h-20 w-48">
                        <Image
                            src="/images/icehub.png"
                            alt="IceHub Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className="text-center">
                        <h1
                            className="text-5xl font-black tracking-tighter uppercase"
                            style={{ color: colors.blue900 }}
                        >
                            Certificate of Completion
                        </h1>
                        <p
                            className="font-bold tracking-[0.3em] mt-2 text-sm"
                            style={{ color: colors.blue600 }}
                        >
                            INTERNATIONAL CENTRE FOR EDUCATION & DIGITAL TRANSFORMATION
                        </p>
                    </div>
                </div>

                {/* Main Body */}
                <div className="text-center space-y-6">
                    <p className="font-medium italic text-xl" style={{ color: colors.gray500 }}>
                        This is to certify that
                    </p>
                    <div className="relative inline-block px-12 pb-2">
                        <h2
                            className="text-6xl font-black capitalize leading-tight"
                            style={{ color: colors.gray900 }}
                        >
                            {studentName}
                        </h2>
                        <div className="h-1 w-full mt-2" style={{ backgroundColor: colors.blue900 }} />
                    </div>
                    <p
                        className="font-medium text-lg mt-4 max-w-2xl mx-auto"
                        style={{ color: colors.gray500 }}
                    >
                        Has successfully completed the intensive bootcamp and met all requirements for graduation in
                    </p>
                    <h3
                        className="text-3xl font-bold uppercase tracking-wide"
                        style={{ color: colors.blue800 }}
                    >
                        {programName}
                    </h3>
                    <p
                        className="font-black text-sm uppercase tracking-widest px-4 py-2 inline-block rounded-lg"
                        style={{
                            backgroundColor: colors.blue50,
                            color: colors.blue900,
                            opacity: 0.9
                        }}
                    >
                        {weeks} Weeks Intensive Program
                    </p>
                </div>

                {/* Footer Section */}
                <div className="w-full flex justify-between items-end">
                    {/* Date and ID */}
                    <div className="space-y-4">
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: colors.gray400 }}>Date of Issuance</p>
                            <p className="text-sm font-bold" style={{ color: colors.gray900 }}>{issueDate}</p>
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: colors.gray400 }}>Certificate Number</p>
                            <p className="text-sm font-bold" style={{ color: colors.gray900 }}>{certNumber}</p>
                        </div>
                    </div>

                    {/* Stamp and CEO Signature */}
                    <div className="flex items-center gap-12">
                        {/* Official Stamp */}
                        <div className="relative h-32 w-32 flex items-center justify-center">
                            <div
                                className="absolute inset-0 border-[6px] rounded-full animate-pulse"
                                style={{ borderColor: colors.blue900, opacity: 0.2 }}
                            />
                            <div
                                className="z-10 text-center -rotate-12 border-4 p-2 rounded-xl shadow-xl"
                                style={{
                                    borderColor: 'rgba(37, 99, 235, 0.8)',
                                    backgroundColor: colors.white
                                }}
                            >
                                <p className="text-[10px] font-black leading-none mb-1" style={{ color: colors.blue600 }}>OFFICIAL STAMP</p>
                                <p className="text-xs font-black" style={{ color: colors.blue600 }}>ICEDT HUB</p>
                                <div className="h-[2px] w-full my-1" style={{ backgroundColor: colors.blue600 }} />
                                <p className="text-[8px] font-black" style={{ color: colors.blue600 }}>VERIFIED</p>
                            </div>
                            {/* Seal-like SVG background */}
                            <svg viewBox="0 0 100 100" className="absolute h-40 w-40 opacity-10" style={{ fill: colors.blue900 }}>
                                <path d="M50 0 L61.23 34.55 L97.55 34.55 L68.16 55.9 L79.39 90.45 L50 69.1 L20.61 90.45 L31.84 55.9 L2.45 34.55 L38.77 34.55 Z" />
                            </svg>
                        </div>

                        {/* Signature */}
                        <div className="text-center">
                            <div className="h-16 w-48 border-b-2 relative flex items-center justify-center overflow-hidden" style={{ borderColor: colors.gray900 }}>
                                <span className="text-3xl font-serif italic opacity-50 select-none" style={{ color: colors.gray400 }}>
                                    IceHub Digital Seal
                                </span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-2" style={{ color: colors.gray900 }}>Executive Director</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <p className="text-9xl font-black -rotate-45" style={{ color: colors.gray400 }}>ICEDT HUB</p>
            </div>
        </div>
    );
}
