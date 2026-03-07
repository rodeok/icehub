'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    CheckCircle2,
    Clock,
    Info,
    CreditCard,
    Receipt,
    Download,
    Loader2,
    AlertCircle
} from 'lucide-react';

interface Payment {
    _id: string;
    reference: string;
    amount: number;
    status: 'pending' | 'success' | 'failed';
    programId: {
        name: string;
    };
    createdAt: string;
    paymentMethod: string;
}

interface PaymentData {
    payments: Payment[];
    enrolledPrograms: any[];
    unpaidPrograms: any[];
    registrationFee?: number;
    stats: {
        totalFees: number;
        totalPaid: number;
        outstandingBalance: number;
    };
}

type PaymentOption = 'full' | 'initial' | 'balance';

interface PaymentAmountOption {
    id: PaymentOption;
    label: string;
    percentage: number;
    description: string;
}

export default function PaymentPage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption>('initial');
    const [isVerifying, setIsVerifying] = useState(false);
    const verificationAttempted = React.useRef(false);


    const paymentOptions: PaymentAmountOption[] = [
        {
            id: 'full',
            label: 'Full Payment',
            percentage: 100,
            description: 'Pay the complete amount at once'
        },
        {
            id: 'initial',
            label: 'Initial Payment (60%)',
            percentage: 60,
            description: 'Pay 60% now, 40% later'
        },
        {
            id: 'balance',
            label: 'Remaining Balance (40%)',
            percentage: 40,
            description: 'Pay the outstanding 40%'
        }
    ];

    const fetchPaymentData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/payments/user');

            if (!res.ok) {
                throw new Error('Failed to fetch payment data');
            }

            const data = await res.json();
            setPaymentData(data);

            // Auto-select the logical next payment step
            const initialDeposit = Math.round((data.stats.totalFees * 60) / 100);
            const hasPaidInitial = data.stats.totalPaid >= (initialDeposit - 100);
            setSelectedPaymentOption(hasPaidInitial ? 'balance' : 'initial');

            setError(null);
        } catch (err: any) {
            console.error('Error fetching payment data:', err);
            setError(err.message || 'Failed to load payment information');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user) {
            fetchPaymentData();
        }
    }, [session]);

    // Handle payment verification callback
    useEffect(() => {
        const verify = searchParams.get('verify');
        const reference = searchParams.get('reference');

        if (verify === 'true' && reference && !verificationAttempted.current) {
            verifyPayment(reference);
        }
    }, [searchParams]);

    const verifyPayment = async (reference: string) => {
        if (verificationAttempted.current) return;
        verificationAttempted.current = true;

        try {
            setIsVerifying(true);
            const res = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reference,
                    programId: paymentData?.unpaidPrograms[0]?._id,
                }),
            });

            if (res.ok) {
                // Refresh payment data
                await fetchPaymentData();
                router.replace('/dashboard/payment');
                alert('Payment successful! Your account has been updated.');
            } else {
                const data = await res.json();
                throw new Error(data.error || 'Verification failed');
            }
        } catch (err: any) {
            console.error('Verification error:', err);
            setError(err.message || 'Failed to verify payment');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleMakePayment = async () => {
        const selectedOption = paymentOptions.find(opt => opt.id === selectedPaymentOption);

        if (!selectedOption || !paymentData) return;

        // Calculate payment amount based on selected option
        const paymentAmount = Math.round((paymentData.stats.totalFees * selectedOption.percentage) / 100);

        // Check if balance payment is available
        if (selectedPaymentOption === 'balance') {
            const initialPaymentAmount = Math.round((paymentData.stats.totalFees * 60) / 100);

            if (paymentData.stats.totalPaid < initialPaymentAmount) {
                alert('You need to make the initial payment (60%) first before paying the balance.');
                return;
            }
        }

        try {
            setProcessingPayment(true);

            // Payment with program ID from context if available
            const res = await fetch('/api/payments/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    programId: paymentData?.unpaidPrograms[0]?._id || null,
                    customAmount: paymentAmount,
                    paymentType: selectedPaymentOption,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to initialize payment');
            }

            // Redirect to Paystack payment page
            window.location.href = data.authorizationUrl;
        } catch (err: any) {
            console.error('Payment initialization error:', err);
            alert(err.message || 'Failed to initialize payment. Please try again.');
        } finally {
            setProcessingPayment(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm font-bold text-gray-400">Loading payment information...</p>
            </div>
        );
    }

    if (error || !paymentData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <AlertCircle className="h-12 w-12 text-red-400" />
                <p className="text-sm font-bold text-gray-600">
                    {error || 'Failed to load payment data'}
                </p>
                <button
                    onClick={fetchPaymentData}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    const { stats, payments, registrationFee } = paymentData;
    const totalProgramFees = stats.totalFees - (registrationFee || 0);

    return (
        <div className="space-y-8 pb-12 relative">
            {/* Verification Overlay */}
            {isVerifying && (
                <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100 flex flex-col items-center gap-4 max-w-sm text-center">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">Verifying Payment</h3>
                        <p className="text-gray-500 text-sm">Please wait while we confirm your transaction with the bank...</p>
                    </div>
                </div>
            )}
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">View your tuition status and transaction history</p>
            </div>

            {/* Top Section Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Tuition Breakdown Card */}
                <div className="lg:col-span-8 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 lg:p-10 space-y-10">
                    <h2 className="text-xl font-bold text-gray-900">Tuition Breakdown</h2>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center transition-all hover:translate-x-1">
                            <span className="text-sm font-medium text-gray-400">Total Program Fee</span>
                            <span className="text-xl font-black text-gray-900 tracking-tight">
                                {formatCurrency(totalProgramFees)}
                            </span>
                        </div>

                        {registrationFee && (
                            <div className="flex justify-between items-center transition-all hover:translate-x-1">
                                <span className="text-sm font-medium text-gray-400">Registration Fee</span>
                                <span className="text-xl font-black text-gray-900 tracking-tight">
                                    {formatCurrency(registrationFee)}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between items-center border-t border-gray-100 pt-6 transition-all hover:translate-x-1">
                            <span className="text-sm font-bold text-gray-900">Total Payable</span>
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                                {formatCurrency(stats.totalFees)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center transition-all hover:translate-x-1">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle2 size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-bold text-green-500">Amount Paid</span>
                            </div>
                            <span className="text-xl font-black text-green-500 tracking-tight">
                                {formatCurrency(stats.totalPaid)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center transition-all hover:translate-x-1 text-blue-600">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <Clock size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-bold">Outstanding Balance</span>
                            </div>
                            <span className="text-xl font-black tracking-tight">
                                {formatCurrency(stats.outstandingBalance)}
                            </span>
                        </div>
                    </div>

                    {/* Payment Amount Selector */}
                    {stats.outstandingBalance > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-gray-900">Select Payment Amount</h3>
                            <div className="space-y-3">
                                {paymentOptions
                                    .filter(option => {
                                        const initialDeposit = Math.round((stats.totalFees * 60) / 100);
                                        const hasPaidInitial = stats.totalPaid >= (initialDeposit - 100); // 100 buffer for rounding

                                        if (hasPaidInitial) {
                                            return option.id === 'balance';
                                        } else {
                                            return option.id === 'initial';
                                        }
                                    })
                                    .map((option) => {
                                        const amount = Math.round((stats.totalFees * option.percentage) / 100);

                                        return (
                                            <label
                                                key={option.id}
                                                className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedPaymentOption === option.id
                                                    ? 'border-blue-600 bg-blue-50/50'
                                                    : 'border-gray-100 bg-white hover:border-blue-200'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentOption"
                                                    value={option.id}
                                                    checked={selectedPaymentOption === option.id}
                                                    onChange={() => setSelectedPaymentOption(option.id)}
                                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-bold text-gray-900">{option.label}</span>
                                                        <span className="text-lg font-black text-gray-900">{formatCurrency(amount)}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1 font-medium">{option.description}</p>
                                                </div>
                                            </label>
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {/* Next Payment Alert */}
                    {stats.outstandingBalance > 0 && (
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                            <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                                <Info size={16} strokeWidth={3} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-blue-600">Payment Required</p>
                                <p className="text-xs text-blue-500 font-medium leading-relaxed">
                                    Complete your payment to ensure uninterrupted access to course materials.
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleMakePayment}
                        disabled={processingPayment || stats.outstandingBalance < 1}
                        className={`w-full py-5 rounded-[20px] text-base font-bold shadow-lg transition-all flex items-center justify-center gap-3 disabled:cursor-not-allowed ${stats.outstandingBalance < 1
                            ? 'bg-green-100 text-green-600 shadow-none border border-green-200'
                            : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                            }`}
                    >
                        {processingPayment ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {stats.outstandingBalance < 1 ? (
                                    <>
                                        <CheckCircle2 size={20} strokeWidth={2.5} />
                                        Tuition Fully Paid
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={20} strokeWidth={2.5} />
                                        Make Payment
                                    </>
                                )}
                            </>
                        )}
                    </button>
                </div>

                {/* Help Card */}
                <div className="lg:col-span-4 bg-[#0f172a] rounded-[32px] text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="h-12 w-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Receipt size={28} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 !text-white">Need Help?</h2>
                        <p className="!text-white text-sm leading-relaxed mb-10">
                            If you have any issues with your payments or need to request an invoice, please contact our billing department.
                        </p>
                        <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/20 transition-all">
                            Contact Billing
                        </button>
                    </div>
                </div>
            </div>

            {/* Transaction History Section */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                    {payments.length > 0 ? (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Transaction ID</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Date</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Amount</th>
                                    <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Status</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Program</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {payments.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-6 text-sm font-bold text-gray-600">
                                            {tx.reference.substring(0, 12)}...
                                        </td>
                                        <td className="px-8 py-6 text-sm font-medium text-gray-500">
                                            {formatDate(tx.createdAt)}
                                        </td>
                                        <td className="px-8 py-6 text-base font-black text-gray-900">
                                            {formatCurrency(tx.amount)}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black tracking-widest border ${tx.status === 'success'
                                                ? 'bg-green-50 text-green-500 border-green-100/30'
                                                : tx.status === 'pending'
                                                    ? 'bg-orange-50 text-orange-400 border-orange-100/30'
                                                    : 'bg-red-50 text-red-400 border-red-100/30'
                                                }`}>
                                                {tx.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-medium text-gray-500">
                                            {tx.programId?.name || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-sm font-bold text-gray-400">No transactions yet</p>
                            <p className="text-xs text-gray-400 mt-1">Your payment history will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
