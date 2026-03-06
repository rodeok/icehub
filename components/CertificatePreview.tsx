'use client';

import React from 'react';
import Image from 'next/image';

interface CertificateProps {
    studentName: string;
    programName: string;
    issueDate: string;
    weeks: number;
    certNumber: string;
}

export default function CertificatePreview({
    studentName,
    programName,
    issueDate,
    weeks,
    certNumber,
}: CertificateProps) {
    const colors = {
        primary: '#1e293b',    // Deep Navy
        secondary: '#fbbf24',  // Gold/Yellow
        accent: '#94a3b8',     // Slate Grey
        textMain: '#000000',
    };

    return (
        <div
            id="certificate-to-print"
            className="w-full max-w-[1123px] aspect-[1.414/1] relative overflow-hidden bg-white shadow-2xl mx-auto flex"
        >
            {/* 1. TEXT CONTENT AREA (Left 65%) */}
            <div className="w-[65%] h-full p-16 pr-8 flex flex-col relative z-20 bg-white">

                {/* Logo & Date */}
                <div className="mb-10">
                    <div className="relative w-24 h-24 mb-4">
                        <Image
                            src="/images/icehub.png"
                            alt="IceHub Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <p className="text-sm font-sans text-gray-700">
                        Date of issue: <span className="font-medium">{issueDate}</span>
                    </p>
                </div>

                {/* Title */}
                <div className="mb-12">
                    <h1 className="text-2xl tracking-[0.25em] font-serif uppercase text-gray-800">
                        Certification of Achievement
                    </h1>
                </div>

                {/* Main Body */}
                <div className="flex-grow flex flex-col justify-center">
                    <p className="text-xl font-serif mb-8 italic">
                        This is to certify that
                    </p>

                    <div className="mb-10">
                        <h2 className="text-5xl font-serif font-bold text-black mb-4">
                            {studentName}
                        </h2>
                        {/* The Yellow Dotted Divider */}
                        <div className="flex gap-1.5 w-full max-w-md">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: colors.secondary }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xl font-serif">
                            has demonstrated understanding in
                        </p>
                        <h3 className="text-4xl font-serif font-bold text-gray-900">
                            {programName}
                        </h3>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="mt-auto">
                    <div className="w-72">
                        <div className="h-20 w-full relative mb-1">
                            <Image
                                src="/images/signature.png"
                                alt="Signature"
                                fill
                                className="object-contain object-left-bottom"
                            />
                        </div>
                        <div className="h-[2px] w-full bg-black mb-3"></div>
                        <p className="text-lg font-bold uppercase tracking-wider font-serif">
                            EMETI ISAAC .C
                        </p>
                        <p className="text-sm font-bold text-gray-600 italic">
                            On Behalf of ICEHUB
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. DECORATIVE AREA (Right 35%) */}
            {/* The overflow-hidden here ensures the "boxes" stay contained */}
            <div className="w-[35%] h-full relative overflow-hidden bg-white border-l border-gray-100">

                {/* Large Slate/Grey Shape (Bottom Layer) */}
                <div
                    className="absolute top-[40%] right-[-10%] w-[120%] h-[80%] rotate-[-45deg] z-0"
                    style={{ backgroundColor: colors.accent }}
                />

                {/* Main Navy Box (Middle Layer) */}
                <div
                    className="absolute top-[-10%] right-[-20%] w-[130%] h-[110%] rotate-[-45deg] z-10"
                    style={{ backgroundColor: colors.primary }}
                />

                {/* Yellow Accent Box (Top Layer) */}
                <div
                    className="absolute top-[20%] right-[-5%] w-[90%] h-[60%] rotate-[-45deg] z-20 shadow-xl"
                    style={{ backgroundColor: colors.secondary }}
                />

                {/* Floating Yellow Diamond (Matches image position) */}
                <div
                    className="absolute top-[65%] left-[5%] w-10 h-10 rotate-45 z-30 shadow-md"
                    style={{ backgroundColor: colors.secondary }}
                />
            </div>
        </div>
    );
}