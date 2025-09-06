import React from 'react';
import { Offer, OfferStatus } from '../types';
import Icon from './Icon';

const StatusChip: React.FC<{ status: OfferStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in OfferStatus]: string } = {
        Active: "bg-mint-100 text-mint-800",
        Paused: "bg-amber-100 text-amber-800",
        Draft: "bg-slate-100 text-slate-800",
    };
    const statusDotClasses: { [key in OfferStatus]: string } = {
        Active: "bg-mint-500",
        Paused: "bg-amber-400",
        Draft: "bg-slate-400",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};

interface OffersTableProps {
    offers: Offer[];
}

const OffersTable: React.FC<OffersTableProps> = ({ offers }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Offer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trigger → Offer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Discount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {offers.map((offer) => (
                    <tr key={offer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{offer.name}</div>
                            <div className="text-sm text-slate-500">{offer.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <StatusChip status={offer.status} />
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                           <div className="flex items-center">
                                <span className="font-medium text-slate-800 truncate max-w-xs">{offer.primaryProduct}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <span className="font-medium text-mint-700 truncate max-w-xs">{offer.offeredProduct}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-slate-800">
                                {offer.discount.type === 'percentage' ? `${offer.discount.value}%` : `$${offer.discount.value.toFixed(2)}`}
                            </div>
                            <div className="text-sm text-slate-500 capitalize">{offer.discount.type.replace('-', ' ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm text-slate-800">{offer.impressions.toLocaleString()} <span className="text-slate-500">impressions</span></div>
                             <div className="text-sm text-slate-500">{offer.conversions.toLocaleString()} conversions ({offer.impressions > 0 ? ((offer.conversions / offer.impressions) * 100).toFixed(1) : 0}%)</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                            ${offer.revenueGenerated.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100">
                                <Icon name="pencil" className="w-5 h-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default OffersTable;
