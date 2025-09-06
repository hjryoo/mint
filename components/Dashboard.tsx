import React from 'react';
import { MOCK_KPI_DATA, MOCK_CHART_DATA, MOCK_TASKS_DATA, MOCK_NOTIFICATIONS_DATA } from '../constants';
import KpiCard from './KpiCard';
import SparklineChart from './SparklineChart';
import TasksWidget from './TasksWidget';
import NotificationsWidget from './NotificationsWidget';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Welcome back, Creator!</h2>
        <p className="mt-1 text-slate-500">Here's your performance snapshot for the last 30 days.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_KPI_DATA.map((kpi) => (
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
            <TasksWidget tasks={MOCK_TASKS_DATA} />
            <NotificationsWidget notifications={MOCK_NOTIFICATIONS_DATA} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
