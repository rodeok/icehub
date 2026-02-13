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
                eligibleRes.ok ? eligibleRes.json() : Promise.resolve([]),
                issuedRes.ok ? issuedRes.json() : Promise.resolve([]),
                programsRes.ok ? programsRes.json() : Promise.resolve({ programs: [] })
            ]);

            setEligibleStudents(Array.isArray(eligibleData) ? eligibleData : []);
            setIssuedCerts(Array.isArray(issuedData) ? issuedData : []);
            setAllPrograms(programsData.programs || []);
        } catch (err) {
            console.error('Error fetching certificate data:', err);
            setEligibleStudents([]);
            setIssuedCerts([]);
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
        <div className="space-y-6 pb-12">
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
            <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Certificates</h1>
                    <p className="text-gray-400 text-sm font-medium mt-1">Manage and issue digital credentials for your graduates.</p>
                </div>
                <div className="flex items-center gap-3">
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
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
                    >
                        Design Template
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        Bulk Issuance
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Table Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Filter Bar */}
                    <div className="bg-gray-50/50 p-2 rounded-2xl flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email or program..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 ring-blue-50 transition-all"
                            />
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
                                                <tr key={index} className="hover:bg-gray-50/30 transition-colors group">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-black text-xs uppercase">
                                                                {student.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                                <p className="text-[11px] font-medium text-gray-400">{student.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <div className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black">
                                                            100% COMPLETE
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        {student.programId ? (
                                                            <div className="inline-flex flex-col">
                                                                <span className="text-xs font-bold text-gray-700">{student.programName}</span>
                                                                <span className="text-[10px] font-medium text-gray-400">{student.weeks} Weeks Program</span>
                                                            </div>
                                                        ) : (
                                                            <select
                                                                className="text-[11px] font-bold bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 outline-none text-blue-600 focus:bg-white transition-all"
                                                                value={selectedPrograms[student.userId] || ''}
                                                                onChange={(e) => setSelectedPrograms(prev => ({ ...prev, [student.userId]: e.target.value }))}
                                                            >
                                                                <option value="">Choose Program</option>
                                                                {allPrograms.map(p => (
                                                                    <option key={p.id} value={p.id}>{p.title}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <div className="flex items-center justify-center">
                                                            {isIssued ? (
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full">
                                                                    <CheckCircle2 size={12} strokeWidth={3} />
                                                                    <span className="text-[9px] font-black tracking-widest uppercase">Verified</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full">
                                                                    <Clock size={12} strokeWidth={3} />
                                                                    <span className="text-[9px] font-black tracking-widest uppercase">Awaiting</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {isIssued ? (
                                                                <button
                                                                    onClick={() => generatePDF({
                                                                        ...student,
                                                                        certNumber: issuedInfo.certificateNumber,
                                                                        issueDate: new Date(issuedInfo.issueDate).toLocaleDateString()
                                                                    })}
                                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                                    title="Redownload"
                                                                >
                                                                    <Download size={16} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleIssueCertificate(student)}
                                                                    disabled={issuingId === `${student.userId}-${student.programId}`}
                                                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-50 disabled:opacity-50"
                                                                >
                                                                    {issuingId === `${student.userId}-${student.programId}` ? '...' : 'Issue'}
                                                                </button>
                                                            )}
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
                    <div className="bg-[#0c1a33] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group border border-white/5">
                        <div className="relative z-10">
                            <div className="h-14 w-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
                                <Award size={32} strokeWidth={1} />
                            </div>
                            <h2 className="text-2xl font-black mb-4 !text-white tracking-tight">E-Credential System</h2>
                            <p className="text-gray-400 text-[13px] leading-relaxed mb-10 font-medium">
                                Digital certificates are secured with cryptographic signatures and instant verification QR codes.
                            </p>

                            <div className="space-y-3 mb-12">
                                {[
                                    { icon: QrCode, label: 'Instant Verification', desc: 'Secure QR tech', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                                    { icon: Mail, label: 'Automated Delivery', desc: 'Email integration', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
                                        <div className={`h-10 w-10 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black !text-white uppercase tracking-wider">{item.label}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4.5 bg-white text-gray-900 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-50 transition-all scale-100 active:scale-[0.98]">
                                Global Verification Hub
                            </button>
                        </div>
                        {/* Elegant Decorative Elements */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 bg-blue-600/10 rounded-full blur-[100px]" />
                        <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-purple-600/10 rounded-full blur-[100px]" />
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Credential Insights</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-gray-900">{issuedCerts.length}</p>
                                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Total Issued</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-orange-400">
                                    {eligibleStudents.filter(s => !issuedCerts.some(c => c.userId?._id === s.userId && c.programId?._id === s.programId)).length}
                                </p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Awaiting</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                                <span>Issuance Rate</span>
                                <span className="text-gray-900">78%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-50 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-blue-600 w-[78%] rounded-full" />
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
