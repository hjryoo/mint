import React from 'react';
import { Customer, RiskScore } from '../types';
import Icon from './Icon';

interface CustomersTableProps {
  customers: Customer[];
  selectedCustomers: Set<string>;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectCustomer: (customerId: string) => void;
  onViewCustomer: (customer: Customer) => void;
  isAllSelected: boolean;
}

const RiskScoreIndicator: React.FC<{ score: RiskScore }> = ({ score }) => {
    const scoreClasses = {
        Low: "bg-mint-100 text-mint-800",
        Medium: "bg-amber-100 text-amber-800",
        High: "bg-red-100 text-red-800",
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-md ${scoreClasses[score]}`}>{score}</span>
}

const CustomersTable: React.FC<CustomersTableProps> = ({ customers, selectedCustomers, onSelectAll, onSelectCustomer, onViewCustomer, isAllSelected }) => {
    
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">First Channel</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">LTV</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Orders</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Active Subs</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Seen</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tags</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {customers.map((customer) => (
                    <tr 
                        key={customer.id} 
                        className={`cursor-pointer transition-colors ${selectedCustomers.has(customer.id) ? 'bg-mint-50' : 'hover:bg-slate-50'}`}
                        onClick={() => onViewCustomer(customer)}
                    >
                        <td className="relative px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-mint-600 focus:ring-mint-500"
                                checked={selectedCustomers.has(customer.id)}
                                onChange={() => onSelectCustomer(customer.id)}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full object-cover" src={customer.avatarUrl} alt={customer.name} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-slate-900 flex items-center">
                                        {customer.name}
                                        {/* FIX: Wrapped Icon in a span with a title to fix prop type error while preserving tooltip. */}
                                        {customer.refundFlag && <span title="Has refunds"><Icon name="exclamation-triangle" className="w-4 h-4 text-red-500 ml-2" /></span>}
                                    </div>
                                    <div className="text-sm text-slate-500">{customer.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{customer.firstChannel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">${customer.ltv.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">{customer.ordersCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">{customer.activeSubs}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{customer.lastSeen}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500"><RiskScoreIndicator score={customer.riskScore} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            <div className="flex flex-wrap gap-1">
                                {customer.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                                ))}
                                {customer.tags.length > 2 && <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">+{customer.tags.length - 2}</span>}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default CustomersTable;