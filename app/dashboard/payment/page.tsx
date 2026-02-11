'use client';

import React from 'react';
import {
    CheckCircle2,
    Clock,
    Info,
    CreditCard,
    Receipt,
    Download
} from 'lucide-react';

const transactions = [
    {
        id: 'TX-9012',
        date: 'Jan 15, 2024',
        amount: '₦150,000',
        status: 'PAID'
    },
    {
        id: 'TX-8843',
        date: 'Dec 10, 2023',
        amount: '₦50,000',
        status: 'PAID'
    }
];

export default function PaymentPage() {
    return (
        <div className="space-y-8 pb-12">
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
                            <span className="text-xl font-black text-gray-900 tracking-tight">₦450,000</span>
                        </div>

                        <div className="flex justify-between items-center transition-all hover:translate-x-1">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle2 size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-bold text-green-500">Amount Paid</span>
                            </div>
                            <span className="text-xl font-black text-green-500 tracking-tight">₦200,000</span>
                        </div>

                        <div className="flex justify-between items-center transition-all hover:translate-x-1 text-blue-600">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <Clock size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-bold">Outstanding Balance</span>
                            </div>
                            <span className="text-xl font-black tracking-tight">₦250,000</span>
                        </div>
                    </div>

                    {/* Next Payment Alert */}
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                        <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                            <Info size={16} strokeWidth={3} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-blue-600">Next payment due: Feb 15, 2024</p>
                            <p className="text-xs text-blue-500 font-medium leading-relaxed">
                                Keep your payments up to date to ensure uninterrupted access to course materials.
                            </p>
                        </div>
                    </div>

                    <button className="w-full py-5 bg-blue-600 text-white rounded-[20px] text-base font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                        <CreditCard size={20} strokeWidth={2.5} />
                        Make Payment
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
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Transaction ID</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Date</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Amount</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((tx, index) => (
                                <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-6 text-sm font-bold text-gray-600">{tx.id}</td>
                                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{tx.date}</td>
                                    <td className="px-8 py-6 text-base font-black text-gray-900">{tx.amount}</td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-3.5 py-1.5 bg-green-50 text-green-500 rounded-lg text-[10px] font-black tracking-widest border border-green-100/30">
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                                            <Download size={14} strokeWidth={2.5} />
                                            <span className="text-xs font-bold leading-none border-b border-blue-600/30">Download</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
