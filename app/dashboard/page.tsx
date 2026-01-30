import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import Dashboard from '@/components/Dashboard';

export default async function DashboardPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="bg-gray-50/50">
            <Dashboard userName={session.user?.name || undefined} />
        </div>
    );
}
