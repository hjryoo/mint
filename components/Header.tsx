import React from 'react';
import Icon from './Icon';

interface HeaderProps {
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header className="bg-white shadow-sm flex-shrink-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-slate-900">{currentPage}</h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="search" className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-mint-500 focus:border-mint-500 sm:text-sm"
                    placeholder="Search..."
                />
            </div>
            <button
              type="button"
              className="p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500"
              aria-label="View notifications"
            >
              <Icon name="bell" className="h-6 w-6" />
            </button>
            <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
