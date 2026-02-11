"use client";

import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, CreditCard, Calendar as CalendarIcon, Clock } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, startOfDay, endOfDay } from "date-fns";
import { calculateEndDate, parsePriceToKobo, formatBookingDates } from "@/utils/bookingUtils";

interface Plan {
    title: string;
    price: string;
    subPrices?: string[];
    features: string[];
}

interface BookingModalProps {
    plan: Plan;
    onClose: () => void;
    onSuccess: (reference: string, userData: UserData) => void;
}

interface UserData {
    name: string;
    email: string;
    phone: string;
    planTitle: string;
    selectedPrice: string;
    bookingType: 'daily' | 'weekly' | 'monthly';
    startDate: Date;
    endDate: Date;
    timeSlot: string;
}

interface TimeSlot {
    start: string;
    end: string;
    label: string;
}

interface AvailabilityData {
    available: boolean;
    availableSlots?: number;
    maxCapacity?: number;
    timeSlots?: TimeSlot[];
    reason?: string;
}

export default function BookingModal({ plan, onClose, onSuccess }: BookingModalProps) {
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
    const [availability, setAvailability] = useState<AvailabilityData | null>(null);
    const [loading, setLoading] = useState(false);
    const [checkingAvailability, setCheckingAvailability] = useState(false);

    const [userData, setUserData] = useState<UserData>({
        name: "",
        email: "",
        phone: "",
        planTitle: plan.title,
        selectedPrice: plan.price,
        bookingType: 'daily',
        startDate: addDays(new Date(), 1),
        endDate: addDays(new Date(), 1),
        timeSlot: "",
    });

    // Fetch availability when date or tab changes
    useEffect(() => {
        checkAvailability();
    }, [selectedDate, activeTab]);

    const checkAvailability = async () => {
        setCheckingAvailability(true);
        try {
            const response = await fetch(
                `/api/bookings/availability?planTitle=${encodeURIComponent(plan.title)}&date=${selectedDate.toISOString()}&bookingType=${activeTab}`
            );

            if (!response.ok) {
                console.error(`Availability check failed: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setAvailability(data);
                if (data.timeSlots) {
                    setAvailableTimeSlots(data.timeSlots);
                    if (data.timeSlots.length > 0 && !selectedTimeSlot) {
                        setSelectedTimeSlot(data.timeSlots[0].label);
                    }
                }
            }
        } catch (error) {
            console.error('Error checking availability:', error);
        } finally {
            setCheckingAvailability(false);
        }
    };

    // Update userData when selections change
    useEffect(() => {
        const endDate = calculateEndDate(selectedDate, activeTab);
        setUserData(prev => ({
            ...prev,
            bookingType: activeTab,
            startDate: selectedDate,
            endDate: endDate,
            timeSlot: selectedTimeSlot,
        }));
    }, [activeTab, selectedDate, selectedTimeSlot]);

    // Get the appropriate price based on booking type
    const getCurrentPrice = () => {
        if (activeTab === 'daily') {
            return plan.price;
        }

        if (plan.subPrices) {
            if (activeTab === 'weekly') {
                return plan.subPrices.find(p => p.includes('week')) || plan.price;
            }
            if (activeTab === 'monthly') {
                return plan.subPrices.find(p => p.includes('month')) || plan.price;
            }
        }

        return plan.price;
    };

    const currentPrice = getCurrentPrice();

    const config = {
        reference: new Date().getTime().toString(),
        email: userData.email,
        amount: parsePriceToKobo(currentPrice),
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    };

    const initializePayment = usePaystackPayment(config);

    const handlePaystackSuccessAction = async (reference: any) => {
        // Create booking in database
        try {
            const bookingData = {
                fullName: userData.name,
                email: userData.email,
                phone: userData.phone,
                planTitle: plan.title,
                selectedPrice: currentPrice,
                bookingType: activeTab,
                startDate: userData.startDate.toISOString(),
                endDate: userData.endDate.toISOString(),
                timeSlot: selectedTimeSlot,
                paymentReference: reference.reference,
                amount: parsePriceToKobo(currentPrice) / 100, // Convert back to naira
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Booking creation failed: ${response.status} ${text}`);
            }

            const result = await response.json();

            if (result.success) {
                setLoading(false);
                onSuccess(reference.reference, {
                    ...userData,
                    selectedPrice: currentPrice,
                });
            } else {
                alert('Booking creation failed: ' + result.error);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please contact support.');
            setLoading(false);
        }
    };

    const handlePaystackCloseAction = () => {
        setLoading(false);
        console.log("Payment closed");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userData.name || !userData.email || !userData.phone) {
            alert("Please fill in all fields");
            return;
        }

        if (!selectedTimeSlot) {
            alert("Please select a time slot");
            return;
        }

        if (availability && !availability.available) {
            alert(availability.reason || "Selected date is not available");
            return;
        }

        setLoading(true);
        initializePayment({
            onSuccess: handlePaystackSuccessAction,
            onClose: handlePaystackCloseAction
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300 my-8">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
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
                            Secured by <span className="font-bold text-gray-500">Paystack</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
