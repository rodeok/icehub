'use client';

import React from 'react';
import CertificatePreview from '@/components/CertificatePreview';

export default function TestPreviewPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <CertificatePreview
                studentName="Elosiuba Favour Osinachi"
                programName="Frontend Web Development"
                issueDate="Dec, 2025"
                weeks={12}
                certNumber="ICE-FE-001"
            />
        </div>
    );
}
