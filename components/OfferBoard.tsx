import React from 'react';
import { OfferImpactData, OfferImpactType } from '../types';
import Icon from './Icon';

interface OfferBoardProps {
    data: OfferImpactData[];
    selectedOfferId: string;
    onSelectOffer: (offer: OfferImpactData) => void;
}

const OfferTypeChip: React.FC<{ type: OfferImpactType }> = ({ type }) => {
    const typeClasses: { [key in OfferImpactType]: string } = {
        Bundle: "bg-blue-100 text-blue-800",
        Upsell: "bg-purple-100 text-purple-800",
        Coupon: "bg-green-100 text-green-800",
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-md ${typeClasses[type]}`}>{type}</span>
}


const OfferBoard: React.FC<OfferBoardProps> = ({ data, selectedOfferId, onSelectOffer }) => {
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b border-slate-200">
                <h3 className="text-xl font-bold font-display text-slate-800">Offer Board</h3>
                <p className="text-sm text-slate-500">Performance metrics by campaign.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Campaign</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Incr. AOV</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Flags</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                onClick={() => onSelectOffer(item)}
                                className={`cursor-pointer transition-colors ${selectedOfferId === item.id ? 'bg-mint-50' : 'hover:bg-slate-50'}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><OfferTypeChip type={item.type} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="text-sm font-semibold text-slate-800">{item.metricValue.toFixed(1)}%</div>
                                    <div className="text-xs text-slate-500">{item.metricLabel}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                                    +${item.incrementalAOV.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.cannibalizationFlag && (
                                        <div className="flex items-center text-amber-700" title="Cannibalization detected: sales of individual items dipped post-offer.">
                                            <Icon name="exclamation-triangle" className="w-5 h-5 text-amber-500 mr-1.5" />
                                            <span className="text-xs font-medium">Cannibalization</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OfferBoard;
