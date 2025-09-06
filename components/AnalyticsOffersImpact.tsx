import React, { useState } from 'react';
import { MOCK_OFFER_IMPACT_DATA } from '../constants';
import { OfferImpactData } from '../types';
import OfferBoard from './OfferBoard';
import OfferComparison from './OfferComparison';

const AnalyticsOffersImpact: React.FC = () => {
    const [selectedOffer, setSelectedOffer] = useState<OfferImpactData>(MOCK_OFFER_IMPACT_DATA[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <OfferBoard
                    data={MOCK_OFFER_IMPACT_DATA}
                    selectedOfferId={selectedOffer.id}
                    onSelectOffer={setSelectedOffer}
                />
            </div>
            <div>
                <OfferComparison offer={selectedOffer} />
            </div>
        </div>
    );
};

export default AnalyticsOffersImpact;