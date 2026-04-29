"use client";

import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, CreditCard, Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import { Plan } from "./WorkSpacePlan";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface BookingModalProps {
    plan: Plan;
    onClose: () => void;
    onSuccess: (reference: string, userData: any) => Promise<void>;
}

// Mock availability function
const checkAvailability = async (date: Date, timeSlot: string) => {
    // Simulate API call
    return new Promise<{ available: boolean; availableSlots: number; maxCapacity: number; reason?: string }>((resolve) => {
        setTimeout(() => {
            const isAvailable = Math.random() > 0.1; // 90% chance available
            resolve({
                available: isAvailable,
                availableSlots: isAvailable ? Math.floor(Math.random() * 10) + 1 : 0,
                maxCapacity: 10,
                reason: isAvailable ? undefined : "Fully booked",
            });
        }, 500);
    });
};

export default function BookingModal({ plan, onClose, onSuccess }: BookingModalProps) {
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        startDate: undefined as Date | undefined,
        endDate: undefined as Date | undefined,
    });
    const [loading, setLoading] = useState(false);
    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [availability, setAvailability] = useState<{ available: boolean; availableSlots: number; maxCapacity: number; reason?: string } | null>(null);
    const [currentPrice, setCurrentPrice] = useState(plan.price);

    const availableTimeSlots = plan.title === "Board Room"
        ? [
            { label: "Half day 9:00 AM - 12:00 PM" },
            { label: "Full Day 9:00 AM - 4:00 PM" },
        ]
        : [
            { label: "09:00 AM - 05:00 PM" },
            { label: "09:00 AM - 01:00 PM" },
            { label: "01:00 PM - 05:00 PM" },
        ];

    useEffect(() => {
        // Update price based on activeTab
        if (activeTab === 'daily') {
            setCurrentPrice(plan.price);
        } else if (activeTab === 'weekly' && plan.subPrices && plan.subPrices[0]) {
            setCurrentPrice(plan.subPrices[0]);
        } else if (activeTab === 'monthly' && plan.subPrices && plan.subPrices[1]) {
            setCurrentPrice(plan.subPrices[1]);
        }
    }, [activeTab, plan]);

    useEffect(() => {
        if (selectedDate && selectedTimeSlot) {
            setCheckingAvailability(true);
            checkAvailability(selectedDate, selectedTimeSlot).then((result) => {
                setAvailability(result);
                setCheckingAvailability(false);
            });
        } else {
            setAvailability(null);
        }
    }, [selectedDate, selectedTimeSlot]);

    useEffect(() => {
        if (selectedDate) {
            const startDate = selectedDate;
            let endDate = startDate;
            if (activeTab === 'weekly') {
                endDate = addDays(startDate, 7);
            } else if (activeTab === 'monthly') {
                endDate = addDays(startDate, 30);
            }
            setUserData(prev => ({ ...prev, startDate, endDate }));
        }
    }, [selectedDate, activeTab]);


    const formatBookingDates = (start?: Date, end?: Date, type?: string) => {
        if (!start) return "Select a date to see duration";
        const startStr = format(start, "MMM d, yyyy");
        if (type === 'daily' || !end) return `Date: ${startStr}`;
        const endStr = format(end, "MMM d, yyyy");
        return `Duration: ${startStr} - ${endStr}`;
    };

    // Parse price string to number for Flutterwave
    const getNumericPrice = (priceString: string) => {
        return parseInt(priceString.replace(/[^0-9]/g, ''), 10); // Flutterwave uses standard units
    };

    const config = {
        public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || '',
        tx_ref: (new Date()).getTime().toString(),
        amount: getNumericPrice(currentPrice),
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userData.email,
            phone_number: userData.phone,
            name: userData.name,
        },
        customizations: {
            title: 'ICEHub Workspace Booking',
            description: `Payment for ${plan.title} (${activeTab})`,
            logo: 'https://icehub.ng/logo.png',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY) {
            alert("Flutterwave public key is missing!");
            setLoading(false);
            return;
        }

        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                if (response.status === "successful") {
                    const completeUserData = {
                        ...userData,
                        planTitle: plan.title,
                        selectedPrice: currentPrice,
                        timeSlot: selectedTimeSlot,
                    };
                    onSuccess(response.tx_ref, completeUserData);
                } else {
                    alert("Payment was not successful. Please try again.");
                }
                setLoading(false);
                closePaymentModal();
            },
            onClose: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/60 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4 py-20 text-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-[2rem] bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                    {/* Back Arrow (Top Left) */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-50 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                        title="Go Back"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    {/* Close Button (Top Right) */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-50 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8 md:p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Space</h2>
                            <p className="text-gray-500">
                                You are booking the <span className="text-[#1a73e8] font-semibold">{plan.title}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Booking Type Tabs */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Booking Duration
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['daily', 'weekly', 'monthly'] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setActiveTab(type)}
                                            className={`py-3 px-4 rounded-xl font-medium transition-all capitalize ${activeTab === type
                                                ? 'bg-[#1a73e8] text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Select Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date: Date | null) => date && setSelectedDate(date)}
                                        minDate={addDays(new Date(), 1)}
                                        maxDate={addDays(new Date(), 90)}
                                        dateFormat="MMMM d, yyyy"
                                        className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none"
                                        placeholderText="Select a date"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {formatBookingDates(userData.startDate, userData.endDate, activeTab)}
                                </p>
                            </div>

                            {/* Time Slot Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Select Time Slot
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        value={selectedTimeSlot}
                                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none appearance-none"
                                        required
                                    >
                                        <option value="">Choose a time slot</option>
                                        {availableTimeSlots.map((slot) => (
                                            <option key={slot.label} value={slot.label}>
                                                {slot.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Availability Status */}
                            {checkingAvailability ? (
                                <div className="text-center py-2 text-sm text-gray-500">
                                    Checking availability...
                                </div>
                            ) : availability && (
                                <div className={`p-4 rounded-xl ${availability.available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                    <p className={`text-sm font-medium ${availability.available ? 'text-green-700' : 'text-red-700'}`}>
                                        {availability.available
                                            ? `✓ Available (${availability.availableSlots}/${availability.maxCapacity} slots remaining)`
                                            : `✗ ${availability.reason || 'Not available'}`
                                        }
                                    </p>
                                </div>
                            )}

                            {/* Price Display */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Total Price</span>
                                    <span className="text-2xl font-bold text-[#1a73e8]">{currentPrice}</span>
                                </div>
                            </div>

                            {/* User Details */}
                            <div className="space-y-4 border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900">Your Details</h3>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            value={userData.name}
                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            value={userData.phone}
                                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 transition-all outline-none"
                                            placeholder="080 000 0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={loading || !availability?.available}
                                type="submit"
                                className="w-full bg-[#1a73e8] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <CreditCard size={20} />
                                        <span>Pay {currentPrice}</span>
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Secured by <span className="font-bold text-gray-500">Flutterwave</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
