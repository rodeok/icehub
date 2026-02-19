'use client';

import React from 'react';
import CertificatePreview from '@/components/CertificatePreview';

export default function TestPreviewPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <CertificatePreview
                studentName="OSADEBE IYEKE ASHIOMA"
                programName="Frontend Web Development"
                weeks={12}
                issueDate="Dec, 2025"
                certNumber="ICEHUB-2025-001"
            />
        </div>
    );
}
