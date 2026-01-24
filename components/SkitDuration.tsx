
import { Calendar, Clock, Hourglass, Users } from 'lucide-react';

export default function SkitDuration() {
    return (
        <section className="bg-[#f8faff] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                        Program Schedule & Duration
                    </h2>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

                        {/* Class Times Column */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Class Times</h3>
                                    <p className="text-slate-500 text-sm">Flexible scheduling options</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-blue-50/50 rounded-2xl p-4 flex justify-between items-center group hover:bg-blue-50 transition-colors">
                                    <span className="font-bold text-slate-700">Weekday Classes</span>
                                    <span className="font-bold text-blue-600">4:00 PM - 6:00 PM</span>
                                </div>
                                <div className="bg-purple-50/50 rounded-2xl p-4 flex justify-between items-center group hover:bg-purple-50 transition-colors">
                                    <span className="font-bold text-slate-700">Weekend Classes</span>
                                    <span className="font-bold text-purple-600">10:00 AM - 1:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Duration Column */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-purple-200 shadow-lg">
                                    <Hourglass className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Duration</h3>
                                    <p className="text-slate-500 text-sm">Complete program timeline</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-green-50/50 rounded-2xl p-4 flex justify-between items-center group hover:bg-green-50 transition-colors">
                                    <span className="font-bold text-slate-700">Kids Program</span>
                                    <span className="font-bold text-green-600">6 Weeks</span>
                                </div>
                                <div className="bg-orange-50/50 rounded-2xl p-4 flex justify-between items-center group hover:bg-orange-50 transition-colors">
                                    <span className="font-bold text-slate-700">Teen Program</span>
                                    <span className="font-bold text-orange-500">12 Weeks</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Info Footer */}
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left border border-blue-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">Small Class Sizes</h4>
                                <p className="text-slate-600 text-sm">Maximum 15 students per class for personalized attention</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <span className="block text-3xl font-bold text-blue-600">15</span>
                            <span className="text-slate-500 text-sm font-medium">Students Max</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
