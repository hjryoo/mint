import React from 'react';
import { Customer, CustomerTimelineEvent } from '../types';
import Icon from './Icon';

interface CustomerProfileDrawerProps {
    customer: Customer | null;
    isOpen: boolean;
    onClose: () => void;
}

const TimelineEvent: React.FC<{ event: CustomerTimelineEvent }> = ({ event }) => (
    <div className="flex items-start space-x-4">
        <div className="bg-slate-100 p-2 rounded-full">
            <Icon name={event.icon} className="w-5 h-5 text-slate-500" />
        </div>
        <div className="flex-1">
            <p className="font-medium text-sm text-slate-800">{event.title}</p>
            <p className="text-sm text-slate-500">{event.description}</p>
            <p className="text-xs text-slate-400 mt-1">{event.timestamp}</p>
        </div>
    </div>
);

const CustomerProfileDrawer: React.FC<CustomerProfileDrawerProps> = ({ customer, isOpen, onClose }) => {
    if (!customer) return null;

    const riskScoreClasses = {
        Low: "bg-mint-100 text-mint-800",
        Medium: "bg-amber-100 text-amber-800",
        High: "bg-red-100 text-red-800",
    }

    const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
        <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-lg font-bold text-slate-800">{value}</p>
        </div>
    );
    
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div 
                className={`fixed top-0 right-0 h-full bg-white w-full max-w-2xl shadow-2xl z-50 transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="customer-profile-title"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <header className="flex-shrink-0 p-6 border-b border-slate-200">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={customer.avatarUrl} alt={customer.name} className="w-16 h-16 rounded-full"/>
                                <div>
                                    <h2 id="customer-profile-title" className="text-2xl font-bold font-display text-slate-800">{customer.name}</h2>
                                    <p className="text-slate-500">{customer.email}</p>
                                    <p className="text-sm text-slate-400">{customer.location}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                                <Icon name="x-mark" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                             {customer.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md font-medium">{tag}</span>
                            ))}
                            <span className={`px-2 py-1 text-xs rounded-md font-medium ${riskScoreClasses[customer.riskScore]}`}>Risk: {customer.riskScore}</span>
                        </div>
                         <div className="mt-4 flex items-center space-x-2">
                            <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="refund" className="w-4 h-4 mr-2" /> Refund</button>
                            <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="key" className="w-4 h-4 mr-2" /> Grant Access</button>
                            <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center"><Icon name="offers" className="w-4 h-4 mr-2" /> Issue Coupon</button>
                        </div>
                    </header>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                         {/* Monetization Summary */}
                         <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Monetization</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard label="Lifetime Value" value={`$${customer.ltv.toFixed(2)}`} />
                                <StatCard label="Orders" value={customer.ordersCount} />
                                <StatCard label="Active Subscriptions" value={customer.activeSubs} />
                                <StatCard label="AOV" value={`$${customer.ordersCount > 0 ? (customer.ltv / customer.ordersCount).toFixed(2) : '0.00'}`} />
                            </div>
                         </div>
                        
                        {/* Timeline */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Timeline</h3>
                            <div className="space-y-6 border-l-2 border-slate-200 ml-4 pl-8 relative">
                                {customer.timeline.map(event => (
                                     <TimelineEvent key={event.id} event={event} />
                                ))}
                            </div>
                        </div>

                        {/* Subscriptions */}
                        {customer.subscriptions.length > 0 && (
                             <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Subscriptions</h3>
                                <ul className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
                                    {customer.subscriptions.map(sub => (
                                        <li key={sub.id} className="p-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-slate-800">{sub.productName}</p>
                                                <p className="text-sm text-slate-500">${sub.price}/mo &bull; Renews {sub.nextRenewal}</p>
                                            </div>
                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-mint-100 text-mint-800">{sub.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Products */}
                        {customer.products.length > 0 && (
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Products Owned</h3>
                                <ul className="space-y-2">
                                    {customer.products.map(prod => (
                                        <li key={prod.id} className="p-3 bg-slate-50 rounded-md flex justify-between items-center">
                                            <p className="font-medium text-slate-700">{prod.name}</p>
                                            <span className="text-xs text-slate-500">{prod.type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerProfileDrawer;