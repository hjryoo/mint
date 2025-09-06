import React from 'react';
import { MOCK_PRODUCTS_DATA } from '../constants';
import Icon from './Icon';

const getHeatColor = (revenue: number, maxRevenue: number) => {
    const percentage = maxRevenue > 0 ? revenue / maxRevenue : 0;
    if (percentage > 0.8) return 'bg-mint-600';
    if (percentage > 0.6) return 'bg-mint-500';
    if (percentage > 0.4) return 'bg-mint-400';
    if (percentage > 0.2) return 'bg-mint-300';
    return 'bg-mint-200';
};

const ProductHeatmap: React.FC = () => {
    const topProducts = MOCK_PRODUCTS_DATA
        .slice()
        .sort((a, b) => b.revenue30d - a.revenue30d)
        .slice(0, 5);
    
    const maxRevenue = topProducts.length > 0 ? topProducts[0].revenue30d : 0;

    return (
        <div className="bg-white p-4 rounded-lg shadow h-full">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Product Performance</h3>
            <p className="text-sm text-slate-500 mb-4">Top 5 products by revenue (30d)</p>
            <div className="space-y-3">
                {topProducts.map(product => (
                    <div key={product.id} className="flex items-center">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{product.name}</p>
                            <p className="text-sm text-slate-500">${product.revenue30d.toLocaleString()}</p>
                        </div>
                         <div className="w-2/5 h-2 bg-slate-100 rounded-full ml-3">
                             <div className={`${getHeatColor(product.revenue30d, maxRevenue)} h-full rounded-full`} style={{ width: `${maxRevenue > 0 ? (product.revenue30d / maxRevenue) * 100 : 0}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-4">
                <a href="#" className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-mint-700 bg-mint-100 hover:bg-mint-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
                    View all products
                </a>
            </div>
        </div>
    );
};

export default ProductHeatmap;
