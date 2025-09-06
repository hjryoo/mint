import React, { useState } from 'react';
import { RevenueTableItem } from '../types';
import Icon from './Icon';

interface RevenueTableProps {
  data: RevenueTableItem[];
}

const RevenueTable: React.FC<RevenueTableProps> = ({ data }) => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedItems(new Set(data.map(p => p.id)));
        } else {
            setSelectedItems(new Set());
        }
    };

    const handleSelectItem = (itemId: string) => {
        const newSelection = new Set(selectedItems);
        if (newSelection.has(itemId)) {
            newSelection.delete(itemId);
        } else {
            newSelection.add(itemId);
        }
        setSelectedItems(newSelection);
    };

    const numSelected = selectedItems.size;
    const numItems = data.length;
    const isAllSelected = numSelected === numItems && numItems > 0;

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Revenue Breakdown</h3>
                    <p className="text-sm text-slate-500">By product and bundle.</p>
                </div>
                {numSelected > 0 ? (
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 font-medium">{numSelected} selected</span>
                        <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center">
                            <Icon name="star" className="w-4 h-4 mr-2" />
                            Feature
                        </button>
                        <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center">
                            <Icon name="pause" className="w-4 h-4 mr-2" />
                            Pause
                        </button>
                    </div>
                ) : (
                    <div className="relative w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="search" className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                            placeholder="Search products/bundles..."
                        />
                    </div>
                )}
            </div>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="relative px-6 py-3">
                                <input
                                    type="checkbox"
                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product / Bundle</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Discounts</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Refunds</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Net</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Attach Rate</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {data.map((item) => (
                            <tr key={item.id} className={selectedItems.has(item.id) ? 'bg-mint-50' : ''}>
                                <td className="relative px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                                        checked={selectedItems.has(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{item.name}</div>
                                    <div className="text-sm text-slate-500">{item.type}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">${item.revenue.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">-${item.discounts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-500">-${item.refunds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-slate-800">${item.net.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">{item.attachRate.toFixed(1)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RevenueTable;
