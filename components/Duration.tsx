"use client";

export default function Duration() {
    return (
        <section className="relative py-24 px-6 flex justify-center overflow-hidden bg-gradient-to-b from-blue-600 to-blue-700 text-white">
            {/* Decorative circles */}
            <div className="absolute -left-32 -top-32 w-[420px] h-[420px] rounded-full bg-white/10" />
            <div className="absolute -right-40 bottom-10 w-[420px] h-[420px] rounded-full bg-white/10" />


            <div className="relative max-w-5xl w-full">
                <h2 className="text-center text-4xl font-bold !text-white">Program Duration</h2>
                <div className="mx-auto mt-4 w-16 h-1 rounded bg-white" />


                <div className="mt-16 rounded-3xl bg-white/10 backdrop-blur-xl p-12">
                    <div className="flex justify-center">
                        <span className="flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-medium !text-white">
                            <span className="w-4 h-4 rounded-full bg-white" />
                            6 Months
                        </span>
                    </div>


                    <h3 className="mt-8 text-center text-3xl font-inter font-bold !text-white">
                        Intensive Training Program
                    </h3>
                    <p className="mt-2 text-center !text-white/80">
                        A comprehensive journey from beginner to job-ready professional
                    </p>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-6">
                        {[
                            ["1", "Onboarding"],
                            ["2", "Fundamentals"],
                            ["3", "Skill Building"],
                            ["4", "Projects"],
                            ["5", "Portfolio"],
                            ["6", "Career Prep"],
                        ].map(([num, label]) => (
                            <div
                                key={num}
                                className="rounded-2xl bg-white/15 p-6 text-center"
                            >
                                <div className="text-3xl font-bold !text-white">{num}</div>
                                <p className="mt-2 text-sm !text-white">{label}</p>
                                <div className="mx-auto mt-4 h-1 w-10 rounded bg-white" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 border-t border-white/20 pt-8 grid grid-cols-3 text-center">
                        <div>
                            <p className="text-3xl font-inter font-bold !text-white">24</p>
                            <p className="text-sm !text-white/80">Weeks of Learning</p>
                        </div>
                        <div>
                            <p className="text-3xl font-inter font-bold !text-white">150+</p>
                            <p className="text-sm !text-white/80">Hours of Training</p>
                        </div>
                        <div>
                            <p className="text-3xl font-inter font-bold !text-white">10+</p>
                            <p className="text-sm !text-white/80">Real Projects</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}