import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export default async function ProgramsPage() {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect('/login');
    }

    await connectDB();

    // Fetch user with enrolled programs
    const user = await User.findById(session.user.id)
        .select('-password')
        .populate('enrolledPrograms')
        .lean();

    if (!user) {
        redirect('/login');
    }

    const enrolledPrograms = user.enrolledPrograms || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Programs</h1>
                    <p className="text-gray-600 mt-2">
                        View and manage your enrolled programs
                    </p>
                </div>

                {enrolledPrograms.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No programs enrolled
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by enrolling in a program
                        </p>
                        <div className="mt-6">
                            <a
                                href="/courses"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Browse Programs
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrolledPrograms.map((program: any) => (
                            <div
                                key={program._id.toString()}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded capitalize">
                                            {program.category?.replace('-', ' ')}
                                        </span>
                                        <span className="text-xs text-gray-500 capitalize">
                                            {program.skillLevel}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {program.name}
                                    </h3>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {program.description}
                                    </p>

                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {program.duration}
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <a href={`/dashboard/programs/${program._id}`} className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                            Continue Learning
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
