'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Download,
    Search,
    Filter,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    XCircle,
    Loader2
} from 'lucide-react';

export default function AdminPayment() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchPayments = useCallback(async () => {
        try {
            const res = await fetch(`/api/admin/payments?search=${debouncedSearch}`);
            const data = await res.json();
            setTransactions(data);
        } catch (err) {
            console.error('Error fetching payments:', err);
        }
    }, [debouncedSearch]);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/payments/stats');
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            } else {
                console.error('API Error:', data.error);
                // Even on error, we might have default values in the refined API response
                setStats(data);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchPayments(), fetchStats()]);
            setLoading(false);
        };
        init();
    }, [fetchPayments]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleDownloadReport = () => {
        if (transactions.length === 0) return;

        const headers = ["Reference", "Student", "Email", "Amount", "Program", "Status", "Method", "Date"];
        const rows = transactions.map(tx => [
            tx.reference || 'N/A',
            tx.userId?.fullName || 'Guest',
            tx.userId?.email || 'N/A',
            tx.amount,
            tx.programId?.name || 'Academic Program',
            tx.status,
            tx.paymentMethod,
            new Date(tx.createdAt).toLocaleDateString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `revenue_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Payments & Finance</h1>
                    <p className="text-gray-500 mt-1 font-medium">Track revenue, manage student invoices and payment records.</p>
                </div>
                <button
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
                >
                    <Download size={18} />
                    Revenue Report
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col justify-between h-44">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue (All Time)</p>
                        <div className="flex items-center gap-3 mt-2">
                            <h3 className="text-3xl font-bold text-gray-900">
                                {stats ? formatCurrency(stats.totalRevenue) : '...'}
                            </h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-500 rounded-lg text-xs font-black">
                                <TrendingUp size={12} />
                                +18%
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${stats?.targetProgress || 0}%` }}
                            />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {Math.round(stats?.targetProgress || 0)}% of monthly target
                        </p>
                    </div>
                </div>

                {/* Pending Invoices */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col justify-between h-44">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Invoices</p>
                        <div className="flex items-center gap-3 mt-2">
                            <h3 className="text-3xl font-bold text-gray-900">
                                {stats?.pendingCount || 0}
                            </h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-500 rounded-lg text-xs font-black">
                                <Clock size={12} />
                                Value: {stats ? formatCurrency(stats.pendingValue) : '...'}
                            </div>
                        </div>
                    </div>
                    <div className="flex -space-x-2">
                        {stats?.pendingUsers?.map((initial: string, i: number) => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black uppercase">
                                {initial}
                            </div>
                        ))}
                        {stats?.totalPendingCount > 4 && (
                            <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                                +{stats.totalPendingCount - 4}
                            </div>
                        )}
                        {!stats?.pendingUsers?.length && (
                            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-black">
                                0
                            </div>
                        )}
                    </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col justify-between h-44">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</p>
                        <div className="flex items-center gap-3 mt-2">
                            <h3 className="text-3xl font-bold text-gray-900">
                                {stats ? `${(stats.successRate || 0).toFixed(1)}%` : '...'}
                            </h3>
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
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                {/* Filters Row */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by reference or status..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <p className="text-sm font-bold text-gray-400">Loading transactions...</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Program</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.length > 0 ? (
                                    transactions.map((tx, index) => (
                                        <tr key={tx._id || index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-5">
                                                <span className="text-sm font-bold text-gray-900">{tx.reference || 'N/A'}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black uppercase">
                                                        {tx.userId?.fullName?.[0] || '?'}
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-900">{tx.userId?.fullName || 'Guest'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{formatCurrency(tx.amount)}</p>
                                                    <p className="text-[10px] font-medium text-gray-400 uppercase">{tx.paymentMethod}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-bold text-gray-400">{tx.programId?.name || 'Academic Program'}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <StatusBadge status={tx.status?.toUpperCase()} />
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-sm font-bold text-gray-400">{formatDate(tx.createdAt)}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <p className="text-sm font-bold text-gray-400">No transactions found matching your search.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        SUCCESS: 'bg-green-50 text-green-500 border-green-100',
        PENDING: 'bg-orange-50 text-orange-400 border-orange-100',
        FAILED: 'bg-red-50 text-red-400 border-red-100',
        DEFAULT: 'bg-gray-50 text-gray-400 border-gray-100'
    };

    const icons: Record<string, React.ReactNode> = {
        SUCCESS: <CheckCircle2 size={12} strokeWidth={3} />,
        PENDING: <Clock size={12} strokeWidth={3} />,
        FAILED: <XCircle size={12} strokeWidth={3} />,
        DEFAULT: <Clock size={12} strokeWidth={3} />
    };

    const currentStyle = styles[status] || styles.DEFAULT;
    const currentIcon = icons[status] || icons.DEFAULT;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest border ${currentStyle} uppercase`}>
            {currentIcon}
            {status}
        </span>
    );
}
