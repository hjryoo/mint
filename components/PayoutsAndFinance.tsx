import React, { useState, useMemo } from 'react';
import Icon from './Icon';
import { MOCK_PAYOUTS_DATA, MOCK_ORDERS_DATA, MOCK_REFUNDS_DATA } from '../constants';
import { Payout, FinancePayoutStatus, Order, PaymentStatus, RefundStatus, RefundRequest, RefundRequestStatus } from '../types';

// --- Reusable Components within this file ---

const PayoutsKpiCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-5 rounded-lg shadow">
        <div className="flex items-center">
            <div className={`flex-shrink-0 p-3 rounded-lg bg-${color}-100`}>
                <span className={`text-${color}-600`}>{icon}</span>
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    </div>
);

const PayoutStatusChip: React.FC<{ status: FinancePayoutStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in FinancePayoutStatus]: string } = {
        Pending: "bg-amber-100 text-amber-800",
        Approved: "bg-blue-100 text-blue-800",
        Paid: "bg-mint-100 text-mint-800",
        Hold: "bg-purple-100 text-purple-800",
    };
    const statusDotClasses: { [key in FinancePayoutStatus]: string } = {
        Pending: "bg-amber-600",
        Approved: "bg-blue-600",
        Paid: "bg-mint-600",
        Hold: "bg-purple-600",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};


// --- New Components for Orders, Invoices & Refunds ---

const PaymentStatusChip: React.FC<{ status: PaymentStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in PaymentStatus]: string } = {
        Paid: "bg-mint-100 text-mint-800",
        Pending: "bg-amber-100 text-amber-800",
        Failed: "bg-red-100 text-red-800",
    };
    const statusDotClasses: { [key in PaymentStatus]: string } = {
        Paid: "bg-mint-600",
        Pending: "bg-amber-600",
        Failed: "bg-red-600",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};

