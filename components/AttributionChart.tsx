import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, LabelList } from 'recharts';
import { AttributionData, AttributionModel } from '../types';

interface AttributionChartProps {
    data: AttributionData[];
    activeModel: AttributionModel;
}

const channelColors: { [key: string]: string } = {
    YouTube: '#ef4444',
    TikTok: '#0f172a',
    Instagram: '#f59e0b',
    Direct: '#64748b',
};

const AttributionChart: React.FC<AttributionChartProps> = ({ data, activeModel }) => {
    const chartData = data.map(item => ({
        channel: item.channel,
        revenue: item[activeModel],
        fill: channelColors[item.channel] || '#14b8a6'
    })).sort((a, b) => a.revenue - b.revenue);
    
    return (
        <div className="bg-white p-4 rounded-lg shadow h-[400px]">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Channel Contribution</h3>
            <p className="text-sm text-slate-500 mb-4">Revenue attributed by channel based on the selected model.</p>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <YAxis dataKey="channel" type="category" stroke="#64748b" fontSize={12} width={70} />
                    <Tooltip
                        cursor={{ fill: '#f1f5f9' }}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem'
                        }}
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" barSize={30}>
                        <LabelList 
                            dataKey="revenue" 
                            position="right" 
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                            style={{ fill: '#334155', fontSize: '12px', fontWeight: '500' }}
                         />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AttributionChart;
