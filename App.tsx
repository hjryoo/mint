
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Catalog from './components/Catalog';
import BundlesAndOffers from './components/BundlesAndOffers';
import Storefront from './components/Storefront';
import Customers from './components/Customers';
import Analytics from './components/Analytics';
import Affiliates from './components/Affiliates';
import PayoutsAndFinance from './components/PayoutsAndFinance';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Catalog':
        return <Catalog />;
      case 'Bundles & Offers':
        return <BundlesAndOffers />;
      case 'Storefront':
        return <Storefront />;
      case 'Customers':
        return <Customers />;
      case 'Analytics':
        return <Analytics />;
      case 'Affiliates':
        return <Affiliates />;
      case 'Payouts & Finance':
        return <PayoutsAndFinance />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-mint-100">
                <svg className="h-6 w-6 text-mint-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {/* FIX: Completed the SVG path data which was truncated. */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-slate-900">Page Not Found</h3>
              <p className="mt-2 text-sm text-slate-500">
                The page you are looking for does not exist.
              </p>
            </div>
          </div>
        );
    }
  };

  // FIX: Added a return statement for the App component to render the layout and its content. This fixes the error where the component implicitly returned 'void' instead of a ReactNode.
  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={activePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// FIX: Added a default export for the App component. This fixes the import error in index.tsx.
export default App;
