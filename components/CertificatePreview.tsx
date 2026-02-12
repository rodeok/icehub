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
    return (
        <div
            id="certificate-to-print"
            className="w-[1123px] h-[794px] bg-white relative p-12 overflow-hidden shadow-2xl border-[16px] border-blue-900"
            style={{
                fontFamily: "'Inter', sans-serif",
                backgroundImage: 'radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%)'
            }}
        >
            {/* Elegant Border Inset */}
            <div className="absolute inset-4 border-[2px] border-blue-900/30 pointer-events-none" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-[8px] border-t-[8px] border-blue-600 m-8" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-[8px] border-t-[8px] border-blue-600 m-8" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-[8px] border-b-[8px] border-blue-600 m-8" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-[8px] border-b-[8px] border-blue-600 m-8" />

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
                        <h1 className="text-5xl font-black text-blue-900 tracking-tighter uppercase">
                            Certificate of Completion
                        </h1>
                        <p className="text-blue-600 font-bold tracking-[0.3em] mt-2 text-sm">
                            INTERNATIONAL CENTRE FOR EDUCATION & DIGITAL TRANSFORMATION
                        </p>
                    </div>
                </div>

                {/* Main Body */}
                <div className="text-center space-y-6">
                    <p className="text-gray-500 font-medium italic text-xl">This is to certify that</p>
                    <div className="relative inline-block px-12 pb-2">
                        <h2 className="text-6xl font-black text-gray-900 capitalize leading-tight">
                            {studentName}
                        </h2>
                        <div className="h-1 bg-blue-900 w-full mt-2" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg mt-4 max-w-2xl mx-auto">
                        Has successfully completed the intensive bootcamp and met all requirements for graduation in
                    </p>
                    <h3 className="text-3xl font-bold text-blue-800 uppercase tracking-wide">
                        {programName}
                    </h3>
                    <p className="text-blue-900/60 font-black text-sm uppercase tracking-widest bg-blue-50 px-4 py-2 inline-block rounded-lg">
                        {weeks} Weeks Intensive Program
                    </p>
                </div>

                {/* Footer Section */}
                <div className="w-full flex justify-between items-end">
                    {/* Date and ID */}
                    <div className="space-y-4">
                        <div className="text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date of Issuance</p>
                            <p className="text-sm font-bold text-gray-900">{issueDate}</p>
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Certificate Number</p>
                            <p className="text-sm font-bold text-gray-900">{certNumber}</p>
                        </div>
                    </div>

                    {/* Stamp and CEO Signature */}
                    <div className="flex items-center gap-12">
                        {/* Official Stamp */}
                        <div className="relative h-32 w-32 flex items-center justify-center">
                            <div className="absolute inset-0 border-[6px] border-blue-900/20 rounded-full animate-pulse opacity-50" />
                            <div className="z-10 text-center -rotate-12 border-4 border-blue-600/80 p-2 rounded-xl bg-white shadow-xl">
                                <p className="text-[10px] font-black text-blue-600 leading-none mb-1">OFFICIAL STAMP</p>
                                <p className="text-xs font-black text-blue-600">ICEDT HUB</p>
                                <div className="h-[2px] bg-blue-600 w-full my-1" />
                                <p className="text-[8px] font-black text-blue-600">VERIFIED</p>
                            </div>
                            {/* Seal-like SVG background */}
                            <svg viewBox="0 0 100 100" className="absolute h-40 w-40 opacity-10 fill-blue-900">
                                <path d="M50 0 L61.23 34.55 L97.55 34.55 L68.16 55.9 L79.39 90.45 L50 69.1 L20.61 90.45 L31.84 55.9 L2.45 34.55 L38.77 34.55 Z" />
                            </svg>
                        </div>

                        {/* Signature */}
                        <div className="text-center">
                            <div className="h-16 w-48 border-b-2 border-gray-900 relative flex items-center justify-center overflow-hidden">
                                <span className="text-3xl font-serif italic text-gray-400 opacity-50 select-none">
                                    IceHub Digital Seal
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mt-2">Executive Director</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <p className="text-9xl font-black -rotate-45 text-gray-400">ICEDT HUB</p>
            </div>
        </div>
    );
}
