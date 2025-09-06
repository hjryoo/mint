import React from 'react';
import { LTVCohortData } from '../types';
import Icon from './Icon';

interface LTVCohortMatrixProps {
    data: LTVCohortData[];
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

const LTVCohortMatrix: React.FC<LTVCohortMatrixProps> = ({ data }) => {
    const maxValue = Math.max(...data.flatMap(row => row.months.filter((val): val is number => val !== null)));
    
    const getHeatColor = (value: number | null) => {
        if (value === null) return 'bg-slate-50';
        const percentage = value / maxValue;
        if (percentage > 0.9) return 'bg-mint-600 text-white';
        if (percentage > 0.75) return 'bg-mint-500 text-white';
        if (percentage > 0.6) return 'bg-mint-400 text-mint-900';
        if (percentage > 0.4) return 'bg-mint-300 text-mint-900';
        if (percentage > 0.2) return 'bg-mint-200 text-mint-800';
        return 'bg-mint-100 text-mint-800';
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold font-display text-slate-800">LTV Cohort Matrix</h3>
                    <p className="text-sm text-slate-500">Cumulative average LTV per customer by acquisition month.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FilterDropdown label="Channel" options={['All Channels', 'YouTube', 'TikTok', 'Instagram']} />
                    <FilterDropdown label="Product" options={['All Products', 'Course', 'Template', 'Preset']} />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-center">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="p-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-left sticky left-0 bg-slate-50 z-10">
                                Acquisition<br />Cohort
                            </th>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <th key={i} className="p-3 text-xs font-medium text-slate-500 uppercase tracking-wider">M{i}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map((row) => (
                            <tr key={row.cohort} className="border-b border-slate-100 last:border-b-0">
                                <td className="p-3 font-medium text-slate-700 text-left sticky left-0 bg-white">
                                    {row.cohort}
                                    <div className="text-xs text-slate-400">{row.users} users</div>
                                </td>
                                {row.months.map((value, i) => (
                                    <td key={i} className={`p-3 font-mono transition-colors ${getHeatColor(value)}`}>
                                        {value !== null ? `$${value.toFixed(2)}` : '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LTVCohortMatrix;
