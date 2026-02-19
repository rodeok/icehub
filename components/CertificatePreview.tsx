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
    // New Color Palette based on image
    const colors = {
        primary: '#1a2b4b',    // Dark Blue
        secondary: '#facc15',  // Yellow/Gold
        accent: '#9ca3af',     // Grey/Silver
        text: '#0f172a',       // Dark Text
        background: '#ffffff', // Pure White
    };

    return (
        <div
            id="certificate-to-print"
            className="w-full max-w-[1123px] aspect-[1.414/1] relative bg-white overflow-hidden shadow-2xl mx-auto flex"
        >
            {/* Left Content Area */}
            <div className="w-[70%] h-full p-12 flex flex-col justify-between relative z-10">

                {/* Header: Logo and Date */}
                <div className="space-y-6">
                    <div className="relative w-32 h-16">
                        <Image
                            src="/images/icehub.png"
                            alt="IceHub Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                        Date of issue: {issueDate}
                    </p>
                </div>

                {/* Title */}
                <div className="mt-8">
                    <h1 className="text-3xl font-serif text-gray-600 tracking-wide uppercase border-b-2 border-transparent inline-block">
                        CERTIFICATION OF ACHIEVEMENT
                    </h1>
                </div>

                {/* Main Body */}
                <div className="flex-grow flex flex-col justify-center space-y-6">
                    <p className="text-lg font-bold text-gray-700">
                        This is to certify that
                    </p>

                    <div className="space-y-1">
                        <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tight">
                            {studentName}
                        </h2>
                        {/* Dotted underline decoration */}
                        <div className="flex space-x-1 mt-2">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <p className="text-xl font-bold text-gray-600">
                            has demonstrated understanding in
                        </p>
                        <h3 className="text-3xl font-black text-gray-800">
                            {programName}
                        </h3>
                    </div>
                </div>

                {/* Footer: Signature */}
                <div className="mt-8">
                    <div className="w-48 relative">
                        {/* Placeholder for Signature Image if needed, or keeping the text signature for now */}
                        <div className="h-16 w-full relative mb-2">
                            {/* <Image src="/path/to/signature.png" fill className="object-contain object-left-bottom" /> */}
                            <div className="font-great-vibes text-4xl text-gray-800 italic">Ksfac</div>
                        </div>
                        <div className="h-0.5 w-full bg-gray-800 mb-2"></div>
                        <p className="text-sm font-bold text-gray-900 uppercase">EMETI ISAAC .C</p>
                        <p className="text-xs font-bold text-gray-600">On Behalf of ICEHUB</p>
                    </div>
                </div>
            </div>

            {/* Right Decorative Area */}
            <div className="w-[30%] h-full relative">
                {/* Geometric Shapes */}
                {/* Large Dark Blue rotated rect */}
                <div
                    className="absolute right-[-15%] top-[10%] w-[120%] h-[80%] bg-[#2e3b55] transform -rotate-45 z-10"
                    style={{ boxShadow: '-10px 10px 20px rgba(0,0,0,0.1)' }}
                ></div>

                {/* Yellow Rect */}
                <div
                    className="absolute right-[-5%] top-[30%] w-[80%] h-[60%] bg-[#fbbf24] transform -rotate-45 z-20"
                ></div>

                {/* Grey/Light Blue Rect */}
                <div
                    className="absolute right-[20%] bottom-[-20%] w-[60%] h-[60%] bg-[#94a3b8] transform -rotate-45 z-0 opacity-50"
                ></div>

                {/* Floating square accent */}
                <div className="absolute top-[20%] right-[80%] w-16 h-16 bg-[#2e3b55] transform rotate-45 z-30"></div>
                <div className="absolute bottom-[30%] left-[-10%] w-12 h-12 bg-[#fbbf24] transform rotate-45 z-30"></div>
            </div>
        </div>
    );
}
