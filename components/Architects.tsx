import Image from "next/image";
const teamMembers = [
    {
        name: "Isaac C. Emeti",
        role: "Founder & CEO",
        description: "Leads ICE Hub's vision, strategy, and growth, driving innovation and community impact across all initiatives.",
        img: "/images/1.png"
    },
    {
        name: "Chiamaka Blessing Emeti",
        role: "COO",
        description: "Oversees daily operations, programs, and partnerships to ensure organizational excellence and long-term sustainability.",
        img: "/images/1.png"
    },
    {
        name: "Okpala Jane Ifeoma",
        role: "Program Manager",
        description: "Designs, coordinates, and manages high impact tech programs that empower learners and strengthen community engagement.",
        img: "/images/1.png"
    },
    {
        name: "Joshua Ikegwuonu",
        role: "Business Development Executive",
        description: "Builds strategic partnerships, drives growth opportunities, and expands ICE Hub's influence within the tech ecosystem.",
        img: "/images/1.png"
    },
    {
        name: "Chimdindu Praise Ezulike",
        role: "Lead Designer/Product Design Instructor",
        description: "Crafts user-centered digital experiences and trains aspiring designers to build innovative, industry-ready products.",
        img: "/images/1.png"
    },
    {
        name: "Onyekachukwu Ejimkeonye",
        role: "Senior Software Engineer/ Mobile App Dev Instructor",
        description: "Oversees daily operations, programs, and partnerships to ensure organizational excellence and long-term sustainability.",
        img: "/images/1.png"
    },
    // {
    //     name: "Elosiuba Favour",
    //     role: "Full stack Software Engineer",
    //     description: "Oversees daily operations, programs, and partnerships to ensure organizational excellence and long-term sustainability.",
    //     img: "/images/1.png"
    // },

];

const TeamSection = () => {
    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold !text-black mb-4">
                        Meet the{" "}
                        <span className="!text-blue-600">Architects</span>
                        {" "}of Your Success
                    </h2>
                    <p className="!text-black">
                        The passionate experts dedicated to guiding you on your tech journey.
                    </p>
                </div>

                {/* Team grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 flex gap-5 shadow-lg border border-gray-100"
                        >
                            {/* Avatar placeholder */}
                            <div className="flex-shrink-0">
                                <Image src={member.img} alt="profile" width={40} height={40} />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold !text-black">
                                    {member.name}
                                </h3>
                                <p className="!text-black text-sm font-medium mb-2">
                                    {member.role}
                                </p>
                                <p className="text-sm !text-black leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
