"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ChevronLeft,
    ShieldCheck,
    CreditCard,
    CheckCircle2,
    Info,
    Loader2
} from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { jsPDF } from "jspdf";

interface Program {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    duration: string;
    category?: string;
}

export default function EnrollmentView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();

    const category = searchParams.get("category");

    const [program, setProgram] = useState<Program | null>(null);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [paymentPlan, setPaymentPlan] = useState<"full" | "installment">("full");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isSuccess, setIsSuccess] = useState(false);
    const [lastRef, setLastRef] = useState("");
    const [formData, setFormData] = useState({
        fullName: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        learningMode: "In-person (Nnewi hub)"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/programs");
                const data = await res.json();
                const activePrograms = data.programs || [];
                setPrograms(activePrograms);

                if (category) {
                    const selected = activePrograms.find((p: Program) => p.category === category) || activePrograms[0];
                    setProgram(selected);
                } else if (activePrograms.length > 0) {
                    setProgram(activePrograms[0]);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const amountToPay = program ? (paymentPlan === "full" ? program.price : 60000) : 0;

    const config = {
        reference: (new Date()).getTime().toString(),
        email: formData.email,
        amount: amountToPay * 100, // Paystack amount is in kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    };

    const generateReceipt = (ref: string, courseName: string, amount: number) => {
        console.log("Generating receipt for ref:", ref);
        try {
            const doc = new jsPDF();

            // Background branding
            doc.setFillColor(29, 99, 237); // blue-600
            doc.rect(0, 0, 210, 40, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            doc.text("ICEHub Enrollment Receipt", 20, 25);

            doc.setTextColor(50, 50, 50);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Date: ${new Date().toLocaleString()}`, 140, 55);
            doc.text(`Reference: ${ref}`, 20, 55);

            // Horizontal line
            doc.setDrawColor(230, 230, 230);
            doc.line(20, 60, 190, 60);

            // Content
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Student Details:", 20, 75);

            doc.setFont("helvetica", "normal");
            doc.text(`Name: ${formData.fullName}`, 20, 85);
            doc.text(`Email: ${formData.email}`, 20, 95);
            doc.text(`Phone: ${formData.phone}`, 20, 105);

            doc.setFont("helvetica", "bold");
            doc.text("Course Details:", 20, 125);

            doc.setFont("helvetica", "normal");
            doc.text(`Course: ${courseName}`, 20, 135);
            doc.text(`Duration: ${program?.duration}`, 20, 145);
            doc.text(`Learning Mode: ${formData.learningMode}`, 20, 155);

            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text(`Total Amount Paid: N${amount.toLocaleString()}`, 20, 180);

            // Footer
            doc.setDrawColor(240, 240, 240);
            doc.line(20, 220, 190, 220);

            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text("Thank you for choosing ICEHub. We look forward to seeing you in class!", 20, 240);
            doc.text("For support, visit: icetuts.com or contact@icetuts.com", 20, 250);

            console.log("Saving PDF...");
            doc.save(`ICEHub_Receipt_${ref.slice(-6)}.pdf`);
            console.log("PDF saved successfully");
        } catch (error) {
            console.error("PDF generation failed:", error);
        }
    };

    const handleSuccess = (reference: any) => {
        console.log("Payment successful, starting verification...", reference);
        // Call backend to verify and record enrollment
        fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reference: reference.reference,
                programId: program?._id,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                learningMode: formData.learningMode
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    console.log("Verification successful, generating receipt...");
                    setLastRef(reference.reference);
                    setIsSuccess(true);

                    // Trigger download immediately
                    if (program) {
                        generateReceipt(reference.reference, program.name, amountToPay);
                    }
                } else {
                    alert(data.error || "Payment verification failed");
                }
            })
            .catch(err => {
                console.error("Verification error:", err);
                alert("An error occurred during verification");
            });
    };

    const handleClose = () => {
        console.log("Paystack payment closed");
    };

    const initializePayment = usePaystackPayment(config);

    const handleEnrollment = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.phone) {
            alert("Please fill in all personal information fields");
            return;
        }

        if (!config.publicKey) {
            alert("Paystack public key is not configured.");
            return;
        }

        console.log("Initializing Paystack payment...");
        // @ts-ignore
        initializePayment(handleSuccess, handleClose);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black bg-opacity-10">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                    Enrollment Successful!
                </h1>
                <p className="text-gray-600 max-w-md mb-10 leading-relaxed">
                    Welcome to <strong>{program?.name}</strong>. Your payment has been verified and your spot is secured.
                    A receipt has been generated for your records.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <button
                        onClick={() => {
                            if (program) generateReceipt(lastRef, program.name, amountToPay);
                        }}
                        className="flex-1 flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-2xl font-bold hover:bg-blue-50 transition"
                    >
                        Re-download Receipt
                    </button>
                    <button
                        onClick={() => router.push("/dashboard?enrolled=success")}
                        className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!program && !loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black px-6">
                <h1 className="text-2xl font-bold mb-4">Course not found</h1>
                <p className="text-gray-500 mb-8 text-center">We couldn't find the course you're looking for. Please go back and select a course.</p>
                <button
                    onClick={() => router.push("/courses")}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-black">
            {/* Header */}
            <header className="w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 z-10">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </button>
                <div className="flex items-center text-green-600 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Secure Checkout
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Form */}
                <form onSubmit={handleEnrollment} className="lg:col-span-2 space-y-8 text-black">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollment Details</h1>
                        <p className="text-gray-500">Please complete the form below to secure your spot.</p>
                    </div>

                    {/* Section 1: Personal Information */}
                    <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                            <h2 className="text-lg font-bold text-gray-900">Select Your Course</h2>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Choose Program</label>
                            <div className="relative">
                                <select
                                    value={program?._id || ""}
                                    onChange={(e) => {
                                        const selected = programs.find(p => p._id === e.target.value);
                                        if (selected) setProgram(selected);
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white appearance-none cursor-pointer"
                                >
                                    {programs.map((p) => (
                                        <option key={p._id} value={p._id}>
                                            {p.name} - ₦{p.price.toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Personal Information */}
                    <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                            <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="example@mail.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+234"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Learning Mode</label>
                                <div className="relative">
                                    <select
                                        value={formData.learningMode}
                                        onChange={(e) => setFormData({ ...formData, learningMode: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white appearance-none cursor-pointer"
                                    >
                                        <option>In-person (Nnewi hub)</option>
                                        <option>Online</option>
                                        <option>Hybrid</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Choose Payment Plan */}
                    <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                            <h2 className="text-lg font-bold text-gray-900">Choose Payment Plan</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setPaymentPlan("full")}
                                className={`p-6 rounded-2xl border-2 text-left relative transition-all ${paymentPlan === "full" ? "border-blue-500 bg-blue-50/10" : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                            >
                                {paymentPlan === "full" && (
                                    <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-blue-500 fill-white" />
                                )}
                                <h3 className="font-bold text-gray-900 mb-4">Full Payment</h3>
                                <div className="text-2xl font-bold text-blue-600 mb-4">₦{program?.price?.toLocaleString()}</div>
                                <p className="text-xs text-gray-500 leading-relaxed">Pay once and get a 5% discount on course materials.</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentPlan("installment")}
                                className={`p-6 rounded-2xl border-2 text-left relative transition-all ${paymentPlan === "installment" ? "border-blue-500 bg-blue-50/10" : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                            >
                                {paymentPlan === "installment" && (
                                    <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-blue-500 fill-white" />
                                )}
                                <h3 className="font-bold text-gray-900 mb-4">Installments</h3>
                                <div className="text-xl font-bold text-blue-600 mb-1">₦60,000 <span className="text-xs font-normal text-gray-500 italic">deposit</span></div>
                                <p className="text-xs text-gray-500 leading-relaxed mt-4">Pay a deposit today and spread the rest over 2 months.</p>
                            </button>
                        </div>
                    </section>

                    {/* Section 3: Payment Method */}
                    <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                            <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: "card", label: "Paystack (Card, Transfer, USSD)", sub: "Visa, Mastercard, Verve, Bank", icon: CreditCard },
                            ].map((method) => (
                                <button
                                    type="button"
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`w-full flex items-center p-4 rounded-xl border transition-all ${paymentMethod === method.id ? "border-blue-500 bg-blue-50/10" : "border-gray-100 bg-white hover:border-gray-200"
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg mr-4 ${paymentMethod === method.id ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-gray-400"}`}>
                                        <method.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-bold text-gray-900 text-sm">{method.label}</div>
                                        <div className="text-[12px] text-gray-500 leading-tight">{method.sub}</div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? "border-blue-500" : "border-gray-200"
                                        }`}>
                                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                </form>

                {/* Right Column - Summary */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:sticky lg:top-24">
                        <div className="relative h-48 w-full group">
                            <Image
                                src={program?.imageUrl || "/images/product0.png"}
                                alt={program?.name || "Course"}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                                <h2 className="!text-white font-bold text-lg leading-tight">{program?.name}</h2>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Course Duration</span>
                                    <span className="font-bold text-gray-700">{program?.duration}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Start Date</span>
                                    <span className="font-bold text-gray-700">Next Cohort</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 space-y-3">
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-gray-400 font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-700">₦{program?.price?.toLocaleString()}</span>
                                </div>
                                {paymentPlan === "installment" && (
                                    <div className="flex justify-between text-[13px]">
                                        <span className="text-blue-500 font-medium italic">Installment Plan</span>
                                        <span className="font-bold text-blue-500">Deposit</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-900">Amount to Pay</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-blue-600">₦{amountToPay.toLocaleString()}</div>
                                        <div className="text-[10px] text-gray-400 font-bold tracking-tight uppercase">secure payment via paystack</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleEnrollment}
                                className="w-full bg-[#1D63ED] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                            >
                                Complete Enrollment
                            </button>

                            <div className="flex items-center justify-center text-[11px] text-gray-400 font-medium">
                                <Info className="w-3 h-3 mr-1" />
                                Your payment information is encrypted and secure.
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Shadow/Bottom Border */}
            <footer className="h-2 w-full bg-blue-500/10 border-t border-blue-400 mt-auto"></footer>
        </div>
    );
}
