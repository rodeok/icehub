import Link from "next/link";
import Image from "next/image";

export default function BackHero() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight !text-black sm:text-5xl md:text-6xl" style={{ color: '#000' }}>
                            Mastering Cybersecurity: Systems Protection & Threat Mitigation
                        </h1>

                        <p className="mt-8 text-lg leading-8 !text-black max-w-xl" style={{ color: '#000' }}>
                            Unlock your cybersecurity potential and build a strong professional portfolio with our hands-on program. Learn industry-standard security tools, master core defense principles,
                            and receive personalized mentorship to launch your career as a cybersecurity professional.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <span className="inline-flex items-center rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600">
                                In-Person Class
                            </span>
                            <span className="inline-flex items-center rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600">
                                Hands-on Learning
                            </span>
                            <span className="inline-flex items-center rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600">
                                Real-World Projects
                            </span>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/apply"
                                className="inline-block bg-[#1a73e8] px-10 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/frontend1.png" // Placeholder path, user may need to provide actual image
                                alt="Developers working"
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-[#f8f9fa] py-20 px-6 lg:px-8 mt-12">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight !text-black sm:text-4xl mb-12" style={{ color: '#000' }}>
                        Course Overview
                    </h2>

                    <div className="space-y-8 text-lg leading-8 !text-black" style={{ color: '#000' }}>
                        <p>
                            Our Cybersecurity course is structured to transform aspiring professionals into industry-ready security specialists. We emphasize practical hands-on training, critical thinking, and collaborative problem-solving.
                            <br />
                            This program dives deep into the core principles of cybersecurity, covering everything from foundational security concepts to advanced threat detection, defense strategies, and risk assessment. You will learn how to think like an attacker and a defender, identify vulnerabilities, implement secure solutions, and deliver robust security outcomes that protect both organizational assets and business objectives.
                            <br />
                            Our curriculum is constantly updated to reflect the latest trends and technologies in the design industry, ensuring you gain relevant and in-demand skills.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}