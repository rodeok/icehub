import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import TutorSidebar from '@/components/TutorSidebar';

export default async function TutorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'tutor') {
        redirect('/tutor/login');
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <TutorSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
