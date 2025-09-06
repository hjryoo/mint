import React from 'react';
import { Notification } from '../types';

interface NotificationsWidgetProps {
  notifications: Notification[];
}

const NotificationsWidget: React.FC<NotificationsWidgetProps> = ({ notifications }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start">
            <div className="flex-shrink-0">{notification.icon}</div>
            <div className="ml-3">
              <p className="text-sm text-slate-700">{notification.message}</p>
              <p className="text-xs text-slate-400">{notification.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <a href="#" className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-mint-700 bg-mint-100 hover:bg-mint-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
          View all
        </a>
      </div>
    </div>
  );
};

export default NotificationsWidget;
