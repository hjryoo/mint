import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS_DATA } from '../constants';
import CatalogFilters from './CatalogFilters';
import CatalogTable from './CatalogTable';
import CatalogCards from './CatalogCards';
import Icon from './Icon';
import { Product } from '../types';

const Catalog: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product | null; direction: 'ascending' | 'descending' }>({
    key: 'revenue30d',
    direction: 'descending',
  });

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(new Set(MOCK_PRODUCTS_DATA.map(p => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const handleSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const parseRelativeDate = (dateString: string): number => {
    const lowerCaseDate = dateString.toLowerCase();
    if (lowerCaseDate === 'yesterday') return 1;
  
    const value = parseInt(lowerCaseDate, 10) || 0;
  
    if (lowerCaseDate.includes('hour')) return value / 24;
    if (lowerCaseDate.includes('day')) return value;
    if (lowerCaseDate.includes('week')) return value * 7;
    if (lowerCaseDate.includes('month')) return value * 30;
    
    return Infinity;
  };

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...MOCK_PRODUCTS_DATA];
    if (sortConfig.key) {
        const { key, direction } = sortConfig;
        sortableProducts.sort((a, b) => {
            let valA = a[key];
            let valB = b[key];

            if (key === 'lastUpdated') {
                valA = parseRelativeDate(a.lastUpdated);
                valB = parseRelativeDate(b.lastUpdated);
            }

            if (valA < valB) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (valA > valB) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }
    return sortableProducts;
  }, [sortConfig]);

  const numSelected = selectedProducts.size;
  const numProducts = MOCK_PRODUCTS_DATA.length;
  const isAllSelected = numSelected === numProducts && numProducts > 0;

  return (
    <div className="flex h-full">
      <CatalogFilters />
      <div className="flex-1 flex flex-col">
        {/* Header/Actions */}
        <div className="flex-shrink-0 bg-slate-50 border-b border-slate-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-800">Catalog</h2>
                <p className="text-sm text-slate-500">{numProducts} products</p>
              </div>
              <div className="flex items-center space-x-2">
                 <div className="flex items-center bg-slate-200 rounded-lg p-0.5">
                    <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm' : 'text-slate-500 hover:bg-slate-300'}`}>
                        <Icon name="table-cells" className="w-5 h-5" />
                    </button>
                    <button onClick={() => setViewMode('cards')} className={`p-1.5 rounded-md ${viewMode === 'cards' ? 'bg-white shadow-sm' : 'text-slate-500 hover:bg-slate-300'}`}>
                        <Icon name="squares-2x2" className="w-5 h-5" />
                    </button>
                 </div>
                 <button className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                    Add to bundle
                 </button>
                 <button className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                    Create coupon
                 </button>
                 <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700">
                    New product
                 </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
            {viewMode === 'table' ? (
                <CatalogTable 
                    products={sortedProducts} 
                    selectedProducts={selectedProducts}
                    onSelectAll={handleSelectAll}
                    onSelectProduct={handleSelectProduct}
                    isAllSelected={isAllSelected}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />
            ) : (
                 <CatalogCards
                    products={sortedProducts}
                    selectedProducts={selectedProducts}
                    onSelectProduct={handleSelectProduct}
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;