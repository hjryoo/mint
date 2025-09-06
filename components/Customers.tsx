import React, { useState } from 'react';
import { MOCK_CUSTOMERS_DATA, MOCK_SEGMENTS_DATA } from '../constants';
import { Customer, Segment } from '../types';
import CustomersTable from './CustomersTable';
import CustomerProfileDrawer from './CustomerProfileDrawer';
import Icon from './Icon';

const SegmentCard: React.FC<{ segment: Segment }> = ({ segment }) => (
    <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-1">
            <h4 className="font-semibold text-slate-800">{segment.name}</h4>
            <p className="text-sm text-slate-500 mt-1 flex-grow">{segment.description}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mt-4 border-t border-slate-200 pt-4">
            <div>
                <p className="text-xs text-slate-500">Members</p>
                <p className="text-lg font-bold text-slate-800">{segment.memberCount}</p>
            </div>
            <div>
                <p className="text-xs text-slate-500">Revenue</p>
                <p className="text-lg font-bold text-slate-800">${segment.revenue.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-xs text-slate-500">AOV</p>
                <p className="text-lg font-bold text-slate-800">${segment.aov.toFixed(2)}</p>
            </div>
        </div>
        <div className="mt-4">
            {segment.isTemplate ? (
                <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700">
                    Use template
                </button>
            ) : (
                <div className="flex items-center space-x-2">
                    <button className="flex-1 px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                        Edit
                    </button>
                    <button className="p-2 border border-slate-300 rounded-md text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-700">
                        <Icon name="document-duplicate" className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    </div>
);


const SegmentsView: React.FC = () => {
    const templates = MOCK_SEGMENTS_DATA.filter(s => s.isTemplate);
    const customSegments = MOCK_SEGMENTS_DATA.filter(s => !s.isTemplate);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50 h-full">
            <div>
                <h3 className="text-xl font-bold font-display text-slate-800">Templates</h3>
                <p className="text-sm text-slate-500 mt-1">Kickstart your audience building with pre-made segments.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                    {templates.map(segment => <SegmentCard key={segment.id} segment={segment} />)}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold font-display text-slate-800">Your Segments</h3>
                <p className="text-sm text-slate-500 mt-1">Segments you have created and saved.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                    {customSegments.map(segment => <SegmentCard key={segment.id} segment={segment} />)}
                </div>
            </div>
        </div>
    );
};

const Customers: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Audience');
    const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
    const [viewedCustomer, setViewedCustomer] = useState<Customer | null>(null);
    const isProfileDrawerOpen = !!viewedCustomer;

    const tabs = ['Audience', 'Segments'];

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedCustomers(new Set(MOCK_CUSTOMERS_DATA.map(c => c.id)));
        } else {
            setSelectedCustomers(new Set());
        }
    };

    const handleSelectCustomer = (customerId: string) => {
        const newSelection = new Set(selectedCustomers);
        if (newSelection.has(customerId)) {
            newSelection.delete(customerId);
        } else {
            newSelection.add(customerId);
        }
        setSelectedCustomers(newSelection);
    };
    
    const handleViewCustomer = (customer: Customer) => {
        setViewedCustomer(customer);
    };

    const handleCloseDrawer = () => {
        setViewedCustomer(null);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab !== 'Audience') {
            setSelectedCustomers(new Set());
        }
    };

    const numSelected = selectedCustomers.size;
    const numCustomers = MOCK_CUSTOMERS_DATA.length;
    const isAllSelected = numSelected === numCustomers && numCustomers > 0;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Audience':
                return (
                    <CustomersTable
                        customers={MOCK_CUSTOMERS_DATA}
                        selectedCustomers={selectedCustomers}
                        onSelectAll={handleSelectAll}
                        onSelectCustomer={handleSelectCustomer}
                        onViewCustomer={handleViewCustomer}
                        isAllSelected={isAllSelected}
                    />
                );
            case 'Segments':
                return <SegmentsView />;
            default:
                return null;
        }
    };

    const QuickFilterChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <button className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
            {children}
        </button>
    );

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold font-display text-slate-800">Customers</h2>
                        <p className="text-sm text-slate-500">Manage and segment your audience.</p>
                    </div>
                     <div className="flex items-center space-x-2">
                         <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center">
                            <Icon name="plus" className="w-5 h-5 mr-2 -ml-1" />
                            Create Segment
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <QuickFilterChip>New buyers</QuickFilterChip>
                        <QuickFilterChip>High LTV</QuickFilterChip>
                        <QuickFilterChip>Churn risk</QuickFilterChip>
                        <QuickFilterChip>Subscribers</QuickFilterChip>
                    </div>
                     <div className="relative w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="search" className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                            placeholder="Search customers..."
                        />
                    </div>
                </div>

            </div>

            {/* Tabs */}
            <div className="flex-shrink-0">
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab)}
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

            {/* Content */}
             <div className="flex-1 flex flex-col overflow-hidden relative">
                {numSelected > 0 && activeTab === 'Audience' && (
                    <div className="absolute top-0 left-0 right-0 z-10 bg-slate-100 p-2 border-b border-slate-200">
                        <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
                            <span className="text-sm font-medium text-slate-700">{numSelected} selected</span>
                            <div className="space-x-2">
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Add Tag</button>
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Issue Coupon</button>
                                <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Export</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`shadow rounded-lg flex-1 overflow-y-auto ${numSelected > 0 && activeTab === 'Audience' ? 'mt-12' : ''}`}>
                    {renderTabContent()}
                </div>
            </div>

            <CustomerProfileDrawer customer={viewedCustomer} isOpen={isProfileDrawerOpen} onClose={handleCloseDrawer} />

        </div>
    );
};

export default Customers;