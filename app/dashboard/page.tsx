import { redirect } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import { getCachedUser } from '@/lib/user';
import '@/models/Program'; // Ensure Program model is registered

export default async function DashboardPage() {
    const user = await getCachedUser();

    if (!user) {
        redirect('/login');
    }

    const firstProgramName = user.enrolledPrograms.length > 0
        ? (user.enrolledPrograms[0] as any).name
        : "No active programs";

    return (
        <div className="bg-gray-50/50">
            <Dashboard
                userName={user.fullName}
                studentId={user.uniqueCode}
                programName={firstProgramName}
                progress={18} // TODO: Implement real progress tracking logic
            />
        </div>
    );
}
