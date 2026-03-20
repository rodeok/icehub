"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Check, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
    {
        name: "Daily Workspace Pass",
        price: "4k daily, 15k 5-days, 30k 10-days",
        features: {
            access: "Same day only",
            seat: false,
            power: true,
            locker: "If Available",
            conference: false,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: false,
            tools: false,
            setup: false,
            chairs: false,
            quiet: false,
            cac: false,
            reserved: false,
            mentor: false,
        }
    },
    {
        name: "Hot Desk (Monthly)",
        price: "40k Monthly, 110k 3Months, 400k Yearly",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: true,
            locker: true,
            conference: false,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: true,
            tools: false,
            setup: false,
            chairs: false,
            quiet: false,
            cac: false,
            reserved: false,
            mentor: false,
        }
    },
    {
        name: "Dedicated Desk (Premium)",
        price: "70k Monthly, 180k 3Months, 650k Yearly",
        features: {
            access: "Tue-Fri",
            seat: true,
            power: true,
            locker: true,
            conference: false,
            discount: true,
            shared: true,
            security: true,
            restroom: true,
            address: true,
            tools: true,
            setup: false,
            chairs: true,
            quiet: true,
            cac: false,
            reserved: true,
            mentor: false,
        }
    },
    {
        name: "Conference/Meeting Room",
        price: "10k/hr, 35k/half day, 60k/full day",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: true,
            locker: true,
            conference: true,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: false,
            tools: true,
            setup: true,
            chairs: true,
            quiet: true,
            cac: false,
            reserved: true,
            mentor: false,
        }
    },
    {
        name: "Training Space Rental",
        price: "30k/half day, 50k/full day, 180k/weekly",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: true,
            locker: true,
            conference: false,
            discount: true,
            shared: true,
            security: true,
            restroom: true,
            address: false,
            tools: true,
            setup: true,
            chairs: true,
            quiet: true,
            cac: false,
            reserved: true,
            mentor: false,
        }
    },
    {
        name: "Business Address & Virtual",
        price: "50k/yearly (Address), 80k (Address+Mail)",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: false,
            locker: true,
            conference: false,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: true,
            tools: false,
            setup: false,
            chairs: false,
            quiet: false,
            cac: true,
            reserved: false,
            mentor: false,
        }
    },
    {
        name: "Mail & Package Collection",
        price: "2k/per item, 15k/Monthly sub",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: "Power only",
            locker: false,
            conference: false,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: false,
            tools: false,
            setup: false,
            chairs: false,
            quiet: false,
            cac: "Mail only",
            reserved: false,
            mentor: false,
        }
    },
    {
        name: "Exam/CBT/Online Test",
        price: "10k/session, 180k/Bulk Exam",
        features: {
            access: "Mon-Sat",
            seat: false,
            power: true,
            locker: false,
            conference: false,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: false,
            tools: true,
            setup: false,
            chairs: true,
            quiet: true,
            cac: false,
            reserved: false,
            mentor: false,
        }
    },
    {
        name: "Events & Community Space",
        price: "40k - 80k/event",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: true,
            locker: false,
            conference: false,
            discount: false,
            shared: true,
            security: true,
            restroom: true,
            address: false,
            tools: true,
            setup: false,
            chairs: true,
            quiet: true,
            cac: false,
            reserved: true,
            mentor: false,
        }
    },
    {
        name: "Startup Incubation Plan",
        price: "100k/Monthly",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: true,
            locker: true,
            conference: true,
            discount: true,
            shared: false,
            security: true,
            restroom: true,
            address: true,
            tools: true,
            setup: true,
            chairs: true,
            quiet: true,
            cac: true,
            reserved: true,
            mentor: true,
        }
    },
    {
        name: "Corporate/NGO Partnership",
        price: "300k/Monthly, 3m+ Annually",
        features: {
            access: "Tue-Fri",
            seat: false,
            power: true,
            locker: true,
            conference: true,
            discount: true,
            shared: false,
            security: true,
            restroom: true,
            address: true,
            tools: true,
            setup: true,
            chairs: true,
            quiet: true,
            cac: true,
            reserved: true,
            mentor: true,
        }
    },
    {
        name: "Bundled All Access Plan",
        price: "120k/Monthly, 1.2m/Yearly",
        features: {
            access: "Tue-Sat",
            seat: true,
            power: true,
            locker: true,
            conference: "4hrs/Month",
            discount: true,
            shared: true,
            security: true,
            restroom: true,
            address: true,
            tools: true,
            setup: true,
            chairs: true,
            quiet: true,
            cac: true,
            reserved: true,
            mentor: true,
        }
    }
];

