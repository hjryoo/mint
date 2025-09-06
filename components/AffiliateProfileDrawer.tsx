import React, { useState } from 'react';
import { AffiliatePartner, CommissionLedgerEntry, AffiliateLink, CommissionStatus } from '../types';
import Icon from './Icon';
import { MOCK_AFFILIATE_COMMISSIONS_DATA, MOCK_AFFILIATE_LINKS_DATA } from '../constants';

interface AffiliateProfileDrawerProps {
    partner: AffiliatePartner | null;
    isOpen: boolean;
    onClose: () => void;
}

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-slate-50 p-3 rounded-lg text-center">
        <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
    </div>
);

const CommissionStatusChip: React.FC<{ status: CommissionStatus }> = ({ status }) => {
    const classes = {
        'On Hold': 'bg-amber-100 text-amber-800',
        'Cleared': 'bg-mint-100 text-mint-800',
        'Reversed': 'bg-red-100 text-red-800',
    }
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${classes[status]}`}>{status}</span>
}


const AffiliateProfileDrawer: React.FC<AffiliateProfileDrawerProps> = ({ partner, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('Performance');

    if (!partner) return null;
    
    const tabs = ['Performance', 'Commissions', 'Links', 'Payouts', 'Creatives'];

    const renderTabContent = () => {
        switch(activeTab) {
            case 'Performance':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard label="Clicks" value={partner.clicks.toLocaleString()} />
                        <StatCard label="Conversions" value={partner.conversions.toLocaleString()} />
                        <StatCard label="Revenue" value={`$${partner.revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} />
                        <StatCard label="EPC" value={`$${partner.epc.toFixed(2)}`} />
                    </div>
                )
            case 'Commissions':
                return (
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="min-w-full divide-y divide-slate-200">
                             <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Order</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Commission</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {MOCK_AFFILIATE_COMMISSIONS_DATA.map((item: CommissionLedgerEntry) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-800">{item.orderId}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{item.productName}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600 font-semibold">${item.commissionAmount.toFixed(2)}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm"><CommissionStatusChip status={item.status} /></td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
             case 'Links':
                 return (
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="min-w-full divide-y divide-slate-200">
                             <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Link</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Clicks</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Conversions</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Revenue</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {MOCK_AFFILIATE_LINKS_DATA.map((item: AffiliateLink) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                            <p className="text-xs text-mint-600 hover:underline cursor-pointer">{item.shortlink}</p>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600">{item.clicks.toLocaleString()}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600">{item.conversions.toLocaleString()}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-slate-800">${item.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            default:
                return <p className="text-sm text-slate-500 text-center py-8">Content for {activeTab} is not yet available.</p>
        }
    }
    
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div 
                className={`fixed top-0 right-0 h-full bg-white w-full max-w-2xl shadow-2xl z-50 transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="affiliate-profile-title"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <header className="flex-shrink-0 p-6 border-b border-slate-200">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={partner.avatarUrl} alt={partner.name} className="w-16 h-16 rounded-full"/>
                                <div>
                                    <h2 id="affiliate-profile-title" className="text-2xl font-bold font-display text-slate-800">{partner.name}</h2>
                                    <p className="text-slate-500">{partner.email}</p>
                                    <p className="text-sm text-slate-400">Joined {partner.joinDate}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                                <Icon name="x-mark" className="w-6 h-6" />
                            </button>
                        </div>
                         <div className="mt-4 flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                                <span><span className="font-semibold">Code:</span> <span className="font-mono bg-slate-100 px-2 py-1 rounded-md">{partner.uniqueCode}</span></span>
                                <span><span className="font-semibold">Commission:</span> {partner.commissionRate}%</span>
                                <span><span className="font-semibold">Cookie Window:</span> {partner.cookieWindow} days</span>
                            </div>
                             <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="link" className="w-4 h-4 mr-2" /> New Link</button>
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="star" className="w-4 h-4 mr-2" /> Bonus</button>
                            </div>
                        </div>
                    </header>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="border-b border-slate-200">
                            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === tab
                                                ? 'border-mint-500 text-mint-600'
                                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div>{renderTabContent()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AffiliateProfileDrawer;
