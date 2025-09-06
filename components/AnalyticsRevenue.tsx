import React from 'react';
import RevenueChart from './RevenueChart';
import RevenueTable from './RevenueTable';
import { MOCK_REVENUE_CHART_DATA, MOCK_REVENUE_TABLE_DATA } from '../constants';

const AnalyticsRevenue: React.FC = () => {
    return (
        <div className="space-y-6">
            <RevenueChart data={MOCK_REVENUE_CHART_DATA} />
            <RevenueTable data={MOCK_REVENUE_TABLE_DATA} />
        </div>
    );
};

export default AnalyticsRevenue;
