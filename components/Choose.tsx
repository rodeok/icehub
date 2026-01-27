import { GraduationCap, Users, Briefcase, Award } from "lucide-react";

export default function WhyChooseIceHub() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                    Why Choose <span className="text-blue-600">Ice Hub</span>
                </h2>
                <p className="mt-2 text-gray-500">
                    8 compelling reasons why Ice Hub is the right place to kick start your tech journey.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-blue-500">
                            <img src="/images/colab.png" alt="Collaborative Learning" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Collaborative Learning</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Learn with passionate peers in a vibrant tech space that fosters teamwork and creativity.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green-500">
                            <img src="/images/mentor.png" alt="Mentorship" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Mentorship</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            You’ll be paired with experienced mentors who guide you through every stage of your learning.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-red-500">
                            <img src="/images/job.png" alt="Job Opportunity" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Job Opportunity</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            75% of our graduates get employed within 3 months of completing their training. Students leave from learning to getting jobs.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-pink-500">
                            <img src="/images/cert.png" alt="Certification" className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Certification</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            You will earn a recognized certificate at the end of your program that validates your skills and gives you a competitive edge in the job market.
                        </p>
                    </div>
                </div>

                <button className="mt-10 text-sm font-medium text-blue-600 hover:underline">
                    Show 4 More →
                </button>
            </div>
        </section>
    );
}
