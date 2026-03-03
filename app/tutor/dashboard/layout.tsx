import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import TutorLayoutClient from '@/components/TutorLayoutClient';

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
        <TutorLayoutClient>
            {children}
        </TutorLayoutClient>
    );
}
