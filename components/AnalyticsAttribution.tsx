import React, { useState } from 'react';
import { AttributionModel } from '../types';
import { MOCK_ATTRIBUTION_DATA, MOCK_CAMPAIGNS_DATA } from '../constants';
import AttributionChart from './AttributionChart';
import TopCampaignsTable from './TopCampaignsTable';

const AnalyticsAttribution: React.FC = () => {
    const [activeModel, setActiveModel] = useState<AttributionModel>('last-touch');

    const models: { id: AttributionModel; name: string; description: string }[] = [
        { id: 'first-touch', name: 'First-touch', description: 'Gives 100% of the credit to the first channel a customer interacted with.' },
        { id: 'last-touch', name: 'Last-touch', description: 'Gives 100% of the credit to the last channel a customer interacted with before purchasing.' },
        { id: 'time-decay', name: 'Time-decay', description: 'Gives more credit to touchpoints closer to the conversion. (7-day half-life)' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-slate-800">Model Selector</h3>
                    <p className="text-sm text-slate-500 mb-4">Choose a model to see how credit is distributed.</p>
                     <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
                        {models.map(model => (
                            <button
                                key={model.id}
                                onClick={() => setActiveModel(model.id)}
                                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all text-center ${activeModel === model.id ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {model.name}
                            </button>
                        ))}
                     </div>
                     <div className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                        <p><strong>{models.find(m => m.id === activeModel)?.name}:</strong> {models.find(m => m.id === activeModel)?.description}</p>
                     </div>
                </div>
                <AttributionChart data={MOCK_ATTRIBUTION_DATA} activeModel={activeModel} />
            </div>
            <div>
                <TopCampaignsTable campaigns={MOCK_CAMPAIGNS_DATA[activeModel]} modelName={models.find(m => m.id === activeModel)?.name || ''} />
            </div>
        </div>
    );
};

export default AnalyticsAttribution;
