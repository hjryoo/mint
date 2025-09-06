import React from 'react';
import { AffiliatePartner } from '../types';
import AffiliateOverview from './AffiliateOverview';
import AffiliatePartnerDetail from './AffiliatePartnerDetail';

interface AffiliateMainContentProps {
    selectedPartner: AffiliatePartner | null;
    partners: AffiliatePartner[];
    onClearSelection: () => void;
}

const AffiliateMainContent: React.FC<AffiliateMainContentProps> = ({ selectedPartner, partners, onClearSelection }) => {
    return (
        <main className="flex-1 overflow-y-auto p-6">
            {!selectedPartner ? (
                <AffiliateOverview partners={partners} />
            ) : (
                <AffiliatePartnerDetail 
                    partner={selectedPartner} 
                    onBack={onClearSelection}
                />
            )}
        </main>
    );
};
export default AffiliateMainContent;
