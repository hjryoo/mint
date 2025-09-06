import React from 'react';
import { AffiliatePartner, AffiliateStatus } from '../types';
import Icon from './Icon';

const StatusChip: React.FC<{ status: AffiliateStatus }> = ({ status }) => {
    const statusDotClasses: { [key in AffiliateStatus]: string } = {
        Active: "bg-mint-500",
        Pending: "bg-amber-400",
        Paused: "bg-slate-400",
        Declined: "bg-red-400",
    };
    return (
        <div className="flex items-center">
            <span className={`w-2 h-2 mr-2 rounded-full ${statusDotClasses[status]}`}></span>
            <span className="text-xs text-slate-500">{status}</span>
        </div>
    );
};

const PartnerCard: React.FC<{ partner: AffiliatePartner; isSelected: boolean; onSelect: () => void; }> = ({ partner, isSelected, onSelect }) => {
    return (
        <li
            onClick={onSelect}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-mint-100' : 'hover:bg-slate-100'}`}
        >
            <div className="flex items-center space-x-3">
                <img src={partner.avatarUrl} alt={partner.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{partner.name}</p>
                    <StatusChip status={partner.status} />
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-slate-800">${partner.unpaidCommission.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">Pending</p>
                </div>
            </div>
        </li>
    );
};

interface AffiliatePartnerListProps {
    partners: AffiliatePartner[];
    selectedPartnerId: string | null;
    onSelectPartner: (id: string | null) => void;
}

const AffiliatePartnerList: React.FC<AffiliatePartnerListProps> = ({ partners, selectedPartnerId, onSelectPartner }) => {
    return (
        <aside className="w-[320px] bg-white flex-shrink-0 border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200 flex-shrink-0">
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="search" className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md bg-white placeholder-slate-500 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                        placeholder="Search partners..."
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                <ul className="space-y-1">
                    {partners.map(partner => (
                        <PartnerCard 
                            key={partner.id}
                            partner={partner}
                            isSelected={selectedPartnerId === partner.id}
                            onSelect={() => onSelectPartner(partner.id)}
                        />
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default AffiliatePartnerList;
