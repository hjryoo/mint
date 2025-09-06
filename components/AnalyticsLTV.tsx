import React from 'react';
import { MOCK_LTV_COHORT_DATA, MOCK_RETENTION_SURVIVAL_DATA } from '../constants';
import LTVCohortMatrix from './LTVCohortMatrix';
import RetentionSurvivalCurve from './RetentionSurvivalCurve';

const AnalyticsLTV: React.FC = () => {
    return (
        <div className="space-y-6">
            <LTVCohortMatrix data={MOCK_LTV_COHORT_DATA} />
            <RetentionSurvivalCurve data={MOCK_RETENTION_SURVIVAL_DATA} />
        </div>
    );
};

export default AnalyticsLTV;
