import React from 'react';
import Icon from './Icon';

const AffiliatesPlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-center h-full bg-white rounded-lg p-8 min-h-[400px]">
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-mint-100">
                <Icon name="affiliates" className="h-6 w-6 text-mint-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold font-display text-slate-800">{title}</h1>
            <p className="mt-2 text-slate-500">This affiliate view is under construction. Come back soon!</p>
        </div>
    </div>
);

export default AffiliatesPlaceholder;
