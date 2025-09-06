import React from 'react';
import FunnelChart from './FunnelChart';
import PathingDiagram from './PathingDiagram';

const AnalyticsFunnels: React.FC = () => {
    return (
        <div className="space-y-6">
            <FunnelChart />
            <PathingDiagram />
        </div>
    );
};

export default AnalyticsFunnels;
