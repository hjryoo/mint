import React, { useState } from 'react';
import { MOCK_AFFILIATES_DATA } from '../constants';
import { AffiliatePartner } from '../types';
import AffiliatePartnerList from './AffiliatePartnerList';
import AffiliateMainContent from './AffiliateMainContent';
import Icon from './Icon';

const Affiliates: React.FC = () => {
    const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

    const selectedPartner = MOCK_AFFILIATES_DATA.find(p => p.id === selectedPartnerId) || null;
    const totalPendingPayouts = MOCK_AFFILIATES_DATA.reduce((acc, p) => acc + p.unpaidCommission, 0);

    return (
        <div className="h-full flex flex-col bg-slate-50">
            <header className="flex-shrink-0 bg-white border-b border-slate-200">
                <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                     <div>
                        <h2 className="text-2xl font-bold font-display text-slate-800">Affiliates</h2>
                        <p className="text-sm text-slate-500">Recruit partners, manage links, and run payouts.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                         <button className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                            Payout Queue
                         </button>
                         <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center">
                            <Icon name="plus" className="w-5 h-5 mr-2 -ml-1" />
                            Invite Partner
                         </button>
                      </div>
                </div>
            </header>
            
            <div className="flex-1 flex overflow-hidden">
                <AffiliatePartnerList
                    partners={MOCK_AFFILIATES_DATA}
                    selectedPartnerId={selectedPartnerId}
                    onSelectPartner={setSelectedPartnerId}
                />
                <AffiliateMainContent
                    selectedPartner={selectedPartner}
                    partners={MOCK_AFFILIATES_DATA}
                    onClearSelection={() => setSelectedPartnerId(null)}
                />
            </div>
            
            <footer className="flex-shrink-0 bg-white border-t border-slate-200 px-4 h-10 flex items-center justify-between text-xs text-slate-500">
                <div>
                    <span><span className="font-semibold text-slate-700">{MOCK_AFFILIATES_DATA.filter(p => p.status === 'Active').length}</span> Active Affiliates</span>
                    <span className="mx-2">|</span>
                    <span>Pending Payouts: <span className="font-semibold text-slate-700">${totalPendingPayouts.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></span>
                </div>
                <div>
                    Last sync: Just now
                </div>
            </footer>
        </div>
    );
};

export default Affiliates;
