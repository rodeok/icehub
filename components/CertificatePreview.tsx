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
    const colors = {
        primary: '#1a2b4b',
        secondary: '#facc15',
        accent: '#94a3b8',
        textMain: '#111827',
        textSecondary: '#4b5563',
        background: '#ffffff',
    };

    return (
        <div
            id="certificate-to-print"
            className="w-full max-w-[1123px] aspect-[1.414/1] relative overflow-hidden bg-white shadow-2xl mx-auto flex font-serif"
            style={{
                color: colors.textMain,
                '--background': '#ffffff',
                '--foreground': '#000000',
                '--color-background': '#ffffff',
                '--color-foreground': '#000000',
            } as React.CSSProperties}
        >
            {/* Left Content Area */}
            <div className="w-[65%] h-full p-16 flex flex-col justify-between relative z-10">

                {/* Header Section */}
                <div>
                    <div className="relative w-28 h-28 mb-4">
                        <Image
                            src="/images/icehub.png"
                            alt="IceHub Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    <p className="text-sm font-sans font-medium" style={{ color: colors.textMain }}>
                        Date of issue: {issueDate}
                    </p>
                </div>

                {/* Title Section */}
                <div className="mt-8">
                    <h1 className="text-2xl tracking-[0.25em] uppercase font-medium" style={{ color: colors.textMain }}>
                        CERTIFICATION OF ACHIEVEMENT
                    </h1>
                </div>

                {/* Main Body Section */}
                <div className="flex-grow flex flex-col justify-center -mt-12">
                    <p className="text-xl font-sans font-bold mb-10" style={{ color: colors.textMain }}>
                        This is to certify that
                    </p>

                    <div>
                        {/* Student Name */}
                        <h2
                            className="text-5xl font-bold font-serif leading-tight mb-4"
                            style={{ color: colors.textMain, minHeight: '1.2em' }}
                        >
                            {studentName}
                        </h2>

                        {/* Yellow Decoration */}
                        <div className="flex gap-1.5 mb-8 mt-2">
                            {[...Array(35)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-sm"
                                    style={{ backgroundColor: colors.secondary }}
                                />
                            ))}
                        </div>

                        <div>
                            <p className="text-xl font-sans font-medium mb-4" style={{ color: colors.textMain }}>
                                has demonstrated understanding in
                            </p>
                            <h3 className="text-4xl font-bold font-serif leading-tight" style={{ color: colors.textMain }}>
                                {programName}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="mt-auto">
                    <div className="w-80 relative">
                        {/* Signature Image */}
                        <div className="h-28 w-full relative mb-1">
                            <Image
                                src="/images/signature.png"
                                alt="Signature"
                                fill
                                className="object-contain object-left-bottom"
                                priority
                            />
                        </div>

                        {/* Signature Line */}
                        <div className="h-[2px] w-full mb-3 bg-black"></div>

                        {/* Signatory Info */}
                        <p className="text-lg font-bold uppercase tracking-wider" style={{ color: colors.textMain }}>
                            EMETI ISAAC .C
                        </p>
                        <p className="text-sm font-bold" style={{ color: colors.textMain }}>
                            On Behalf of ICEHUB
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Decorative Area (Background Shapes) */}
            <div className="w-[35%] h-full relative overflow-hidden bg-white">
                {/* Light Grey Pattern (Bottom) */}
                <div
                    className="absolute top-[50%] right-[15%] w-[110%] h-[90%] transform -rotate-[45deg] z-10"
                    style={{ backgroundColor: colors.accent }}
                />

                {/* Dark Blue Pattern (Middle) */}
                <div
                    className="absolute top-[5%] right-[-15%] w-[130%] h-[120%] transform -rotate-[45deg] z-20"
                    style={{ backgroundColor: colors.primary }}
                />

                {/* Yellow Pattern (Top) */}
                <div
                    className="absolute top-[20%] right-[-5%] w-[100%] h-[70%] transform -rotate-[45deg] z-30"
                    style={{ backgroundColor: colors.secondary }}
                />

                {/* Small Accent Diamonds */}
                <div
                    className="absolute top-[65%] left-[0%] w-12 h-12 transform rotate-45 z-40 shadow-md"
                    style={{ backgroundColor: colors.secondary }}
                />

                <div
                    className="absolute top-[15%] right-[25%] w-16 h-16 transform rotate-45 z-40 shadow-md"
                    style={{ backgroundColor: colors.primary }}
                />
            </div>
        </div>
    );
}