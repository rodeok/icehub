import { redirect } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import { getCachedUser } from '@/lib/user';
import Instructor from '@/models/Instructor';
import '@/models/Program'; // Ensure Program model is registered
import connectDB from '@/lib/mongodb';

export default async function DashboardPage() {
    const user = await getCachedUser();

    if (!user) {
        redirect('/login');
    }

    // Protection: Redirect to payment page if no programs are paid for
    // A user is considered "paid" if the program exists in user.paidPrograms
    const hasPaid = user.paidPrograms && user.paidPrograms.length > 0;

    if (user.enrolledPrograms.length > 0 && !hasPaid) {
        redirect('/payment');
    }

    const firstProgram = user.enrolledPrograms.length > 0
        ? (user.enrolledPrograms[0] as any)
        : null;

    const firstProgramName = firstProgram?.name || "No active programs";
    const category = firstProgram?.category;

    let instructorName = "Lead Instructor";

    if (category) {
        try {
            await connectDB();
            const instructor = await Instructor.findOne({
                $or: [
                    { specialty: category },
                    { cohorts: category }
                ],
                isActive: true
            }).sort({ rating: -1 }).lean();

            if (instructor) {
                instructorName = (instructor as any).fullName;
            }
        } catch (error) {
            console.error('Error fetching instructor for dashboard:', error);
        }
    }

    return (
        <div className="bg-gray-50/50">
            <Dashboard
                userName={user.fullName}
                studentId={user.uniqueCode}
                programName={firstProgramName}
                instructorName={instructorName}
                progress={user.progress || 0}
                program={firstProgram}
            />
        </div>
    );
}
