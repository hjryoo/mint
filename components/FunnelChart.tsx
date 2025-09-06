import React, { useState } from 'react';
import { FunnelStep } from '../types';
import { MOCK_FUNNEL_DATA } from '../constants';
import Icon from './Icon';

const FilterDropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (value: string) => void }> = ({ label, options, value, onChange }) => (
    <div>
        <label htmlFor={label} className="sr-only">{label}</label>
        <select
            id={label}
            name={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-md border-slate-300 py-2 pl-3 pr-10 text-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
        >
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </select>
    </div>
);

const FunnelChart: React.FC = () => {
    const [channel, setChannel] = useState('All Channels');
    const [productType, setProductType] = useState('All Products');
    const [device, setDevice] = useState('All Devices');
    
    // NOTE: In a real app, this data would be fetched based on filters.
    // Here we're just using the selected channel for demonstration.
    const funnelData = MOCK_FUNNEL_DATA[channel] || MOCK_FUNNEL_DATA['All Channels'];
    const maxUsers = funnelData.length > 0 ? funnelData[0].users : 0;

    const calculateConversion = (currentUsers: number, previousUsers: number) => {
        if (previousUsers === 0) return '100%';
        return `${((currentUsers / previousUsers) * 100).toFixed(1)}%`;
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold font-display text-slate-800">Standard Conversion Funnel</h3>
                    <p className="text-sm text-slate-500">Visit → Product View → Add to Cart → Checkout → Purchase</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FilterDropdown label="Channel" options={['All Channels', 'YouTube', 'TikTok']} value={channel} onChange={setChannel} />
                    <FilterDropdown label="Product Type" options={['All Products', 'Course', 'Template']} value={productType} onChange={setProductType}/>
                    <FilterDropdown label="Device" options={['All Devices', 'Desktop', 'Mobile']} value={device} onChange={setDevice} />
                </div>
            </div>
            <div className="mt-8 space-y-2">
                {funnelData.map((step, index) => {
                    const prevStep = index > 0 ? funnelData[index - 1] : null;
                    const widthPercentage = maxUsers > 0 ? (step.users / maxUsers) * 100 : 0;
                    
                    return (
                        <div key={step.name} className="flex items-center group">
                             <div className="w-48 text-right pr-4 flex-shrink-0">
                                <h4 className="font-semibold text-slate-700">{step.name}</h4>
                                <p className="text-sm text-slate-500">{step.users.toLocaleString()} users</p>
                            </div>
                            <div className="flex-1 flex items-center">
                                <div className="h-16 bg-mint-200" style={{ width: `${widthPercentage}%`}}>
                                    <div className="h-full bg-mint-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                 <div className="w-0 h-0
                                    border-t-[32px] border-t-transparent
                                    border-b-[32px] border-b-transparent
                                    border-l-[16px] border-l-mint-200 group-hover:border-l-mint-400 transition-colors">
                                </div>
                            </div>
                            <div className="w-48 text-left pl-4 flex-shrink-0">
                                {prevStep && (
                                    <>
                                        <p className="font-semibold text-mint-700">{calculateConversion(step.users, prevStep.users)}</p>
                                        <p className="text-xs text-slate-500">from previous step</p>
                                    </>
                                )}
                                {step.medianTime && (
                                    <p className="text-xs text-slate-400 mt-1">Median time: {step.medianTime}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FunnelChart;