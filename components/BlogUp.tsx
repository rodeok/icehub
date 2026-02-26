'use client';

import { Activity, Calendar, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogUp() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/blogs');
                const data = await response.json();
                const filtered = data.filter((item: any) => item.tag === 'Activities');
                setActivities(filtered.slice(0, 3)); // show top 3
            } catch (err) {
                console.error("Failed to fetch activities:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);
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
                    {loading ? (
                        <div className="col-span-full py-12 flex justify-center items-center gap-2 text-slate-500">
                            <Loader2 className="animate-spin text-blue-500" /> Loading activities...
                        </div>
                    ) : activities.length > 0 ? (
                        activities.map((activity, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                        <Activity size={24} strokeWidth={2.5} />
                                    </div>
                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">
                                        Activity
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                                    {activity.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow overflow-hidden line-clamp-3">
                                    {activity.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-50 mt-auto">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span className="text-[11px] font-bold">{activity.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span className="text-[11px] font-bold">ICE Hub</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            No upcoming activities found. Check back later!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
