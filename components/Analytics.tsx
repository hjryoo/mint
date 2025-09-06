import React, { useState } from 'react';
import Icon from './Icon';
import AnalyticsOverview from './AnalyticsOverview';
import AnalyticsRevenue from './AnalyticsRevenue';
import AnalyticsAttribution from './AnalyticsAttribution';
import AnalyticsLTV from './AnalyticsLTV';
import AnalyticsFunnels from './AnalyticsFunnels';
import AnalyticsOffersImpact from './AnalyticsOffersImpact';

const AnalyticsPlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-center h-full bg-white rounded-lg shadow p-8 min-h-[400px]">
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-mint-100">
                <Icon name="analytics" className="h-6 w-6 text-mint-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold font-display text-slate-800">{title}</h1>
            <p className="mt-2 text-slate-500">This analytics view is under construction. Come back soon!</p>
        </div>
    </div>
);


const Analytics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = ['Overview', 'Revenue', 'Attribution', 'LTV & Retention', 'Funnels & Paths', 'Offers Impact'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <AnalyticsOverview />;
            case 'Revenue':
                return <AnalyticsRevenue />;
            case 'Attribution':
                return <AnalyticsAttribution />;
            case 'LTV & Retention':
                 return <AnalyticsLTV />;
            case 'Funnels & Paths':
                return <AnalyticsFunnels />;
            case 'Offers Impact':
                return <AnalyticsOffersImpact />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold font-display text-slate-800">Analytics</h2>
                <p className="text-sm text-slate-500">Unified views for channel attribution, product performance, and subscriber retention.</p>
            </div>

            {/* Global Toolbar */}
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3">
                    <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center">
                        <Icon name="calendar" className="w-4 h-4 mr-2" />
                        Last 30 days
                        <Icon name="chevron-down" className="w-4 h-4 ml-2" />
                    </button>
                    <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center">
                        <Icon name="compare" className="w-4 h-4 mr-2" />
                        Compare
                    </button>
                     <div className="h-6 w-px bg-slate-200"></div>
                     <button className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center">
                        Attribution: Last-touch
                        <Icon name="chevron-down" className="w-4 h-4 ml-2" />
                    </button>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                    <span className="text-slate-500">Currency: USD</span>
                    <div className="flex items-center text-slate-500">
                        <span className="relative flex h-2 w-2 mr-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-500"></span>
                        </span>
                        Last updated: 2m ago
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div>
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-shrink-0 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
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
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Analytics;