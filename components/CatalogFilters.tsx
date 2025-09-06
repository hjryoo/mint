import React from 'react';
import { MOCK_PRODUCTS_DATA } from '../constants';

const FilterCheckbox: React.FC<{ id: string, label: string, count: number }> = ({ id, label, count }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center">
            <input id={id} name={id} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500" />
            <label htmlFor={id} className="ml-3 text-sm text-slate-600">{label}</label>
        </div>
        <span className="text-xs text-slate-400">{count}</span>
    </div>
);

const CatalogFilters: React.FC = () => {
  const typeCounts = MOCK_PRODUCTS_DATA.reduce((acc, product) => {
    acc[product.type] = (acc[product.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusCounts = MOCK_PRODUCTS_DATA.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priceModelCounts = MOCK_PRODUCTS_DATA.reduce((acc, product) => {
    acc[product.priceModel] = (acc[product.priceModel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Filters</h3>
      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Type</h4>
          <div className="space-y-2">
            <FilterCheckbox id="filter-type-course" label="Course" count={typeCounts['Course'] || 0} />
            <FilterCheckbox id="filter-type-template" label="Template" count={typeCounts['Template'] || 0} />
            <FilterCheckbox id="filter-type-preset" label="Preset" count={typeCounts['Preset'] || 0} />
          </div>
        </div>
        
        {/* Status Filter */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Status</h4>
          <div className="space-y-2">
            <FilterCheckbox id="filter-status-published" label="Published" count={statusCounts['Published'] || 0} />
            <FilterCheckbox id="filter-status-draft" label="Draft" count={statusCounts['Draft'] || 0} />
            <FilterCheckbox id="filter-status-archived" label="Archived" count={statusCounts['Archived'] || 0} />
            <FilterCheckbox id="filter-status-scheduled" label="Scheduled" count={statusCounts['Scheduled'] || 0} />
          </div>
        </div>
        
        {/* Price Model Filter */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Price Model</h4>
          <div className="space-y-2">
            <FilterCheckbox id="filter-price-onetime" label="One-time" count={priceModelCounts['one-time'] || 0} />
            <FilterCheckbox id="filter-price-subscription" label="Subscription" count={priceModelCounts['subscription'] || 0} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CatalogFilters;