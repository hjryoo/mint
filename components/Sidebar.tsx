import React from 'react';
import { NAV_ITEMS, SETTINGS_NAV_ITEMS } from '../constants';
import { NavItem } from '../types';
import Icon from './Icon';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const NavLink: React.FC<{ item: NavItem; isActive: boolean; onClick: () => void }> = ({ item, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`flex items-center p-2 text-base rounded-lg transition duration-75 group ${
        isActive
          ? 'bg-slate-700 text-white'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={isActive ? 'text-mint-400' : 'text-slate-400 group-hover:text-slate-300'}>
        {item.icon}
      </span>
      <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900 flex flex-col transition-width duration-300" aria-label="Sidebar">
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 px-4 flex items-center mb-5">
                <Icon name="dashboard" className="w-8 h-8 text-mint-500" />
                <span className="ml-2 text-2xl font-bold font-display text-white">SignalMint</span>
            </div>
            <nav className="px-2 space-y-1">
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.id} item={item} isActive={activePage === item.id} onClick={() => setActivePage(item.id)} />
                    ))}
                </ul>
            </nav>
        </div>
        <div className="flex-shrink-0 flex-col border-t border-slate-700 p-2">
            <nav className="px-2 space-y-1 mb-2">
                 <ul>
                    {SETTINGS_NAV_ITEMS.map((item) => (
                        <NavLink key={item.id} item={item} isActive={activePage === item.id} onClick={() => setActivePage(item.id)} />
                    ))}
                </ul>
            </nav>
            <div className="p-2 border-t border-slate-700">
                <a href="#" className="flex items-center group">
                    <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Solo Creator</p>
                        <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300">View profile</p>
                    </div>
                </a>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
