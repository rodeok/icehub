'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import {
    Award,
    Download,
    Loader2,
    FileText,
    Calendar,
    CheckCircle2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CertificatePreview from '@/components/CertificatePreview';

interface Certificate {
    _id: string;
    certificateNumber: string;
    issueDate: string;
    programId: {
        name: string;
        weeks: number;
    };
    completionDate: string;
}

export default function CertificatesPage() {
    const { data: session } = useSession();
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const certificateRef = useRef<HTMLDivElement>(null);

    // Temporary state for the PDF generation
    const [tempCertData, setTempCertData] = useState<{
        studentName: string;
        programName: string;
        weeks: number;
        issueDate: string;
        certNumber: string;
    } | null>(null);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await fetch('/api/certificates');
            if (response.ok) {
                const data = await response.json();
                setCertificates(data.certificates);
            }
        } catch (error) {
            console.error('Failed to fetch certificates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (cert: Certificate) => {
        if (!session?.user?.name) return;

        setDownloadingId(cert._id);

        // formatted date
        const date = new Date(cert.completionDate || cert.issueDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Set data for the hidden preview component
        setTempCertData({
            studentName: session.user.name,
            programName: cert.programId.name,
            weeks: cert.programId.weeks,
            issueDate: formattedDate,
            certNumber: cert.certificateNumber
        });

        // Wait for state update and render
        setTimeout(async () => {
            if (certificateRef.current) {
                try {
                    const canvas = await html2canvas(certificateRef.current, {
                        scale: 2, // Higher quality
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    });

                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: 'landscape',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });

                    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                    pdf.save(`${cert.certificateNumber}_Certificate.pdf`);
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    alert('Failed to generate certificate PDF. Please try again.');
                } finally {
                    setDownloadingId(null);
                    setTempCertData(null);
                }
            }
        }, 500);
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">View and download your earned certificates and awards.</p>
            </div>

            {certificates.length === 0 ? (
                <div className="bg-white rounded-[32px] border border-gray-100 p-12 text-center">
                    <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Certificates Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Complete your enrolled programs to earn certificates. Keep learning and tracking your progress!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div key={cert._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                            {/* Card Header / Preview */}
                            <div className="h-40 bg-gradient-to-br from-blue-900 to-blue-800 p-6 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Award size={100} />
                                </div>
                                <div className="flex justify-between items-start z-10">
                                    <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                                        <Award size={20} />
                                    </div>
                                    <span className="px-3 py-1 bg-green-400/20 text-green-300 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-400/30 flex items-center gap-1">
                                        <CheckCircle2 size={10} /> Verified
                                    </span>
                                </div>
                                <h3 className="text-white font-bold text-lg leading-tight z-10 line-clamp-2">
                                    {cert.programId.name}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <Calendar size={16} className="text-blue-600" />
                                        <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <FileText size={16} className="text-blue-600" />
                                        <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                            {cert.certificateNumber}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDownload(cert)}
                                    disabled={downloadingId === cert._id}
                                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {downloadingId === cert._id ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Generating PDF...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            Download Certificate
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Hidden Certificate Preview for PDF Generation */}
            {tempCertData && (
                <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                    <div ref={certificateRef}>
                        <CertificatePreview
                            studentName={tempCertData.studentName}
                            programName={tempCertData.programName}
                            weeks={tempCertData.weeks}
                            issueDate={tempCertData.issueDate}
                            certNumber={tempCertData.certNumber}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
