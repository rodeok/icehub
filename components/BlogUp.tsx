
import { Mic, Users, Lightbulb, Calendar, MapPin } from "lucide-react";

const activities = [
    {
        icon: Mic,
        badge: "Upcoming",
        badgeColor: "bg-green-50 text-green-600",
        title: "Tech Talk Series",
        description: "Weekly presentations by industry leaders on emerging technologies.",
        date: "Mar 20, 2024",
        location: "Main Hall",
        iconBg: "bg-blue-50 text-blue-600",
    },
    {
        icon: Users,
        badge: "This Week",
        badgeColor: "bg-blue-50 text-blue-600",
        title: "Networking Mixer",
        description: "Connect with fellow entrepreneurs and build meaningful partnerships.",
        date: "Mar 22, 2024",
        location: "Lounge",
        iconBg: "bg-[#eef7ff] text-blue-600",
    },
    {
        icon: Lightbulb,
        badge: "Monthly",
        badgeColor: "bg-purple-50 text-purple-600",
        title: "Innovation Challenge",
        description: "Monthly hackathon to solve real-world problems with creative solutions.",
        date: "Mar 30, 2024",
        location: "Hub Space",
        iconBg: "bg-blue-50 text-blue-600",
    },
];

export default function BlogUp() {
    return (
        <section className="bg-slate-50/50 py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-primary">
                        Upcoming Activities
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Join our vibrant community events and activities designed to foster innovation and
                        collaboration.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 ${activity.iconBg} rounded-xl flex items-center justify-center`}>
                                    <activity.icon size={24} strokeWidth={2.5} />
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${activity.badgeColor}`}>
                                    {activity.badge}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {activity.title}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">
                                {activity.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Calendar size={14} className="text-slate-400" />
                                    <span className="text-[11px] font-bold">{activity.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <MapPin size={14} className="text-slate-400" />
                                    <span className="text-[11px] font-bold">{activity.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
