import React from 'react';
import { CampaignPerformance, Channel } from '../types';
import Icon from './Icon';

interface TopCampaignsTableProps {
    campaigns: CampaignPerformance[];
    modelName: string;
}

const channelIconMap: Record<Channel, string> = {
    YouTube: 'youtube',
    TikTok: 'tiktok',
    Instagram: 'instagram',
    Direct: 'direct',
};

const channelColorMap: Record<Channel, string> = {
    YouTube: 'text-red-500',
    TikTok: 'text-slate-800',
    Instagram: 'text-amber-500',
    Direct: 'text-slate-500',
};

const TopCampaignsTable: React.FC<TopCampaignsTableProps> = ({ campaigns, modelName }) => {
    return (
        <div className="bg-white shadow rounded-lg h-full">
            <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">Top Converting Campaigns</h3>
                <p className="text-sm text-slate-500">Based on <span className="font-semibold text-mint-700">{modelName}</span> model.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Campaign</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Conv.</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-slate-50">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Icon name={channelIconMap[campaign.channel]} className={`w-5 h-5 mr-3 flex-shrink-0 ${channelColorMap[campaign.channel]}`} />
                                        <div className="min-w-0">
                                            <div className="text-sm font-medium text-slate-900 truncate">{campaign.name}</div>
                                            <div className="text-sm text-slate-500">{campaign.channel}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-800">${campaign.revenue.toLocaleString()}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-slate-500">{campaign.conversions.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="p-2">
                     <a href="#" className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-mint-700 bg-mint-50 hover:bg-mint-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
                        View all campaigns
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TopCampaignsTable;
