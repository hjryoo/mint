import React from 'react';
import { MOCK_ANALYTICS_KPI_DATA, MOCK_CHART_DATA } from '../constants';
import KpiCard from './KpiCard';
import SparklineChart from './SparklineChart';
import ProductHeatmap from './ProductHeatmap';

const AnalyticsOverview: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
                {MOCK_ANALYTICS_KPI_DATA.map((kpi) => (
                    <KpiCard key={kpi.title} data={kpi} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2">
                    <SparklineChart data={MOCK_CHART_DATA} />
                </div>

                {/* Side Widgets */}
                <div className="space-y-6">
                    <ProductHeatmap />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsOverview;
