import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Product, ProductStatus } from '../types';
import Icon from './Icon';

interface CatalogCardsProps {
  products: Product[];
  selectedProducts: Set<string>;
  onSelectProduct: (productId: string) => void;
}

const StatusChip: React.FC<{ status: ProductStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-block";
    const statusClasses = {
        Published: "bg-mint-100 text-mint-800",
        Draft: "bg-slate-100 text-slate-800",
        Archived: "bg-red-100 text-red-800",
        Scheduled: "bg-amber-100 text-amber-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const ProductCard: React.FC<{ product: Product, isSelected: boolean, onSelect: () => void }> = ({ product, isSelected, onSelect }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border ${isSelected ? 'border-mint-500 ring-2 ring-mint-500' : 'border-transparent'}`}>
        <div className="relative">
            <img className="h-40 w-full object-cover" src={product.coverUrl} alt={product.name} />
            <input 
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="absolute top-3 left-3 h-5 w-5 rounded border-slate-300 text-mint-600 focus:ring-mint-500 bg-white bg-opacity-50"
            />
             <button className="absolute top-3 right-3 p-1.5 bg-white bg-opacity-75 rounded-full text-slate-500 hover:bg-opacity-100 hover:text-slate-800">
                 <Icon name="more-horizontal" className="w-5 h-5"/>
             </button>
        </div>
        <div className="p-4">
            <h4 className="text-base font-semibold text-slate-800 truncate">{product.name}</h4>
            <div className="flex justify-between items-center mt-2">
                <StatusChip status={product.status} />
                <div className="text-base font-bold text-slate-900">${product.price.toFixed(2)}</div>
            </div>
        </div>
        <div className="h-20 px-2">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={product.sales7d} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id={`colorSales-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="sales" stroke="#14b8a6" fill={`url(#colorSales-${product.id})`} strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);


const CatalogCards: React.FC<CatalogCardsProps> = ({ products, selectedProducts, onSelectProduct }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    isSelected={selectedProducts.has(product.id)}
                    onSelect={() => onSelectProduct(product.id)}
                />
            ))}
        </div>
    </div>
  );
};

export default CatalogCards;