import React, { useState } from 'react';
import { AffiliatePartner, CommissionLedgerEntry, AffiliateLink, CommissionStatus, AffiliateRiskFlag } from '../types';
import { MOCK_AFFILIATE_COMMISSIONS_DATA, MOCK_AFFILIATE_LINKS_DATA } from '../constants';
import Icon from './Icon';
import CommissionStructureEditor from './CommissionStructureEditor';
import LinkBuilderModal from './LinkBuilderModal';

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-slate-100 p-3 rounded-lg">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
);

const CommissionStatusChip: React.FC<{ status: CommissionStatus }> = ({ status }) => {
    const classes = {
        'On Hold': 'bg-amber-100 text-amber-800',
        'Cleared': 'bg-mint-100 text-mint-800',
        'Reversed': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${classes[status]}`}>{status}</span>;
};

const RiskFlag: React.FC<{ flag: AffiliateRiskFlag }> = ({ flag }) => (
    <div className="flex items-center text-amber-700" title={flag}>
        <Icon name="exclamation-triangle" className="w-4 h-4 text-amber-500 mr-1" />
        <span className="text-xs font-medium">{flag}</span>
    </div>
);

interface AffiliatePartnerDetailProps {
    partner: AffiliatePartner;
    onBack: () => void;
}

const AffiliatePartnerDetail: React.FC<AffiliatePartnerDetailProps> = ({ partner, onBack }) => {
    const [isCommissionEditorOpen, setIsCommissionEditorOpen] = useState(false);
    const [isLinkBuilderOpen, setIsLinkBuilderOpen] = useState(false);

    return (
        <>
            <div className="space-y-6">
                <div>
                    <button onClick={onBack} className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center mb-4">
                        <Icon name="chevron-right" className="w-5 h-5 mr-1 transform rotate-180" />
                        Back to Overview
                    </button>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={partner.avatarUrl} alt={partner.name} className="w-16 h-16 rounded-full"/>
                                <div>
                                    <h2 className="text-2xl font-bold font-display text-slate-800">{partner.name}</h2>
                                    <p className="text-slate-500">{partner.email}</p>
                                    <p className="text-sm text-slate-400">Joined {partner.joinDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                 <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Send Message</button>
                                 <button className="text-slate-400 hover:text-slate-600 p-1.5"><Icon name="more-horizontal" /></button>
                            </div>
                        </div>
                         <div className="mt-4 flex items-center justify-between text-sm border-t border-slate-200 pt-4">
                            <div className="flex items-center space-x-4">
                                <span><span className="font-semibold">Code:</span> <span className="font-mono bg-slate-100 px-2 py-1 rounded-md">{partner.uniqueCode}</span></span>
                                <button onClick={() => setIsCommissionEditorOpen(true)} className="flex items-center space-x-1 p-1 rounded-md hover:bg-slate-100">
                                    <span className="font-semibold">Commission:</span>
                                    <span>{partner.commissionRate}%</span>
                                    <Icon name="pencil" className="w-3 h-3 text-slate-400" />
                                </button>
                                <span><span className="font-semibold">Cookie Window:</span> {partner.cookieWindow} days</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {partner.riskFlags.map(flag => <RiskFlag key={flag} flag={flag} />)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Clicks" value={partner.clicks.toLocaleString()} />
                    <StatCard label="Total Conversions" value={partner.conversions.toLocaleString()} />
                    <StatCard label="Total Revenue" value={`$${partner.revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} />
                    <StatCard label="Avg. EPC" value={`$${partner.epc.toFixed(2)}`} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-semibold text-slate-800">Links</h3>
                            <button onClick={() => setIsLinkBuilderOpen(true)} className="px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="plus" className="w-4 h-4 mr-1"/> New Link</button>
                        </div>
                        <table className="min-w-full">
                             <tbody>
                                {MOCK_AFFILIATE_LINKS_DATA.map(link => (
                                    <tr key={link.id} className="border-t border-slate-100">
                                        <td className="p-3">
                                            <p className="text-sm font-medium text-slate-800">{link.name}</p>
                                            <p className="text-xs text-mint-600">{link.shortlink}</p>
                                        </td>
                                        <td className="p-3 text-right text-sm">{link.clicks} clicks</td>
                                        <td className="p-3 text-right text-sm">{link.conversions} conv.</td>
                                    </tr>
                                ))}
                             </tbody>
                        </table>
                    </div>
                     <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-semibold text-slate-800">Commissions</h3>
                            <button className="px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="payouts" className="w-4 h-4 mr-1"/> Payout</button>
                        </div>
                         <table className="min-w-full">
                             <tbody>
                                {MOCK_AFFILIATE_COMMISSIONS_DATA.map(item => (
                                    <tr key={item.id} className="border-t border-slate-100">
                                        <td className="p-3">
                                            <p className="text-sm font-medium text-slate-800">{item.orderId}</p>
                                            <p className="text-xs text-slate-500">{item.date}</p>
                                        </td>
                                        <td className="p-3"><CommissionStatusChip status={item.status}/></td>
                                        <td className="p-3 text-right text-sm font-semibold text-slate-800">${item.commissionAmount.toFixed(2)}</td>
                                    </tr>
                                ))}
                             </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isCommissionEditorOpen && (
                <CommissionStructureEditor 
                    partner={partner}
                    onClose={() => setIsCommissionEditorOpen(false)}
                />
            )}
             {isLinkBuilderOpen && (
                <LinkBuilderModal
                    partner={partner}
                    onClose={() => setIsLinkBuilderOpen(false)}
                />
            )}
        </>
    );
};

export default AffiliatePartnerDetail;
