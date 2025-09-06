import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { RetentionSurvivalDataPoint } from '../types';

interface RetentionSurvivalCurveProps {
    data: RetentionSurvivalDataPoint[];
}

const FilterDropdown: React.FC<{ label: string; options: string[] }> = ({ label, options }) => (
    <div>
        <select
            id={label}
            name={label}
            className="rounded-md border-slate-300 py-2 pl-3 pr-10 text-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
        >
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </select>
    </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const getSuggestion = (channel: string, month: number, rate: number) => {
            if (month > 2 && rate < 70) {
                if(channel.toLowerCase() === 'youtube') return "Nudge with an exclusive tutorial video.";
                if(channel.toLowerCase() === 'tiktok') return "Retarget with a short-form video offer.";
                return "Offer a 15% loyalty coupon.";
            }
            if (month > 5 && rate < 60) {
                return "Suggest a product bundle to increase value.";
            }
            return "Engage with new content releases.";
        };

        return (
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 text-sm">
                <p className="font-bold text-slate-800 mb-2">Month {label}</p>
                <ul className="space-y-1">
                    {payload.map((pld: any) => (
                        <li key={pld.dataKey} style={{ color: pld.stroke }}>
                            <span className="font-semibold">{pld.name}:</span> {pld.value}% retention
                        </li>
                    ))}
                </ul>
                <div className="border-t border-slate-200 my-2"></div>
                <p className="text-xs text-slate-600">
                    <span className="font-semibold text-mint-700">💡 Save Action:</span> {getSuggestion(payload[0].name, label, payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

const RetentionSurvivalCurve: React.FC<RetentionSurvivalCurveProps> = ({ data }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 h-[500px]">
             <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold font-display text-slate-800">Subscription Retention</h3>
                    <p className="text-sm text-slate-500">Survival curves showing subscription retention by channel.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FilterDropdown label="Plan" options={['All Plans', 'Preset Plan', 'Coaching Plan']} />
                </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" name="Month" unit="M" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{fontSize: "14px"}} />
                    <Line type="monotone" dataKey="youtube" name="YouTube" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="tiktok" name="TikTok" stroke="#0f172a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="instagram" name="Instagram" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RetentionSurvivalCurve;
