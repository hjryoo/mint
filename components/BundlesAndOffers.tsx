import React, { useState } from 'react';
import { MOCK_BUNDLES_DATA, MOCK_COUPONS_DATA, MOCK_OFFERS_DATA } from '../constants';
import { Bundle, BundleStatus } from '../types';
import Icon from './Icon';
import CouponsTable from './CouponsTable';
import OffersTable from './OffersTable';

const BundleStatusChip: React.FC<{ status: BundleStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in BundleStatus]: string } = {
        Live: "bg-mint-100 text-mint-800",
        Draft: "bg-slate-100 text-slate-800",
        Expired: "bg-red-100 text-red-800",
        Scheduled: "bg-amber-100 text-amber-800",
    };
     const statusDotClasses: { [key in BundleStatus]: string } = {
        Live: "bg-mint-500",
        Draft: "bg-slate-400",
        Expired: "bg-red-400",
        Scheduled: "bg-amber-400",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};


const BundlesTable: React.FC<{ bundles: Bundle[] }> = ({ bundles }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bundle</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Savings</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Attach Rate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Conflicts</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {bundles.map((bundle) => (
                    <tr key={bundle.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{bundle.name}</div>
                            <div className="text-sm text-slate-500">{bundle.itemCount} items</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{bundle.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">${bundle.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-800">${bundle.savings.amount.toFixed(2)}</div>
                            <div className="text-sm text-slate-500">({bundle.savings.percentage}%)</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm text-slate-800">{bundle.attachRate7d}% <span className="text-slate-500">(7d)</span></div>
                            <div className="text-sm text-slate-500">{bundle.attachRate30d}% (30d)</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-800">${bundle.revenue7d.toLocaleString()} <span className="text-slate-500">(7d)</span></div>
                            <div className="text-sm text-slate-500">${bundle.revenue30d.toLocaleString()} (30d)</div>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <BundleStatusChip status={bundle.status} />
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            <div className="flex items-center">
                                {bundle.conflicts > 0 && <Icon name="exclamation-triangle" className="w-5 h-5 text-amber-600 mr-1.5" />}
                                <span className={bundle.conflicts > 0 ? 'text-amber-700 font-medium' : ''}>{bundle.conflicts}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100">
                                <Icon name="pencil" className="w-5 h-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const BundlesAndOffers: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Bundles');

    const tabs = ['Bundles', 'Coupons', 'Upsell & Cross-sell'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Bundles':
                return <BundlesTable bundles={MOCK_BUNDLES_DATA} />;
            case 'Coupons':
                return <CouponsTable coupons={MOCK_COUPONS_DATA} />;
            case 'Upsell & Cross-sell':
                return <OffersTable offers={MOCK_OFFERS_DATA} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-800">Bundles & Offers</h2>
                <p className="text-sm text-slate-500">Create and manage your product bundles, coupons, and offers.</p>
              </div>
              <div className="flex items-center space-x-2">
                 {activeTab === 'Bundles' && (
                    <>
                        <button className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                            Manage Conflicts
                        </button>
                        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center">
                            <Icon name="plus" className="w-5 h-5 mr-2 -ml-1" />
                            Create Bundle
                        </button>
                    </>
                 )}
                 {activeTab === 'Coupons' && (
                    <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center">
                        <Icon name="plus" className="w-5 h-5 mr-2 -ml-1" />
                        Create Coupon
                    </button>
                 )}
                 {activeTab === 'Upsell & Cross-sell' && (
                    <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center">
                        <Icon name="plus" className="w-5 h-5 mr-2 -ml-1" />
                        Create Offer
                    </button>
                 )}
              </div>
            </div>

            {/* Tabs */}
            <div>
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab
                                        ? 'border-mint-500 text-mint-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                                aria-current={activeTab === tab ? 'page' : undefined}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white shadow rounded-lg">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default BundlesAndOffers;