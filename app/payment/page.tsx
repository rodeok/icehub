"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CreditCard,
    CheckCircle2,
    ShieldCheck,
    ChevronRight,
    Loader2,
    AlertCircle,
    Info,
    ArrowRight
} from "lucide-react";
import Image from "next/image";

export default function StandalonePaymentPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [program, setProgram] = useState<any>(null);
    const [processing, setProcessing] = useState(false);
    const [paymentOption, setPaymentOption] = useState<"full" | "initial">("initial");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (status === "authenticated") {
            fetchInitialData();
        }
    }, [status]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/payments/user");
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.details || data.error || "Failed to fetch payment info");
            }

            if (data.enrolledPrograms && data.enrolledPrograms.length > 0) {
                setProgram(data.enrolledPrograms[0]);

                // If they've already paid, send them to dashboard
                if (data.stats.totalPaid > 0) {
                    router.push("/dashboard");
                }
            } else {
                // No enrollment? Send to get-started or programs
                router.push("/courses");
            }
        } catch (err: any) {
            console.error("Error fetching payment info:", err);
            // Setting a local error state if you want to show it in UI
            // For now just alert or log
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!program) return;

        try {
            setProcessing(true);
            const percentage = paymentOption === "full" ? 100 : 60;
            const totalPayable = Math.round(program.price + 10000);
            const amount = Math.round((totalPayable * percentage) / 100);

            const res = await fetch("/api/payments/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    programId: program._id,
                    customAmount: amount,
                    paymentType: paymentOption,
                }),
            });

            const data = await res.json();
            if (res.ok && data.authorizationUrl) {
                window.location.href = data.authorizationUrl;
            } else {
                throw new Error(data.error || "Failed to initialize payment");
            }
        } catch (err: any) {
            alert(err.message || "An error occurred. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500 font-medium">Securing your session...</p>
            </div>
        );
    }

    const totalPayable = program ? Math.round(program.price + 10000) : 0; // Price + 10k Reg Fee
    const initialAmount = Math.round(totalPayable * 0.6);
    const fullAmount = totalPayable;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
            {/* Left Side - Info & Branding */}
            <div className="lg:w-1/2 bg-[#0F172A] p-8 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <Image src="/images/icehub.png" alt="ICE HUB" width={40} height={40} className="" />
                        <span className="text-2xl font-black tracking-tight !text-white">ICE HUB</span>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            Step 2: Securing Your Spot
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] !text-white">
                            Welcome to the <span className="text-blue-500">Future</span> of Tech.
                        </h1>
                        <p className="!text-white text-lg leading-relaxed">
                            You're just one step away from joining {program?.name}. Complete your enrollment to gain full access to our curriculum, community, and expert mentorship.
                        </p>
                    </div>

                    {/* Feature list items */}
                    {[
                        "Full access to learning modules",
                        "Direct mentorship from industry lead",
                        "Community & Networking events",
                        "Certification upon completion"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 !text-white">
                            <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                <CheckCircle2 size={14} />
                            </div>
                            <span className="font-medium !text-white">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center !text-white">
                        <ShieldCheck size={20} />
                    </div>
                    <p className="text-xs !text-white font-medium">
                        Secure SSL Encryption. Your payment details are never stored on our servers.
                    </p>
                </div>
            </div>

            {/* Right Side - Payment Form */}
            <div className="lg:w-1/2 p-4 lg:p-16 flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-gray-100 p-8 lg:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Choose your plan</h2>
                        <p className="text-gray-500 text-sm mt-1 font-medium">Select a payment option to continue</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {/* Option 1: Initial */}
                        <label
                            className={`block relative p-6 rounded-3xl border-2 transition-all cursor-pointer group ${paymentOption === "initial"
                                ? "border-blue-600 bg-blue-50/30"
                                : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                className="hidden"
                                checked={paymentOption === "initial"}
                                onChange={() => setPaymentOption("initial")}
                            />
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1 block">Flexible</span>
                                    <h3 className="text-lg font-bold text-gray-900">Installment Plan</h3>
                                    <p className="text-gray-500 text-xs font-medium mt-1">Pay 60% now, balance later</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-gray-900 leading-none">N{initialAmount.toLocaleString()}</span>
                                </div>
                            </div>
                            {paymentOption === "initial" && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 shadow-lg">
                                    <CheckCircle2 size={16} />
                                </div>
                            )}
                        </label>

                        {/* Option 2: Full */}
                        <label
                            className={`block relative p-6 rounded-3xl border-2 transition-all cursor-pointer group ${paymentOption === "full"
                                ? "border-blue-600 bg-blue-50/30"
                                : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                className="hidden"
                                checked={paymentOption === "full"}
                                onChange={() => setPaymentOption("full")}
                            />
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-black text-green-600 uppercase tracking-widest mb-1 block">Recommended</span>
                                    <h3 className="text-lg font-bold text-gray-900">Full Tuition</h3>
                                    <p className="text-gray-500 text-xs font-medium mt-1">Single upfront payment</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-gray-900 leading-none">N{fullAmount.toLocaleString()}</span>
                                </div>
                            </div>
                            {paymentOption === "full" && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 shadow-lg">
                                    <CheckCircle2 size={16} />
                                </div>
                            )}
                        </label>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 mb-8 border border-gray-100">
                        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] leading-relaxed text-gray-600 font-medium">
                            Tuition includes a mandatory N10,000 registration fee. Upon successful payment, you'll be automatically redirected to your student dashboard to start your training.
                        </p>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                    >
                        {processing ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {paymentOption === "full" ? "Complete Enrollment" : "Pay Initial Deposit"}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-6 grayscale opacity-50">
                        <Image src="/images/paystack.png" alt="Paystack" width={100} height={30} className="object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
}