const featureLabels = [
    { id: "access", label: "Work space Access" },
    { id: "seat", label: "Dedicated Seat" },
    { id: "power", label: "Power & Internet" },
    { id: "locker", label: "Locker/Storage" },
    { id: "conference", label: "Conference Room Access" },
    { id: "discount", label: "Discount / branding" },
    { id: "shared", label: "Shared Work Space" },
    { id: "security", label: "Basic Security" },
    { id: "restroom", label: "Restroom Access" },
    { id: "address", label: "Business address" },
    { id: "tools", label: "Whiteboard/Projector" },
    { id: "setup", label: "Classroom Setup" },
    { id: "chairs", label: "Chairs and Tables" },
    { id: "quiet", label: "Quiet, Supervised Space" },
    { id: "cac", label: "CAC, Mail, Online Presence" },
    { id: "reserved", label: "Reserved Space" },
    { id: "mentor", label: "Mentorship & Demo Day" },
];

const WorkspaceUtilizationTable = () => {
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(true);

    const activePlan = plans[activePlanIndex];

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftShadow(scrollLeft > 10);
            setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToPlan = (index: number) => {
        setActivePlanIndex(index);
        const tabsContainer = document.getElementById('plan-tabs');
        const activeTab = document.getElementById(`tab-${index}`);
        if (tabsContainer && activeTab) {
            const scrollLeft = activeTab.offsetLeft - (tabsContainer.clientWidth / 2) + (activeTab.clientWidth / 2);
            tabsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-slate-50 py-12 md:py-24 px-4 md:px-8 lg:px-20 overflow-hidden font-sans">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Facility Utilization <span className="text-[#0052CC] relative">
                                Plan
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="#0052CC" strokeWidth="4" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            A comprehensive comparison of all our workspace and facility plans to help you find the perfect fit for your productivity needs.
                        </p>
                    </motion.div>
                </div>

                {/* Mobile View: Tabbed Layout */}
                <div className="md:hidden space-y-6">
                    {/* Plan Selector Tabs */}
                    <div className="relative">
                        <div 
                            id="plan-tabs"
                            className="flex overflow-x-auto no-scrollbar gap-2 pb-4 px-2 -mx-2 snap-x snap-mandatory"
                        >
                            {plans.map((plan, idx) => (
                                <button
                                    key={`tab-${idx}`}
                                    id={`tab-${idx}`}
                                    onClick={() => scrollToPlan(idx)}
                                    className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 snap-center ${
                                        activePlanIndex === idx 
                                        ? "bg-[#0052CC] text-white shadow-lg shadow-blue-200 scale-105" 
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                                    }`}
                                >
                                    {plan.name}
                                </button>
                            ))}
                        </div>
                        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
                    </div>

                    {/* Active Plan Detail Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePlan.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                        >
                            <div className="bg-[#0052CC] p-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">{activePlan.name}</h3>
                                <p className="text-blue-100 text-sm italic font-medium opacity-90">{activePlan.price}</p>
                            </div>
                            <div className="p-6 space-y-4">
                                {featureLabels.map((feature) => {
                                    const value = activePlan.features[feature.id as keyof typeof activePlan.features];
                                    return (
                                        <div key={feature.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                            <span className="text-slate-600 text-sm font-medium">{feature.label}</span>
                                            <div className="flex items-center">
                                                {typeof value === 'string' ? (
                                                    <span className="text-[11px] font-bold text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                                        {value}
                                                    </span>
                                                ) : value ? (
                                                    <div className="bg-emerald-50 p-1.5 rounded-full">
                                                        <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                                                    </div>
                                                ) : (
                                                    <div className="bg-rose-50 p-1.5 rounded-full">
                                                        <X className="w-4 h-4 text-rose-500 stroke-[3px]" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center items-center gap-4 text-slate-400 text-sm font-medium">
                        <button 
                            onClick={() => scrollToPlan(Math.max(0, activePlanIndex - 1))}
                            disabled={activePlanIndex === 0}
                            className="p-2 rounded-full border border-slate-200 disabled:opacity-30"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span>{activePlanIndex + 1} / {plans.length}</span>
                        <button 
                            onClick={() => scrollToPlan(Math.min(plans.length - 1, activePlanIndex + 1))}
                            disabled={activePlanIndex === plans.length - 1}
                            className="p-2 rounded-full border border-slate-200 disabled:opacity-30"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Desktop/Tablet View: Full Table */}
                <div className="hidden md:block relative group">
                    <div className="absolute inset-0 bg-blue-600/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="relative bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden">
                        {/* Shadow Overlays for Horizontal Scroll */}
                        <div className={`absolute top-0 bottom-0 left-[200px] w-12 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftShadow ? 'opacity-100' : 'opacity-0'}`} />
                        <div className={`absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black/5 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightShadow ? 'opacity-100' : 'opacity-0'}`} />

                        <div 
                            ref={scrollContainerRef}
                            className="overflow-x-auto scrollbar-custom"
                        >
                            <table className="w-full text-left border-collapse min-w-[1400px]">
                                <thead>
                                    <tr className="bg-white border-b border-slate-200">
                                        <th className="sticky left-0 z-30 bg-white p-6 text-slate-900 font-extrabold text-sm min-w-[200px] border-r border-slate-100 uppercase tracking-widest">
                                            Features <br /><span className="text-[#0052CC] text-[10px]">vs</span> Plans
                                        </th>
                                        {plans.map((plan, idx) => (
                                            <th key={plan.name} className={`p-6 bg-slate-50/30 text-center border-r border-slate-100 min-w-[160px] transition-colors duration-300 ${activePlanIndex === idx ? 'bg-blue-50/50' : ''}`}>
                                                <div className="text-[#0052CC] font-black text-xs uppercase tracking-tighter mb-1 leading-tight">
                                                    {plan.name}
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-medium italic line-clamp-2 min-h-[30px]">
                                                    {plan.price}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {featureLabels.map((feature, idx) => (
                                        <tr 
                                            key={feature.id} 
                                            onMouseEnter={() => {}} // Could add hover highlights here
                                            className="group/row hover:bg-slate-50/80 transition-colors duration-150"
                                        >
                                            <td className="sticky left-0 z-20 p-5 text-sm font-bold text-slate-700 bg-white group-hover/row:bg-slate-50 border-r border-slate-100 shadow-[1px_0_0_rgba(0,0,0,0.05)]">
                                                {feature.label}
                                            </td>
                                            {plans.map((plan, pIdx) => (
                                                <td key={`${plan.name}-${feature.id}`} className={`p-5 text-center border-r border-slate-50 last:border-r-0 transition-colors duration-300 ${activePlanIndex === pIdx ? 'bg-blue-50/20' : ''}`}>
                                                    <div className="flex justify-center items-center">
                                                        {typeof plan.features[feature.id as keyof typeof plan.features] === 'string' ? (
                                                            <span className="text-[11px] font-extrabold text-[#0052CC] leading-tight px-3 py-1 bg-blue-50 rounded-full border border-blue-100 whitespace-nowrap">
                                                                {plan.features[feature.id as keyof typeof plan.features]}
                                                            </span>
                                                        ) : plan.features[feature.id as keyof typeof plan.features] ? (
                                                            <motion.div 
                                                                whileHover={{ scale: 1.2 }}
                                                                className="bg-emerald-100 p-2 rounded-xl"
                                                            >
                                                                <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                                                            </motion.div>
                                                        ) : (
                                                            <div className="bg-rose-50 p-2 rounded-xl opacity-40">
                                                                <X className="w-4 h-4 text-rose-400 stroke-[2px]" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Legend or CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Need a custom plan for your team? <button className="text-[#0052CC] font-bold hover:underline">Contact our sales team</button>
                    </p>
                </div>
            </div>
            
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-custom::-webkit-scrollbar {
                    height: 10px;
                }
                .scrollbar-custom::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 20px;
                    border: 3px solid white;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                    background: #0052CC;
                }
            `}</style>
        </section>
    );
};

export default WorkspaceUtilizationTable;
