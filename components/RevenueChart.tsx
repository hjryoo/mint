import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

interface RevenueChartDataPoint {
    name: string;
    oneTime: number;
    subscription: number;
    couponImpact: number;
    upsellLift: number;
    bundleShare: number;
}

interface RevenueChartProps {
  data: RevenueChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const totalRevenue = data.oneTime + data.subscription;
        return (
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200 text-sm">
                <p className="font-bold text-slate-800 mb-2">{label}</p>
                <p className="text-slate-700 font-semibold">Total Revenue: ${totalRevenue.toLocaleString()}</p>
                <ul className="mt-2 space-y-1">
                    <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-mint-500 mr-2"></span>One-time: ${data.oneTime.toLocaleString()}</li>
                    <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span>Subscription: ${data.subscription.toLocaleString()}</li>
                </ul>
                <div className="border-t border-slate-200 my-2"></div>
                <p className="text-slate-500 text-xs font-semibold uppercase mb-1">Impact Details</p>
                 <ul className="text-xs space-y-1 text-slate-500">
                    <li>Coupon Impact: ${data.couponImpact.toLocaleString()}</li>
                    <li>Upsell Lift: ${data.upsellLift.toLocaleString()}</li>
                    <li>Bundle Share: ${data.bundleShare.toLocaleString()}</li>
                </ul>
            </div>
        );
    }
    return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-[450px]">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">One-time vs. Subscription Revenue</h3>
        <p className="text-sm text-slate-500 mb-4">Revenue decomposition over time.</p>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorOneTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSubscription" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          {/* FIX: Removed the `payload` prop from the Legend component. Recharts automatically generates the legend from the `name` prop on child elements like `Area`, making the explicit payload redundant and causing a type error. */}
          <Legend wrapperStyle={{fontSize: "14px"}} />
          <Area type="monotone" dataKey="oneTime" stackId="1" name="One-time" stroke="#14b8a6" fill="url(#colorOneTime)" strokeWidth={2} />
          <Area type="monotone" dataKey="subscription" stackId="1" name="Subscription" stroke="#64748b" fill="url(#colorSubscription)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;