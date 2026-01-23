const milestones = [
    {
        title: "First Cohort Success",
        description: "We celebrate our first graduating class, with an impressive 85% of students landing jobs in tech industry withing three months.",
        position: "left"
    },
    {
        title: "The Spark",
        description: "We celebrate our first graduating class, with an impressive 85% of students landing jobs in tech industry withing three months.",
        position: "right"
    },
    {
        title: "Future Forward",
        description: "Continuously innovation with new course in AI, Blockchain, and more, we are dedicated to shaping to shaping tomorrow's tech leaders.",
        position: "left"
    },
    {
        title: "Global Expansion",
        description: "Continuously innovation with new course in AI, Blockchain, and more, we are dedicated to shaping to shaping tomorrow's tech leaders.",
        position: "right"
    }
];

const JourneySection = () => {
    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold !text-black mb-4">
                        The Ice{" "}
                        <span className="!text-blue-600">Hub Journey</span>
                    </h2>
                    <p className="!text-black max-w-xl mx-auto">
                        From a simple idea to a thriving community, our journey has been one of growth and impact.
                    </p>
                </div>

                {/* Timeline grid */}
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 ${milestone.position === 'left' ? 'md:text-right md:flex-row-reverse' : ''
                                }`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-3 h-3 rounded-full !bg-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold !text-black mb-2">
                                    {milestone.title}
                                </h3>
                                <p className="text-sm !text-black leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySection;
