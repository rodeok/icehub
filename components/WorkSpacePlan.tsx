
import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        title: "Open Workspace",
        price: "N4,000/day",
        subPrices: ["N16,000/week", "N50,000/month"],
        features: [
            "Desk",
            "Chair",
            "2 visitor chair",
            "Power Supply",
            "Meeting room access",
            "Unlimited Internet (Starlink)",
        ],
    },
    {
        title: "Executive Office",
        price: "N20,000/day",
        subPrices: ["N80,000/week", "N200,000/month", "N2,400,000/year"],
        features: [
            "Office Desk",
            "Locker",
            "1 swivel chair",
            "2 visitor chair",
            "Power Supply",
            "Meeting room access",
            "Unlimited Internet (Starlink)",
        ],
        popular: true,
    },
    {
        title: "Virtual Office",
        price: "N15,000/month",
        subPrices: ["N45,000/quarterly", "N150,000/year"],
        features: [
            "Prestigious Business Address",
            "Telephone Answering",
            "Mail Handling Services",
            "Meeting Room Access",
            "4 days of Office space a month",
        ],
    },
    {
        title: "Board Room",
        price: "N50,000/day",
        features: [
            "20-Seat Capacity",
            "Public Address System",
            "Presentation Screen",
            "Presenter",
            "Flipchart/Whiteboard",
            "Power Supply",
            "Unlimited Internet (Starlink)",
        ],
    },
    {
        title: "Conference Hall.",
        price: "N80,000/day",
        features: [
            "100-Seat Capacity",
            "Public Address System",
            "Presentation Screen",
            "Presenter",
            "Flipchart/Whiteboard",
            "Power Supply",
            "Unlimited Internet (Starlink)",
        ],
    },
];

export default function WorkSpacePlan() {
    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Choose your Perfect Workspace
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Flexible plans designed to meet your professional needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.title}
                            className={`relative flex flex-col bg-white rounded-3xl p-8 shadow-lg border h-full transition-all duration-300 hover:shadow-xl ${plan.popular ? "border-[#1a73e8] scale-105 z-10" : "border-slate-100"
                                } ${index > 2 ? 'md:col-span-1 lg:max-w-md lg:mx-auto lg:w-full' : ''}`}
                            style={index === 3 ? { gridColumnStart: '1' } : {}}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a73e8] text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                                <div className="text-3xl font-extrabold text-slate-900 mb-4">
                                    {plan.price}
                                </div>
                                {plan.subPrices && (
                                    <div className="space-y-1">
                                        {plan.subPrices.map((sub) => (
                                            <div key={sub} className="text-sm text-slate-500 font-medium">
                                                {sub}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-600 text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full bg-[#1a73e8] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mt-auto">
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
