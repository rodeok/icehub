import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

export default async function CertificatesPage() {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect('/login');
    }

    await connectDB();

    // Fetch user certificates
    const certificates = await Certificate.find({ userId: session.user.id })
        .populate('programId')
        .sort({ issueDate: -1 })
        .lean();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
                    <p className="text-gray-600 mt-2">
                        View and download your earned certificates
                    </p>
                </div>

                {certificates.length === 0 ? (
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
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No certificates yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Complete a program to earn your first certificate
                        </p>
                        <div className="mt-6">
                            <a
                                href="/dashboard/programs"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                View My Programs
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((certificate: any) => (
                            <div
                                key={certificate._id.toString()}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded ${certificate.status === 'issued'
                                                    ? 'text-green-600 bg-green-100'
                                                    : 'text-red-600 bg-red-100'
                                                }`}
                                        >
                                            {certificate.status === 'issued' ? 'Active' : 'Revoked'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {certificate.programId?.name || 'Program'}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
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
                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                />
                                            </svg>
                                            <span className="font-mono">
                                                {certificate.certificateNumber}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600">
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
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>
                                                Issued:{' '}
                                                {new Date(certificate.issueDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* QR Code Preview */}
                                    {certificate.qrCodeData && (
                                        <div className="mb-4 flex justify-center">
                                            <img
                                                src={certificate.qrCodeData}
                                                alt="Certificate QR Code"
                                                className="w-32 h-32"
                                            />
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray-200 space-y-2">
                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                            Download Certificate
                                        </button>
                                        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                                            View Details
                                        </button>
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
