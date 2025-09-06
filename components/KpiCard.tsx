import React from 'react';
import { KpiData } from '../types';
import Icon from './Icon';

interface KpiCardProps {
  data: KpiData;
}

const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const isIncrease = data.changeType === 'increase';
  const changeColor = isIncrease ? 'text-mint-600' : 'text-red-600';

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="bg-mint-100 p-3 rounded-lg">
              <span className="text-mint-600">{data.icon}</span>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-slate-500 truncate">{data.title}</dt>
              <dd>
                <div className="text-2xl font-bold text-slate-900">{data.value}</div>
                <div className={`text-sm font-medium ${changeColor} flex items-center`}>
                   {isIncrease ? 
                     <Icon name="chevron-up" className="w-4 h-4 mr-1"/> : 
                     <Icon name="chevron-down" className="w-4 h-4 mr-1"/>}
                  <span>{data.change}</span>
                  <span className="ml-2 text-slate-500 font-normal">vs last month</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
