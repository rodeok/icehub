import Image from "next/image";

const CorePhilosophy = () => {
    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left side - Title and Image */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold !text-blue-600 mb-2">
                            Our Core Philosophy
                        </h2>
                        <p className="!text-black mb-8">
                            The Principle that drive us forward every single day.
                        </p>


                        {/* Core Philosophy Image with custom shape design */}
                        <div className="relative w-full max-w-sm aspect-square">
                            <Image
                                src="/images/phil.jpg"
                                alt="Our Core Philosophy"
                                fill
                                className="object-cover rounded-tl-[2rem] rounded-tr-[5rem] rounded-bl-[5rem] rounded-br-[2rem]"
                            />
                        </div>
                    </div>

                    {/* Right side - Mission, Vision, Values */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold !text-black mb-3">Mission</h3>
                            <p className="!text-black leading-relaxed">
                                To equip young people and entrepreneurs with globally competitive digital skills and thriving
                                ecosystem that foster innovation, talent development, collaboration, sustainable economic
                                growth across Africa through technology-driven education, startup incubation, and
                                community engagement.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold !text-black mb-3">Vision</h3>
                            <p className="!text-black leading-relaxed">
                                To build a thriving ecosystem where innovation, creativity, and entrepreneurship drive
                                Africa's digital transformation, empowering individuals and businesses to lead, create, and
                                compete globally
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold !text-black mb-3">Values</h3>
                            <p className="!text-black leading-relaxed">
                                <span className="font-semibold !text-black">Community:</span> Foster collaboration.{" "}
                                <span className="font-semibold !text-black">Innovation:</span> Embrace change.
                                <br />
                                <span className="font-semibold !text-black">Integrity:</span> Uphold honesty.{" "}
                                <span className="font-semibold !text-black">Excellence:</span> Pursue mastery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CorePhilosophy;
