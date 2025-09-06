import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';
import { ChartDataPoint } from '../types';

interface SparklineChartProps {
  data: ChartDataPoint[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-96">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Revenue by Channel</h3>
        <p className="text-sm text-slate-500 mb-4">Top 3 performing channels</p>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorYouTube" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
            </linearGradient>
             <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(5px)',
                border: '1px solid #e2e8f0', 
                borderRadius: '0.5rem' 
            }} 
          />
          <Legend wrapperStyle={{fontSize: "14px"}} />
          <Area type="monotone" dataKey="YouTube" stroke="#14b8a6" fillOpacity={1} fill="url(#colorYouTube)" strokeWidth={2} />
          <Area type="monotone" dataKey="TikTok" stroke="#64748b" fillOpacity={1} fill="url(#colorTikTok)" strokeWidth={2} />
           <Area type="monotone" dataKey="Instagram" stroke="#f59e0b" fillOpacity={1} fill="url(#colorInstagram)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;
