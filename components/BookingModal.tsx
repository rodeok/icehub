"use client";

import React, { useState } from "react";
import { X, User, Mail, Phone, Lock, CreditCard } from "lucide-react";
import { usePaystackPayment } from "react-paystack";

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
}

export default function BookingModal({ plan, onClose, onSuccess }: BookingModalProps) {
    const [userData, setUserData] = useState<UserData>({
        name: "",
        email: "",
        phone: "",
        planTitle: plan.title,
        selectedPrice: plan.price,
    });

    const [loading, setLoading] = useState(false);

    // Extract numeric price for Paystack (handles "N4,000/day" etc)
    const getNumericPrice = (priceStr: string) => {
        const numericPart = priceStr.replace(/[^0-9]/g, "");
        return parseInt(numericPart) * 100; // Paystack expects kobo/cents
    };

    const config = {
        reference: new Date().getTime().toString(),
        email: userData.email,
        amount: getNumericPrice(userData.selectedPrice),
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    };

    const initializePayment = usePaystackPayment(config);

    const handlePaystackSuccessAction = (reference: any) => {
        setLoading(false);
        onSuccess(reference.reference, userData);
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
        setLoading(true);
        initializePayment({
            onSuccess: handlePaystackSuccessAction,
            onClose: handlePaystackCloseAction
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Price Selection if subPrices exist */}
                        {plan.subPrices && plan.subPrices.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Select Billing Plan
                                </label>
                                <div className="grid grid-cols-1 gap-3">
                                    <div
                                        onClick={() => setUserData({ ...userData, selectedPrice: plan.price })}
                                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${userData.selectedPrice === plan.price ? 'border-[#1a73e8] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <span className="text-sm font-medium">{plan.price.split('/')[1] || 'Daily'}</span>
                                        <span className="font-bold text-[#1a73e8]">{plan.price}</span>
                                    </div>
                                    {plan.subPrices.map((sub) => (
                                        <div
                                            key={sub}
                                            onClick={() => setUserData({ ...userData, selectedPrice: sub })}
                                            className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${userData.selectedPrice === sub ? 'border-[#1a73e8] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                            <span className="text-sm font-medium">{sub.split('/')[1]}</span>
                                            <span className="font-bold text-[#1a73e8]">{sub}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-[#1a73e8] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    <span>Pay {userData.selectedPrice}</span>
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
