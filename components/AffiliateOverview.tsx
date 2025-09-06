import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AffiliatePartner } from '../types';
import { MOCK_AFFILIATES_OVERVIEW_KPI_DATA } from '../constants';
import KpiCard from './KpiCard';
import Icon from './Icon';

const chartData = [
    { name: 'Jan', clicks: 4000, conversions: 24, commission: 2400 },
    { name: 'Feb', clicks: 3000, conversions: 13, commission: 2210 },
    { name: 'Mar', clicks: 2000, conversions: 98, commission: 2290 },
    { name: 'Apr', clicks: 2780, conversions: 39, commission: 2000 },
    { name: 'May', clicks: 1890, conversions: 48, commission: 2181 },
    { name: 'Jun', clicks: 2390, conversions: 38, commission: 2500 },
    { name: 'Jul', clicks: 3490, conversions: 43, commission: 2100 },
];

const TopPerformersTable: React.FC<{ partners: AffiliatePartner[] }> = ({ partners }) => {
    const topPartners = [...partners]
        .filter(p => p.status === 'Active')
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    return (
        <div className="bg-white p-4 rounded-lg shadow h-full">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performers (30d)</h3>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2">Partner</th>
                        <th className="text-right text-xs font-medium text-slate-500 uppercase pb-2">Conv.</th>
                        <th className="text-right text-xs font-medium text-slate-500 uppercase pb-2">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {topPartners.map(p => (
                        <tr key={p.id} className="border-t border-slate-100">
                            <td className="py-2">
                                <div className="flex items-center">
                                    <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm font-medium text-slate-800 ml-3">{p.name}</span>
                                </div>
                            </td>
                            <td className="text-right text-sm text-slate-500 py-2">{p.conversions}</td>
                            <td className="text-right text-sm font-semibold text-slate-800 py-2">${p.revenue.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const AffiliateOverview: React.FC<{ partners: AffiliatePartner[] }> = ({ partners }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {MOCK_AFFILIATES_OVERVIEW_KPI_DATA.map(kpi => <KpiCard key={kpi.title} data={kpi} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow h-96">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis yAxisId="left" label={{ value: 'Clicks', angle: -90, position: 'insideLeft' }} fontSize={12} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Conversions', angle: 90, position: 'insideRight' }} fontSize={12} />
                            <Tooltip />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                            <Bar yAxisId="left" dataKey="clicks" barSize={20} fill="#99f6e4" />
                            <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#14b8a6" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-1">
                    <TopPerformersTable partners={partners} />
                </div>
            </div>
        </div>
    );
};

export default AffiliateOverview;
