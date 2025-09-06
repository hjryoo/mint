import React from 'react';
import { AffiliatePartner, AffiliateStatus, AffiliateRiskFlag } from '../types';
import Icon from './Icon';

interface AffiliatesPartnersTableProps {
  partners: AffiliatePartner[];
  selectedPartners: Set<string>;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectPartner: (partnerId: string) => void;
  onViewPartner: (partner: AffiliatePartner) => void;
  isAllSelected: boolean;
}

const StatusChip: React.FC<{ status: AffiliateStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in AffiliateStatus]: string } = {
        Active: "bg-mint-100 text-mint-800",
        Pending: "bg-amber-100 text-amber-800",
        Paused: "bg-slate-100 text-slate-800",
        Declined: "bg-red-100 text-red-800",
    };
    const statusDotClasses: { [key in AffiliateStatus]: string } = {
        Active: "bg-mint-500",
        Pending: "bg-amber-400",
        Paused: "bg-slate-400",
        Declined: "bg-red-400",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};

const RiskFlag: React.FC<{ flag: AffiliateRiskFlag }> = ({ flag }) => (
    <div className="flex items-center text-amber-700" title={flag}>
        <Icon name="exclamation-triangle" className="w-4 h-4 text-amber-500 mr-1" />
        <span className="text-xs font-medium">{flag}</span>
    </div>
);


const AffiliatesPartnersTable: React.FC<AffiliatesPartnersTableProps> = ({ partners, selectedPartners, onSelectAll, onSelectPartner, onViewPartner, isAllSelected }) => {
  return (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="relative px-6 py-3">
                         <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                            checked={isAllSelected}
                            onChange={onSelectAll}
                         />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Partner</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Commission</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Clicks</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Conversions</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">EPC</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Unpaid Comm.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Flags</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {partners.map((partner) => (
                    <tr 
                        key={partner.id}
                        onClick={() => onViewPartner(partner)}
                        className={`cursor-pointer transition-colors ${selectedPartners.has(partner.id) ? 'bg-mint-50' : 'hover:bg-slate-50'}`}
                    >
                        <td className="relative px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                                checked={selectedPartners.has(partner.id)}
                                onChange={() => onSelectPartner(partner.id)}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <img className="h-10 w-10 rounded-full" src={partner.avatarUrl} alt={partner.name} />
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-slate-900">{partner.name}</div>
                                    <div className="text-sm text-slate-500">{partner.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={partner.status} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{partner.commissionRate}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">{partner.clicks.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">{partner.conversions.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">${partner.epc.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-800 font-medium">${partner.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-800 font-bold">${partner.unpaidCommission.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                                {partner.riskFlags.map(flag => <RiskFlag key={flag} flag={flag} />)}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default AffiliatesPartnersTable;
