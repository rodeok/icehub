
export default function DigitalAchieve() {
    const achievements = [
        {
            title: "Complete Digital Confidence",
            description: "Use computers independently for work, study, and personal tasks without hesitation or fear."
        },
        {
            title: "Certificate of Completion",
            description: "Earn an Ice Hub Digital Literacy certificate to showcase your new skills to employers."
        },
        {
            title: "Ready for Advanced Training",
            description: "Build the foundation needed to pursue specialized tech skills like coding, design, or data."
        },
        {
            title: "Improved Employability",
            description: "Stand out in job applications with essential digital skills every modern workplace requires."
        }
    ];

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 md:px-8 lg:px-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    What You'll Achieve
                </h2>

                {/* Subtitle */}
                <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg mb-16">
                    Transform from computer novice to digitally confident in weeks
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {achievements.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-10 flex flex-col items-start text-left shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-50 h-full"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 text-base leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