const RefundStatusChip: React.FC<{ status: RefundStatus }> = ({ status }) => {
    if (status === 'None') return <span className="text-xs text-slate-400">-</span>;
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-block";
    const statusClasses: { [key in RefundStatus]: string } = {
        None: "",
        Partial: "bg-slate-100 text-slate-800",
        Full: "bg-purple-100 text-purple-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const RefundRequestStatusChip: React.FC<{ status: RefundRequestStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in RefundRequestStatus]: string } = {
        Requested: "bg-amber-100 text-amber-800",
        Approved: "bg-blue-100 text-blue-800",
        Rejected: "bg-red-100 text-red-800",
        Processed: "bg-mint-100 text-mint-800",
    };
    const statusDotClasses: { [key in RefundRequestStatus]: string } = {
        Requested: "bg-amber-600",
        Approved: "bg-blue-600",
        Rejected: "bg-red-600",
        Processed: "bg-mint-600",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};

const FraudScoreIndicator: React.FC<{ score: number }> = ({ score }) => {
    let colorClass = 'text-slate-500';
    if (score > 75) colorClass = 'text-red-600';
    else if (score > 40) colorClass = 'text-amber-600';

    return (
        <div className={`flex items-center text-sm ${colorClass}`} title={`Fraud Score: ${score}/100`}>
            {score > 40 && <Icon name="exclamation-triangle" className="w-4 h-4 mr-1.5" />}
            <span className="font-medium">{score}</span>
        </div>
    );
};


// --- Main Tab Views ---

const OrdersView: React.FC = () => {
    const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
    const orders = MOCK_ORDERS_DATA;

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedOrders(new Set(orders.map(o => o.id)));
        } else {
            setSelectedOrders(new Set());
        }
    };

    const handleSelectOrder = (orderId: string) => {
        const newSelection = new Set(selectedOrders);
        if (newSelection.has(orderId)) {
            newSelection.delete(orderId);
        } else {
            newSelection.add(orderId);
        }
        setSelectedOrders(newSelection);
    };

    const numSelected = selectedOrders.size;
    const numOrders = orders.length;
    const isAllSelected = numSelected === numOrders && numOrders > 0;

    return (
        <div className="space-y-6">
             <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">All Orders</h3>
                        <p className="text-sm text-slate-500">Search, filter, and manage all customer orders.</p>
                    </div>
                     <div className="flex items-center space-x-2">
                         <div className="relative w-72">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon name="search" className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md bg-white placeholder-slate-500 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                                placeholder="Search by customer, order ID..."
                            />
                        </div>
                        <button className="px-3 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Completed</button>
                        <button className="px-3 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Pending</button>
                        <button className="px-3 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Failed</button>
                    </div>
                </div>
                
                 {numSelected > 0 && (
                    <div className="p-3 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{numSelected} selected</span>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Resend Invoice</button>
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Issue Refund</button>
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Export</button>
                            </div>
                        </div>
                    </div>
                )}
                
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="relative px-6 py-3">
                                    <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" checked={isAllSelected} onChange={handleSelectAll} />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Order</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Products</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Payment</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Refund</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Source</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {orders.map((order) => (
                                <tr key={order.id} className={selectedOrders.has(order.id) ? 'bg-mint-50' : ''}>
                                    <td className="relative px-6 py-4">
                                        <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" checked={selectedOrders.has(order.id)} onChange={() => handleSelectOrder(order.id)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-mono text-slate-500">{order.id}</div>
                                        <div className="text-xs text-slate-400">{order.date}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-full" src={order.customerAvatarUrl} alt={order.customerName} />
                                            <div className="ml-3 text-sm font-medium text-slate-900">{order.customerName}</div>
                                        </div>
                                    </td>
                                     <td className="px-6 py-4 text-sm text-slate-500">
                                        {order.products.map(p => `${p.name} (x${p.quantity})`).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-sm font-semibold text-slate-800">${order.totalAmount.toFixed(2)}</div>
                                        <div className="text-xs text-slate-500">{order.currency}</div>
                                    </td>
                                    <td className="px-6 py-4"><PaymentStatusChip status={order.paymentStatus} /></td>
                                    <td className="px-6 py-4"><RefundStatusChip status={order.refundStatus} /></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {order.channel}
                                        {order.affiliateName && <div className="text-xs text-slate-400">via {order.affiliateName}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600 p-1"><Icon name="more-horizontal" className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const RefundsView: React.FC = () => {
    const [refunds, setRefunds] = useState<RefundRequest[]>(MOCK_REFUNDS_DATA);
    const [selectedRefunds, setSelectedRefunds] = useState<Set<string>>(new Set());
    const [filterStatus, setFilterStatus] = useState<'All' | RefundRequestStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRefunds = useMemo(() => {
        return refunds
            .filter(r => filterStatus === 'All' || r.status === filterStatus)
            .filter(r => r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || r.orderId.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [refunds, filterStatus, searchTerm]);

    const isAllSelected = filteredRefunds.length > 0 && selectedRefunds.size === filteredRefunds.length;

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedRefunds(new Set(filteredRefunds.map(r => r.id)));
        } else {
            setSelectedRefunds(new Set());
        }
    };
    const handleSelectRefund = (refundId: string) => {
        const newSelection = new Set(selectedRefunds);
        if (newSelection.has(refundId)) {
            newSelection.delete(refundId);
        } else {
            newSelection.add(refundId);
        }
        setSelectedRefunds(newSelection);
    };

    const updateSelectedRefundsStatus = (newStatus: RefundRequestStatus) => {
        setRefunds(currentRefunds => 
            currentRefunds.map(r => 
                selectedRefunds.has(r.id) ? { ...r, status: newStatus } : r
            )
        );
        setSelectedRefunds(new Set());
    };

    const getSelectedRefunds = () => refunds.filter(r => selectedRefunds.has(r.id));
    
    const canApprove = useMemo(() => {
        const selected = getSelectedRefunds();
        return selected.length > 0 && selected.every(r => r.status === 'Requested');
    }, [selectedRefunds, refunds]);

    const canReject = useMemo(() => {
        const selected = getSelectedRefunds();
        return selected.length > 0 && selected.every(r => r.status === 'Requested');
    }, [selectedRefunds, refunds]);
    
    const canProcess = useMemo(() => {
        const selected = getSelectedRefunds();
        return selected.length > 0 && selected.every(r => r.status === 'Approved');
    }, [selectedRefunds, refunds]);

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Refund Requests</h3>
                        <p className="text-sm text-slate-500">Approve, reject, and process refund requests.</p>
                    </div>
                     <div className="relative w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="search" className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md bg-white placeholder-slate-500 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                            placeholder="Search by customer, order..."
                        />
                    </div>
                </div>

                <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                             {(['All', 'Requested', 'Approved', 'Rejected', 'Processed'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filterStatus === status ? 'bg-mint-100 text-mint-700' : 'text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        {selectedRefunds.size > 0 && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-slate-700">{selectedRefunds.size} selected</span>
                                <button onClick={() => updateSelectedRefundsStatus('Approved')} disabled={!canApprove} className="px-3 py-1.5 border text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Approve</button>
                                <button onClick={() => updateSelectedRefundsStatus('Rejected')} disabled={!canReject} className="px-3 py-1.5 border text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Reject</button>
                                <button onClick={() => updateSelectedRefundsStatus('Processed')} disabled={!canProcess} className="px-3 py-1.5 border text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Mark as Processed</button>
                            </div>
                        )}
                    </div>
                </div>
                
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="relative px-6 py-3">
                                    <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" checked={isAllSelected} onChange={handleSelectAll} aria-label="Select all refunds"/>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Request ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Customer</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Reason</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Fraud Score</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date Opened</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredRefunds.map((refund) => (
                                <tr key={refund.id} className={selectedRefunds.has(refund.id) ? 'bg-mint-50' : ''}>
                                    <td className="relative px-6 py-4">
                                        <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" checked={selectedRefunds.has(refund.id)} onChange={() => handleSelectRefund(refund.id)} aria-label={`Select refund ${refund.id}`}/>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-mono text-slate-500">{refund.id}</div>
                                        <div className="text-xs text-blue-600 hover:underline cursor-pointer">{refund.orderId}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-full" src={refund.customerAvatarUrl} alt={refund.customerName} />
                                            <div className="ml-3 text-sm font-medium text-slate-900">{refund.customerName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-sm font-semibold text-slate-800">${refund.amount.toFixed(2)}</div>
                                        <div className="text-xs text-slate-500">{refund.currency}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{refund.reason}</td>
                                    <td className="px-6 py-4"><RefundRequestStatusChip status={refund.status} /></td>
                                    <td className="px-6 py-4"><FraudScoreIndicator score={refund.fraudScore} /></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{refund.dateOpened}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const PayoutsView: React.FC = () => {
    const [payouts, setPayouts] = useState<Payout[]>(MOCK_PAYOUTS_DATA);
    const [selectedPayouts, setSelectedPayouts] = useState<Set<string>>(new Set());
    const [filterStatus, setFilterStatus] = useState<'All' | FinancePayoutStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayouts = useMemo(() => {
        return payouts
            .filter(p => filterStatus === 'All' || p.status === filterStatus)
            .filter(p => p.payeeName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [payouts, filterStatus, searchTerm]);

    const isAllSelected = filteredPayouts.length > 0 && selectedPayouts.size === filteredPayouts.length;

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedPayouts(new Set(filteredPayouts.map(p => p.id)));
        } else {
            setSelectedPayouts(new Set());
        }
    };

    const handleSelectPayout = (payoutId: string) => {
        const newSelection = new Set(selectedPayouts);
        if (newSelection.has(payoutId)) {
            newSelection.delete(payoutId);
        } else {
            newSelection.add(payoutId);
        }
        setSelectedPayouts(newSelection);
    };
    
    const updateSelectedPayoutsStatus = (newStatus: FinancePayoutStatus) => {
      setPayouts(currentPayouts => 
        currentPayouts.map(p => 
          selectedPayouts.has(p.id) ? { ...p, status: newStatus } : p
        )
      );
      setSelectedPayouts(new Set());
    };

    const getSelectedPayouts = () => {
        return payouts.filter(p => selectedPayouts.has(p.id));
    };

    const canApprove = useMemo(() => {
        const selected = getSelectedPayouts();
        return selected.length > 0 && selected.every(p => p.status === 'Pending');
    }, [selectedPayouts, payouts]);

    const canMarkAsPaid = useMemo(() => {
        const selected = getSelectedPayouts();
        return selected.length > 0 && selected.every(p => p.status === 'Approved');
    }, [selectedPayouts, payouts]);

    const canHold = useMemo(() => {
        const selected = getSelectedPayouts();
        return selected.length > 0 && selected.every(p => p.status !== 'Hold');
    }, [selectedPayouts, payouts]);

    // Calculate summary data from the master list
    const totalPending = useMemo(() => payouts.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0), [payouts]);
    const totalApproved = useMemo(() => payouts.filter(p => p.status === 'Approved').reduce((sum, p) => sum + p.amount, 0), [payouts]);
    const totalPaid = useMemo(() => payouts.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0), [payouts]);
    const totalOnHold = useMemo(() => payouts.filter(p => p.status === 'Hold').reduce((sum, p) => sum + p.amount, 0), [payouts]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <PayoutsKpiCard title="Total Pending" value={`$${totalPending.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<Icon name="mrr" />} color="amber" />
                <PayoutsKpiCard title="Approved" value={`$${totalApproved.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<Icon name="check-circle" />} color="blue" />
                <PayoutsKpiCard title="Paid This Period" value={`$${totalPaid.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<Icon name="payouts" />} color="mint" />
                <PayoutsKpiCard title="On Hold" value={`$${totalOnHold.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<Icon name="pause" />} color="purple" />
                <PayoutsKpiCard title="Upcoming Payout" value="July 15, 2024" icon={<Icon name="calendar" />} color="slate" />
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Payout Request Queue</h3>
                        <p className="text-sm text-slate-500">Review, approve, and process payouts.</p>
                    </div>
                     <div className="relative w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="search" className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md bg-white placeholder-slate-500 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                            placeholder="Search by payee..."
                        />
                    </div>
                </div>

                <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            {(['All', 'Pending', 'Approved', 'Paid', 'Hold'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filterStatus === status ? 'bg-mint-100 text-mint-700' : 'text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        {selectedPayouts.size > 0 && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-slate-700">{selectedPayouts.size} selected</span>
                                <button onClick={() => updateSelectedPayoutsStatus('Approved')} disabled={!canApprove} className="px-3 py-1.5 border text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Approve</button>
                                <button onClick={() => updateSelectedPayoutsStatus('Paid')} disabled={!canMarkAsPaid} className="px-3 py-1.5 border text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Mark as Paid</button>
                                <button onClick={() => updateSelectedPayoutsStatus('Hold')} disabled={!canHold} className="px-3 py-1.5 border text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Hold</button>
                            </div>
                        )}
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="relative px-6 py-3">
                                    <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" checked={isAllSelected} onChange={handleSelectAll} aria-label="Select all payouts"/>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Payout ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Payee</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Scheduled Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Notes</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredPayouts.map((payout) => (
                                <tr key={payout.id} className={selectedPayouts.has(payout.id) ? 'bg-mint-50' : ''}>
                                    <td className="relative px-6 py-4">
                                        <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" checked={selectedPayouts.has(payout.id)} onChange={() => handleSelectPayout(payout.id)} aria-label={`Select payout ${payout.id}`}/>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-slate-500">{payout.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-full" src={payout.payeeAvatarUrl} alt={payout.payeeName} />
                                            <div className="ml-3 text-sm font-medium text-slate-900">{payout.payeeName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-slate-800">${payout.amount.toFixed(2)}</div>
                                        <div className="text-xs text-slate-500">{payout.currency}</div>
                                    </td>
                                    <td className="px-6 py-4"><PayoutStatusChip status={payout.status} /></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{payout.scheduledDate}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate" title={payout.notes || ''}>{payout.notes}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600 p-1"><Icon name="more-horizontal" className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const FinancePlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-sm p-8 min-h-[400px]">
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-mint-100">
                <Icon name="payouts" className="h-6 w-6 text-mint-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold font-display text-slate-800">{title}</h1>
            <p className="mt-2 text-slate-500">This finance view is under construction. Come back soon!</p>
        </div>
    </div>
);


const PayoutsAndFinance: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Payouts');

    const tabs = ['Orders & Invoices', 'Payouts', 'Refunds & Adjustments', 'Tax & Compliance', 'Export & Reports'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Orders & Invoices':
                return <OrdersView />;
            case 'Payouts':
                return <PayoutsView />;
            case 'Refunds & Adjustments':
                return <RefundsView />;
            case 'Tax & Compliance':
            case 'Export & Reports':
                return <FinancePlaceholder title={activeTab} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold font-display text-slate-800">Payouts & Finance</h2>
                        <p className="text-sm text-slate-500">Manage revenue, payouts, taxes, and reporting.</p>
                    </div>
                     <div className="flex items-center space-x-2">
                         <button className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center">
                            <Icon name="calendar" className="w-5 h-5 mr-2 -ml-1" />
                            This Month
                        </button>
                        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center">
                            Export
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Tabs */}
            <div className="flex-shrink-0">
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab
                                        ? 'border-mint-500 text-mint-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                                aria-current={activeTab === tab ? 'page' : undefined}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                 {renderTabContent()}
            </div>
        </div>
    );
};

export default PayoutsAndFinance;