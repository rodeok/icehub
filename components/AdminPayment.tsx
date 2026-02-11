'use client';

import React from 'react';
import {
    Download,
    Search,
    Filter,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const transactions = [
    {
        id: 'PAY-8921',
        student: 'Sarah Connor',
        initial: 'S',
        amount: 'N250,000',
        method: 'Card',
        plan: 'Full Payment',
        status: 'SUCCESS',
        date: 'Feb 5'
    },
    {
        id: 'PAY-8922',
        student: 'John Smith',
        initial: 'J',
        amount: 'N50,000',
        method: 'Transfer',
        plan: 'Installment 1',
        status: 'PENDING',
        date: 'Feb 7'
    },
    {
        id: 'PAY-8923',
        student: 'Elena Rodriguez',
        initial: 'E',
        amount: 'N180,000',
        method: 'Card',
        plan: 'Full Payment',
        status: 'SUCCESS',
        date: 'Feb 7'
    },
    {
        id: 'PAY-8924',
        student: 'Marcus Wright',
        initial: 'M',
        amount: 'N75,000',
        method: 'Card',
        plan: 'Installment 2',
        status: 'FAILED',
        date: 'Feb 8'
    },
    {
        id: 'PAY-8925',
        student: 'David Lee',
        initial: 'D',
        amount: 'N250,000',
        method: 'Transfer',
        plan: 'Full Payment',
        status: 'SUCCESS',
        date: 'Feb 8'
    },
    {
        id: 'PAY-8926',
        student: 'Lisa Ray',
        initial: 'L',
        amount: 'N15,000',
        method: 'USSD',
        plan: 'Registration',
        status: 'SUCCESS',
        date: 'Feb 9'
    }
];

export default function AdminPayment() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Payments & Finance</h1>
                    <p className="text-gray-500 mt-1 font-medium">Track revenue, manage student invoices and payment records.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
                    <Download size={18} />
                    Revenue Report
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col justify-between h-44">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue (Feb)</p>
                        <div className="flex items-center gap-3 mt-2">
                            <h3 className="text-3xl font-bold text-gray-900">N4.2M</h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-500 rounded-lg text-xs font-black">
                                <TrendingUp size={12} />
                                +18%
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full w-3/4" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">75% of monthly target</p>
                    </div>
                </div>

                {/* Pending Invoices */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col justify-between h-44">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Invoices</p>
                        <div className="flex items-center gap-3 mt-2">
                            <h3 className="text-3xl font-bold text-gray-900">42</h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-500 rounded-lg text-xs font-black">
                                <Clock size={12} />
                                Value: N850k
                            </div>
                        </div>
                    </div>
                    <div className="flex -space-x-2">
                        {['A', 'B', 'C', 'D'].map((initial, i) => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black">
                                {initial}
                            </div>
                        ))}
                        <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                            +38
                        </div>
                    </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col justify-between h-44">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</p>
                        <div className="flex items-center gap-3 mt-2">
                            <h3 className="text-3xl font-bold text-gray-900">94.8%</h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-500 rounded-lg text-xs font-black">
                                <TrendingUp size={12} />
                                +2.1%
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end gap-1.5 h-10">
                        <div className="flex-1 bg-blue-600 rounded-lg h-3/4" />
                        <div className="flex-1 bg-blue-600/40 rounded-lg h-2/5" />
                        <div className="flex-1 bg-blue-600 rounded-lg h-full" />
                        <div className="flex-1 bg-blue-600/40 rounded-lg h-3/5" />
                        <div className="flex-1 bg-blue-600 rounded-lg h-full" />
                        <div className="flex-1 bg-blue-600/40 rounded-lg h-4/5" />
                        <div className="flex-1 bg-blue-600 rounded-lg h-full" />
                    </div>
                </div>
            </div>

            {/* Transactions Section */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                {/* Filters Row */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-blue-100 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors">
                            <Filter size={18} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
                            Last 30 Days
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((tx, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-bold text-gray-900">{tx.id}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black">
                                                {tx.initial}
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{tx.student}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{tx.amount}</p>
                                            <p className="text-[10px] font-medium text-gray-400">{tx.method}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-xs font-bold text-gray-400">{tx.plan}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <StatusBadge status={tx.status} />
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-bold text-gray-400">{tx.date}</span>
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

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        SUCCESS: 'bg-green-50 text-green-500 border-green-100',
        PENDING: 'bg-orange-50 text-orange-400 border-orange-100',
        FAILED: 'bg-red-50 text-red-400 border-red-100'
    };

    const icons: Record<string, React.ReactNode> = {
        SUCCESS: <CheckCircle2 size={12} strokeWidth={3} />,
        PENDING: <Clock size={12} strokeWidth={3} />,
        FAILED: <XCircle size={12} strokeWidth={3} />
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest border ${styles[status]}`}>
            {icons[status]}
            {status}
        </span>
    );
}
