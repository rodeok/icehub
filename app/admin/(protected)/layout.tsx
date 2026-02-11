import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNav from '@/components/AdminNav';

export default async function ProtectedAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');

    if (!adminSession) {
        redirect('/admin/login');
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AdminNav />
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
