import Link from "next/link";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";

export default function CourseScheduleProduct() {
    return (
        <section className="bg-white py-20 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-3xl font-bold tracking-tight text-black text-center sm:text-4xl mb-16">
                    Course Schedule & Location
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    {/* Weekly Schedule Card */}
                    <div className="bg-[#f8f9fa] rounded-3xl p-10 shadow-sm">
                        <h3 className="text-2xl font-bold text-black text-center mb-10">
                            Weekly Schedule
                        </h3>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
                                <div>
                                    <p className="text-sm text-black font-medium uppercase tracking-wide">Time</p>
                                </div>
                                <div>
                                    <p className="text-sm text-black font-medium uppercase tracking-wide">Topic</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
                                <div>
                                    <p className="font-bold text-black">Mon & Wed:</p>
                                    <p className="font-bold text-black">10 AM - 2 PM</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-black font-medium">Design Thinking & User Research</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
                                <div>
                                    <p className="font-bold text-black">Tue & Sat</p>
                                    <p className="font-bold text-black">10 AM - 2 PM</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-black font-medium">Wireframing & Prototyping with Figma</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
                                <div>
                                    <p className="font-bold text-black">Flexible</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-black font-medium">Project Work & Mentorship sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Hub Location Card */}
                    <div className="bg-[#f8f9fa] rounded-3xl p-10 shadow-sm flex flex-col">
                        <h3 className="text-2xl font-bold text-black text-center mb-6">
                            Our Hub Location
                        </h3>

                        <p className="text-center text-black mb-10 max-w-md mx-auto leading-relaxed">
                            No 270, Old Onitsha Road, Bethel Building, Opposite Anglican Girls
                            Secondary School Junction, Uruagu (Nnewi), Anambra State,
                            Nigeria.
                        </p>

                        <div className="flex-grow flex items-end justify-center pb-4 relative h-40">
                            {/* Abstract Map Representation */}
                            <div className="relative w-full max-w-xs mx-auto h-32">
                                {/* Colorful House Icon */}
                                <svg
                                    className="absolute bottom-0 left-4"
                                    width="96"
                                    height="96"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* House Base (Blue) */}
                                    <rect x="20" y="45" width="60" height="45" fill="#4A90E2" />

                                    {/* Roof (Red) */}
                                    <path d="M10 45 L50 15 L90 45 Z" fill="#E74C3C" />

                                    {/* Door (Yellow/Orange) */}
                                    <rect x="42" y="65" width="16" height="25" fill="#F39C12" rx="2" />

                                    {/* Windows (White) */}
                                    <rect x="28" y="52" width="12" height="12" fill="white" rx="1" />
                                    <rect x="60" y="52" width="12" height="12" fill="white" rx="1" />
                                </svg>
                                <FaMapMarkerAlt className="text-[#ff5a5f] text-3xl absolute bottom-14 left-8 animate-bounce" />

                                <FaMapMarkerAlt className="text-[#ff5a5f] text-2xl absolute top-0 right-1/4 opacity-60" />
                                <FaMapMarkerAlt className="text-[#ff5a5f] text-2xl absolute bottom-8 right-8 opacity-60" />
                                <FaMapMarkerAlt className="text-[#ff5a5f] text-2xl absolute bottom-12 right-1/3 opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-[#f8f9fa] rounded-3xl p-16">
                    <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-lg text-black max-w-2xl mx-auto mb-10">
                        Take the first step towards a rewarding career in front-end web development. Our admission team is ready to guide you
                        through the application process and answer any questions you may have.
                    </p>
                    <Link
                        href="/apply"
                        className="inline-block rounded-full bg-[#1a73e8] px-10 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
