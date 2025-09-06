import React from 'react';
import { Product, ProductStatus } from '../types';
import Icon from './Icon';

interface CatalogTableProps {
  products: Product[];
  selectedProducts: Set<string>;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectProduct: (productId: string) => void;
  isAllSelected: boolean;
  sortConfig: { key: keyof Product | null; direction: 'ascending' | 'descending' };
  onSort: (key: keyof Product) => void;
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

const SortableHeader: React.FC<{
    columnKey: keyof Product;
    title: string;
    sortConfig: CatalogTableProps['sortConfig'];
    onSort: CatalogTableProps['onSort'];
    className?: string;
    textAlign?: 'left' | 'right';
}> = ({ columnKey, title, sortConfig, onSort, className = '', textAlign = 'left' }) => {
    const isSorted = sortConfig.key === columnKey;
    const buttonClasses = `flex items-center space-x-1 group ${textAlign === 'right' ? 'ml-auto' : ''}`;
    const headerClasses = `px-6 py-3 text-${textAlign} text-xs font-medium text-slate-500 uppercase tracking-wider ${className}`;
    
    return (
        <th scope="col" className={headerClasses}>
            <button onClick={() => onSort(columnKey)} className={buttonClasses}>
                <span>{title}</span>
                {isSorted ? (
                    sortConfig.direction === 'ascending' ? (
                        <Icon name="chevron-up" className="w-4 h-4 text-slate-600" />
                    ) : (
                        <Icon name="chevron-down" className="w-4 h-4 text-slate-600" />
                    )
                ) : (
                    <Icon name="chevron-down" className="w-4 h-4 text-slate-300 invisible group-hover:visible" />
                )}
            </button>
        </th>
    );
};


const CatalogTable: React.FC<CatalogTableProps> = ({ products, selectedProducts, onSelectAll, onSelectProduct, isAllSelected, sortConfig, onSort }) => {
    
  return (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="relative px-6 py-3">
                         <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                            checked={isAllSelected}
                            onChange={onSelectAll}
                         />
                    </th>
                    <SortableHeader columnKey="name" title="Product" sortConfig={sortConfig} onSort={onSort} />
                    <SortableHeader columnKey="status" title="Status" sortConfig={sortConfig} onSort={onSort} />
                    <SortableHeader columnKey="price" title="Price" sortConfig={sortConfig} onSort={onSort} textAlign="right" />
                    <SortableHeader columnKey="revenue30d" title="30d Revenue" sortConfig={sortConfig} onSort={onSort} textAlign="right" />
                    <SortableHeader columnKey="conversionRate" title="Conv. Rate" sortConfig={sortConfig} onSort={onSort} textAlign="right" />
                    <SortableHeader columnKey="attachRate" title="Attach Rate" sortConfig={sortConfig} onSort={onSort} textAlign="right" />
                    <SortableHeader columnKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} onSort={onSort} />
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {products.map((product) => (
                    <tr key={product.id} className={selectedProducts.has(product.id) ? 'bg-mint-50' : ''}>
                        <td className="relative px-6 py-4 whitespace-nowrap">
                            <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                                checked={selectedProducts.has(product.id)}
                                onChange={() => onSelectProduct(product.id)}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-md object-cover" src={product.coverUrl} alt={product.name} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-slate-900">{product.name}</div>
                                    <div className="text-sm text-slate-500">{product.type}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <StatusChip status={product.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-slate-900">${product.price.toFixed(2)}</div>
                            <div className="text-sm text-slate-500 capitalize">{product.priceModel}</div>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">${product.revenue30d.toLocaleString()}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{product.conversionRate}%</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{product.attachRate}%</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.lastUpdated}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-slate-400 hover:text-slate-600">
                                <Icon name="more-horizontal" className="w-5 h-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default CatalogTable;