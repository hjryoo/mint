import React, { useState } from 'react';
import Icon from './Icon';
import { ThemeSettings } from '../types';

type Viewport = 'desktop' | 'tablet' | 'mobile';
type EditorTab = 'Theme' | 'Pages' | 'Sections';

// Mock Data
const MOCK_PAGES = [
    { id: 'home', name: 'Home', type: 'system' },
    { id: 'catalog', name: 'Catalog', type: 'system' },
    { id: 'about', name: 'About', type: 'custom' },
    { id: 'faq', name: 'FAQ', type: 'custom' },
    { id: 'policy', name: 'Policy Pages', type: 'system' },
];

const MOCK_SECTIONS = {
    home: [
        { id: 'hero', name: 'Hero' },
        { id: 'featured', name: 'Featured Bundle' },
        { id: 'grid', name: 'Product Grid' },
        { id: 'testimonials', name: 'Testimonials' },
        { id: 'email', name: 'Email Capture' },
    ],
    catalog: [
        { id: 'header', name: 'Catalog Header' },
        { id: 'filters', name: 'Filters' },
        { id: 'product-grid', name: 'Product Grid' },
    ]
};

const Storefront: React.FC = () => {
    const [theme, setTheme] = useState<ThemeSettings>({
        primaryColor: '#14b8a6', // mint-500
        headlineFont: 'Plus Jakarta Sans',
        bodyFont: 'Inter',
    });
    const [viewport, setViewport] = useState<Viewport>('desktop');
    const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('Theme');
    const [environment, setEnvironment] = useState<'Draft' | 'Live'>('Draft');

    const viewportClasses: Record<Viewport, string> = {
        desktop: 'w-full',
        tablet: 'w-[768px]',
        mobile: 'w-[375px]',
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(prev => ({ ...prev, primaryColor: e.target.value }));
    };
    
    const handleFontChange = (type: 'headline' | 'body', font: string) => {
        setTheme(prev => ({...prev, [`${type}Font`]: font}));
    }

    const EditorPanel = () => (
        <div className="w-[350px] bg-white flex-shrink-0 border-r border-slate-200 flex flex-col" style={{'--primary-color': theme.primaryColor} as React.CSSProperties}>
            <div className="flex-shrink-0 border-b border-slate-200">
                <nav className="flex space-x-1 p-1.5" aria-label="Tabs">
                    {(['Theme', 'Pages', 'Sections'] as EditorTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveEditorTab(tab)}
                            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeEditorTab === tab
                                    ? 'bg-slate-100 text-slate-800'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                           <Icon name={tab.toLowerCase()} className="w-5 h-5 mr-2" />
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                {activeEditorTab === 'Theme' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Theme</h3>
                            <p className="text-sm text-slate-500">Customize your storefront's look and feel.</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                                <div className="relative">
                                    <input type="text" value={theme.primaryColor} onChange={handleColorChange} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-mint-500 focus:border-mint-500" />
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-slate-200" style={{backgroundColor: theme.primaryColor}}>
                                        <input type="color" value={theme.primaryColor} onChange={handleColorChange} className="opacity-0 w-full h-full cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Typography</label>
                                <div className="space-y-2">
                                     <select value={theme.headlineFont} onChange={(e) => handleFontChange('headline', e.target.value)} className="w-full py-2 px-3 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-mint-500 focus:border-mint-500">
                                        <option>Plus Jakarta Sans</option>
                                        <option>Inter</option>
                                        <option>Montserrat</option>
                                    </select>
                                    <select value={theme.bodyFont} onChange={(e) => handleFontChange('body', e.target.value)} className="w-full py-2 px-3 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-mint-500 focus:border-mint-500">
                                        <option>Inter</option>
                                        <option>Lato</option>
                                        <option>Roboto</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                 {activeEditorTab === 'Pages' && (
                    <div className="space-y-4">
                         <div>
                            <h3 className="text-lg font-semibold text-slate-800">Pages</h3>
                            <p className="text-sm text-slate-500">Manage your storefront's pages.</p>
                        </div>
                        <ul className="space-y-1">
                           {MOCK_PAGES.map(page => (
                               <li key={page.id} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 cursor-pointer transition-colors">
                                   <span className="text-sm font-medium text-slate-700">{page.name}</span>
                                   <Icon name="chevron-right" className="w-5 h-5 text-slate-400" />
                               </li>
                           ))}
                        </ul>
                    </div>
                )}
                 {activeEditorTab === 'Sections' && (
                     <div className="space-y-4">
                         <div>
                            <h3 className="text-lg font-semibold text-slate-800">Sections on Home</h3>
                            <p className="text-sm text-slate-500">Drag and drop to build your page.</p>
                        </div>
                         <ul className="space-y-2">
                           {(MOCK_SECTIONS['home' as keyof typeof MOCK_SECTIONS] || []).map(section => (
                               <li key={section.id} className="flex items-center p-3 rounded-md border border-slate-200 bg-white shadow-sm cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md">
                                    <Icon name="grip-vertical" className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                                   <span className="text-sm font-medium text-slate-700 flex-1">{section.name}</span>
                               </li>
                           ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    const PreviewPanel = () => (
        <div className="flex-1 bg-slate-200 flex flex-col items-center justify-start p-4 sm:p-8 overflow-auto">
            <div className={`transition-all duration-300 ease-in-out mx-auto shadow-2xl rounded-lg ${viewportClasses[viewport]} bg-white`}>
                <div className="w-full h-full rounded-lg overflow-auto">
                    {/* Mock Storefront Content */}
                    <header className="p-6 border-b border-slate-200 flex justify-between items-center" style={{fontFamily: theme.bodyFont}}>
                         <h1 className="text-2xl font-bold" style={{fontFamily: theme.headlineFont, color: theme.primaryColor}}>Creator Shop</h1>
                         <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-slate-600">
                             <a href="#" className="hover:text-[var(--primary-color)]">Catalog</a>
                             <a href="#" className="hover:text-[var(--primary-color)]">About</a>
                             <a href="#" className="hover:text-[var(--primary-color)]">FAQ</a>
                         </nav>
                    </header>
                    <main>
                        <section className="text-center p-8 sm:p-16" style={{ backgroundColor: `${theme.primaryColor}1A` }}>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{fontFamily: theme.headlineFont, color: theme.primaryColor}}>Build Your Future</h2>
                            <p className="mb-8 text-slate-600 max-w-xl mx-auto" style={{fontFamily: theme.bodyFont}}>High-quality digital products to help you level up your skills.</p>
                            <button className="px-6 py-3 rounded-md text-white font-semibold transition-transform hover:scale-105" style={{backgroundColor: theme.primaryColor, fontFamily: theme.bodyFont}}>Browse Products</button>
                        </section>

                        <section className="py-12 px-6">
                             <h3 className="text-2xl font-bold text-center mb-8" style={{fontFamily: theme.headlineFont}}>Featured Products</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border border-slate-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                                        <div className="bg-slate-200 h-40"></div>
                                        <div className="p-4">
                                            <h4 className="font-semibold" style={{fontFamily: theme.headlineFont}}>Product {i}</h4>
                                            <p className="text-sm text-slate-500 mt-1" style={{fontFamily: theme.bodyFont}}>A short description of the item.</p>
                                            <p className="font-bold text-lg mt-2" style={{color: theme.primaryColor}}>$99.00</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header */}
            <header className="flex-shrink-0 bg-white border-b border-slate-200">
                <div className="px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                           <span className="text-sm font-semibold text-slate-600 px-2">Env:</span>
                            {(['Draft', 'Live'] as const).map(env => (
                                <button key={env} onClick={() => setEnvironment(env)} className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${environment === env ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                                    {env}
                                </button>
                            ))}
                        </div>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                            {(['mobile', 'tablet', 'desktop'] as Viewport[]).map(vp => (
                                <button key={vp} onClick={() => setViewport(vp)} className={`p-1.5 rounded-md transition-colors ${viewport === vp ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>
                                    <Icon name={vp} className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center transition-colors">
                            <Icon name="eye" className="w-5 h-5 mr-2 -ml-1" />
                            Preview
                        </button>
                        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700 flex items-center transition-colors">
                             <Icon name="cloud-arrow-up" className="w-5 h-5 mr-2 -ml-1" />
                            Publish
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                <EditorPanel />
                <PreviewPanel />
            </div>
        </div>
    );
};

export default Storefront;