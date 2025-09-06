import React from 'react';
import { OfferImpactData } from '../types';
import Icon from './Icon';

interface OfferComparisonProps {
    offer: OfferImpactData;
}

const KpiStat: React.FC<{ label: string; value: string; change: string; changeType: 'increase' | 'decrease' }> = ({ label, value, change, changeType }) => {
    const isIncrease = changeType === 'increase';
    const changeColor = isIncrease ? 'text-mint-600' : 'text-red-600';

    return (
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className={`flex items-center text-sm font-medium ${changeColor}`}>
                {isIncrease ? <Icon name="chevron-up" className="w-4 h-4 mr-1"/> : <Icon name="chevron-down" className="w-4 h-4 mr-1"/>}
                {change}
            </p>
        </div>
    );
};


const OfferComparison: React.FC<OfferComparisonProps> = ({ offer }) => {
    const { on, off } = offer.comparisonData;

    const revenueDiff = on.revenue - off.revenue;
    const revenueDiffPercent = off.revenue > 0 ? (revenueDiff / off.revenue) * 100 : 0;

    const onMarginPercent = on.revenue > 0 ? (on.margin / on.revenue) * 100 : 0;
    const offMarginPercent = off.revenue > 0 ? (off.margin / off.revenue) * 100 : 0;
    const marginDiff = onMarginPercent - offMarginPercent;

    return (
        <div className="bg-white shadow rounded-lg h-full">
            <div className="p-4 border-b border-slate-200">
                <h3 className="text-xl font-bold font-display text-slate-800">Comparison View</h3>
                <p className="text-sm text-slate-500 truncate">Impact of "<span className="font-semibold">{offer.name}</span>"</p>
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm font-semibold text-slate-800 bg-slate-100 rounded-t-lg py-2">Offer Off</p>
                        <p className="text-xs text-slate-500 border-x border-b border-slate-200 rounded-b-lg py-1">{off.period}</p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-slate-800 bg-mint-100 text-mint-800 rounded-t-lg py-2">Offer On</p>
                        <p className="text-xs text-slate-500 border-x border-b border-mint-200 rounded-b-lg py-1">{on.period}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <KpiStat
                        label="Revenue"
                        value={`$${on.revenue.toLocaleString()}`}
                        change={`$${Math.abs(revenueDiff).toLocaleString()} (${revenueDiffPercent.toFixed(1)}%)`}
                        changeType={revenueDiff >= 0 ? 'increase' : 'decrease'}
                    />
                    <div className="border-t border-slate-200"></div>
                     <KpiStat
                        label="Margin"
                        value={`${onMarginPercent.toFixed(1)}%`}
                        change={`${marginDiff.toFixed(1)}pp`}
                        changeType={marginDiff >= 0 ? 'increase' : 'decrease'}
                    />
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600">
                    <p>
                        This comparison quantifies the revenue and margin differences between the active offer period and a preceding control period, enabling more defensible merchandising decisions.
                        {offer.cannibalizationFlag && <span className="block mt-2 font-semibold text-amber-800">Note: While revenue increased, margin decreased, likely due to discounts and a shift from higher-margin individual products.</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OfferComparison;
