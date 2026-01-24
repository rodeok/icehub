
export default function DigitalWorks() {
    const details = [
        {
            title: "Program Duration",
            content: (
                <>
                    <span className="font-bold text-slate-900">8 weeks</span> of comprehensive training
                    <br />
                    3 sessions per week, 2 hours each
                </>
            )
        },
        {
            title: "Learning Mode",
            content: (
                <>
                    <span className="font-bold text-slate-900">In-person</span> instructor-led classes
                    <br />
                    Hands-on practice with expert guidance
                </>
            )
        },
        {
            title: "Class Size",
            content: (
                <>
                    <span className="font-bold text-slate-900">Small groups</span> for personalized attention
                    <br />
                    Maximum 15 students per class
                </>
            )
        },
        {
            title: "Support",
            content: (
                <>
                    <span className="font-bold text-slate-900">Continuous support</span> from instructors
                    <br />
                    Ask questions anytime during your learning.
                </>
            )
        }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        How It Works
                    </h2>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        A supportive, structured learning experience designed for your success
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {details.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-10 flex flex-col justify-center items-start text-left border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 h-full"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 text-base leading-relaxed">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
