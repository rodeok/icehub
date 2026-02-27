import React from 'react';

export default function TutorCoursesPage() {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
                    <p className="text-gray-500 mt-1">Manage all your active and upcoming courses.</p>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 p-12 text-center shadow-sm">
                <div className="mx-auto w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Assigned</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    You currently have no active courses assigned to your portfolio. Contact administration if you think this is an error.
                </p>
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all">
                    Explore Available Courses
                </button>
            </div>
        </div>
    );
}
