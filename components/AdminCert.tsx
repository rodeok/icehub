'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Award,
    ExternalLink,
    CheckCircle2,
    Clock,
    Lock,
    QrCode,
    Mail,
    ChevronRight,
    Loader2,
    Download
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CertificatePreview from './CertificatePreview';

export default function AdminCert() {
    const [eligibleStudents, setEligibleStudents] = useState<any[]>([]);
    const [issuedCerts, setIssuedCerts] = useState<any[]>([]);
    const [allPrograms, setAllPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [issuingId, setIssuingId] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewData, setPreviewData] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [selectedPrograms, setSelectedPrograms] = useState<Record<string, string>>({});

    const certRef = useRef<HTMLDivElement>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [eligibleRes, issuedRes, programsRes] = await Promise.all([
                fetch('/api/admin/certificates/eligible'),
                fetch('/api/admin/certificates'),
                fetch('/api/admin/programs')
            ]);

            const [eligibleData, issuedData, programsData] = await Promise.all([
                eligibleRes.json(),
                issuedRes.json(),
                programsRes.json()
            ]);

            setEligibleStudents(eligibleData);
            setIssuedCerts(issuedData);
            setAllPrograms(programsData.programs || []);
        } catch (err) {
            console.error('Error fetching certificate data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const generatePDF = async (data: any) => {
        // We need to wait for the hidden template to render
        setPreviewData(data);
        // Small delay to ensure state update and render
        setTimeout(async () => {
            const element = document.getElementById('certificate-to-print');
            if (!element) return;

            try {
                const canvas = await html2canvas(element, {
                    scale: 2, // High resolution
                    useCORS: true,
                    logging: false,
                });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`certificate_${data.name.replace(/\s+/g, '_')}.pdf`);
            } catch (err) {
                console.error('PDF Generation failed:', err);
            }
        }, 500);
    };

    const handleIssueCertificate = async (student: any) => {
        let programId = student.programId;
        let programName = student.programName;
        let weeks = student.weeks;

        if (!programId) {
            const tempProgramId = selectedPrograms[student.userId];
            if (!tempProgramId) {
                alert('Please select a program for this student first.');
                return;
            }
            const selectedProg = allPrograms.find(p => p.id === tempProgramId);
            if (!selectedProg) {
                alert('Selected program not found.');
                return;
            }
            programId = tempProgramId;
            programName = selectedProg.title;
            weeks = parseInt(selectedProg.weeks) || 4; // Default weeks if not specified in program
        }

        if (!window.confirm(`Issue certificate to ${student.name} for ${programName}?`)) return;

        setIssuingId(`${student.userId}-${programId}`);
        try {
            const res = await fetch('/api/admin/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: student.userId,
                    programId: programId,
                    completionDate: new Date()
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to issue certificate');
            }

            const newCert = await res.json();

            // Generate and download PDF
            await generatePDF({
                name: student.name,
                programName: programName,
                weeks: weeks,
                certNumber: newCert.certificateNumber,
                issueDate: new Date().toLocaleDateString()
            });

            fetchData(); // Refresh lists
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIssuingId(null);
        }
    };

    const filteredStudents = eligibleStudents.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.programName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Hidden Certificate Template for PDF Generation */}
            <div className="fixed -left-[2000px] top-0 shadow-2xl">
                {previewData && (
                    <CertificatePreview
                        studentName={previewData.name}
                        programName={previewData.programName}
                        weeks={previewData.weeks}
                        issueDate={previewData.issueDate || new Date().toLocaleDateString()}
                        certNumber={previewData.certNumber || 'PREVIEW-0000'}
                    />
                )}
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Issue, track and verify digital credentials for program graduates.</p>
                </div>
                <button
                    onClick={() => {
                        setPreviewData({
                            name: "Sample Graduate",
                            programName: "Fullstack Engineering",
                            weeks: 12,
                            certNumber: "ICEHUB-2026-SAMPLE",
                            issueDate: new Date().toLocaleDateString()
                        });
                        setIsPreviewOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                    <Award size={18} strokeWidth={2.5} />
                    Design Template
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Table Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Filter Bar */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search students or programs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
                                Bulk Issue
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                    <p className="text-sm font-bold text-gray-400">Loading academic records...</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-gray-50">
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Progress</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Program/Weeks</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredStudents.map((student, index) => {
                                            const activeProgramId = student.programId || selectedPrograms[student.userId];
                                            const isIssued = issuedCerts.some(c => c.userId?._id === student.userId && c.programId?._id === activeProgramId);
                                            const issuedInfo = issuedCerts.find(c => c.userId?._id === student.userId && c.programId?._id === activeProgramId);

                                            return (
                                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-6 font-medium">
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 mt-0.5">{student.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 text-center">
                                                        <span className="text-xs font-black text-green-500">100%</span>
                                                    </td>
                                                    <td className="px-6 py-6 text-center">
                                                        {student.programId ? (
                                                            <div>
                                                                <p className="text-xs font-black text-blue-600">{student.programName}</p>
                                                                <p className="text-[10px] text-gray-400">{student.weeks} Weeks</p>
                                                            </div>
                                                        ) : (
                                                            <select
                                                                className="text-[10px] font-bold bg-gray-50 border-none rounded-lg p-1 outline-none text-blue-600"
                                                                value={selectedPrograms[student.userId] || ''}
                                                                onChange={(e) => setSelectedPrograms(prev => ({ ...prev, [student.userId]: e.target.value }))}
                                                            >
                                                                <option value="">Select Program</option>
                                                                {allPrograms.map(p => (
                                                                    <option key={p.id} value={p.id}>{p.title}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-6 text-center">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {isIssued ? (
                                                                <>
                                                                    <Award size={12} className="text-blue-500" />
                                                                    <span className="text-[9px] font-black tracking-widest text-blue-500 uppercase">ISSUED</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Clock size={12} className="text-orange-400" />
                                                                    <span className="text-[9px] font-black tracking-widest text-orange-400 uppercase">ELIGIBLE</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            {isIssued ? (
                                                                <button
                                                                    onClick={() => generatePDF({
                                                                        ...student,
                                                                        certNumber: issuedInfo.certificateNumber,
                                                                        issueDate: new Date(issuedInfo.issueDate).toLocaleDateString()
                                                                    })}
                                                                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                                    title="Redownload PDF"
                                                                >
                                                                    <Download size={16} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleIssueCertificate(student)}
                                                                    disabled={issuingId === `${student.userId}-${student.programId}`}
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
                                                                >
                                                                    {issuingId === `${student.userId}-${student.programId}` ? 'Issuing...' : 'Issue Now'}
                                                                </button>
                                                            )}
                                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                                <MoreVertical size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredStudents.length === 0 && !loading && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-bold">
                                                    No eligible students found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Badge System Card */}
                    <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                                <Award size={28} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-xl font-bold mb-3 !text-white">Digital Badge System</h2>
                            <p className="!text-white text-sm leading-relaxed mb-8">
                                Your certificates are blockchain-verifiable. Graduates can share them directly to LinkedIn.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="h-10 w-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center">
                                        <QrCode size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold !text-white">Verifiable QR</p>
                                        <p className="text-[10px] !text-white">Scan to verify</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="h-10 w-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold !text-white">Auto-Email</p>
                                        <p className="text-[10px] !text-white">On graduation</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-blue-600 rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/40 hover:bg-blue-700 transition-all">
                                Upgrade System
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Total Issued</span>
                                <span className="text-lg font-black text-gray-900">{issuedCerts.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Eligible Now</span>
                                <span className="text-lg font-black text-orange-400">{eligibleStudents.filter(s => !issuedCerts.some(c => c.userId?._id === s.userId && c.programId?._id === s.programId)).length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[32px] p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Certificate Template Design</h2>
                                <p className="text-gray-500 text-sm">This is how students will see their credentials.</p>
                            </div>
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ChevronRight className="rotate-90" />
                            </button>
                        </div>

                        <div className="scale-[0.8] origin-top transform-gpu">
                            <CertificatePreview
                                studentName={previewData.name}
                                programName={previewData.programName}
                                weeks={previewData.weeks}
                                issueDate={previewData.issueDate}
                                certNumber={previewData.certNumber}
                            />
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
