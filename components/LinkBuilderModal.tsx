import React, { useState, useMemo } from 'react';
import { AffiliatePartner } from '../types';
import Icon from './Icon';
import { MOCK_PRODUCTS_DATA } from '../constants';

interface LinkBuilderModalProps {
    partner: AffiliatePartner;
    onClose: () => void;
}

const LinkBuilderModal: React.FC<LinkBuilderModalProps> = ({ partner, onClose }) => {
    const [linkName, setLinkName] = useState('');
    const [destinationType, setDestinationType] = useState<'default' | 'custom'>('default');
    const [customUrl, setCustomUrl] = useState('https://');
    const [selectedProductId, setSelectedProductId] = useState<string>(MOCK_PRODUCTS_DATA[0]?.id || '');
    const [utmSource, setUtmSource] = useState(partner.uniqueCode);
    const [utmMedium, setUtmMedium] = useState('affiliate');
    const [utmCampaign, setUtmCampaign] = useState('');
    const [copied, setCopied] = useState<'short' | 'full' | null>(null);

    const { fullLink, shortLink } = useMemo(() => {
        let baseUrl = '';
        if (destinationType === 'custom') {
            baseUrl = customUrl;
        } else if (selectedProductId) {
            baseUrl = `https://yourstore.com/products/${selectedProductId}`;
        }

        if (!baseUrl || !baseUrl.startsWith('http')) {
            return { fullLink: 'Enter a valid URL.', shortLink: 'Configure destination.' };
        }

        const params = new URLSearchParams();
        params.append('ref', partner.uniqueCode);
        if (utmSource) params.append('utm_source', utmSource);
        if (utmMedium) params.append('utm_medium', utmMedium);
        if (utmCampaign) params.append('utm_campaign', utmCampaign);
        
        const generatedFullLink = `${baseUrl}?${params.toString()}`;
        const generatedShortLink = `https://sig.mint/${partner.uniqueCode.toLowerCase()}${Math.random().toString(36).substring(2, 6)}`;

        return { fullLink: generatedFullLink, shortLink: generatedShortLink };
    }, [destinationType, customUrl, selectedProductId, utmSource, utmMedium, utmCampaign, partner.uniqueCode]);
    
    const handleCopy = (type: 'short' | 'full') => {
        const textToCopy = type === 'short' ? shortLink : fullLink;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" aria-modal="true">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all" role="dialog">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold font-display text-slate-800">Link Builder</h2>
                        <p className="text-sm text-slate-500">Create a new tracked link for {partner.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                        <Icon name="x-mark" className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Link Name */}
                    <div>
                        <label htmlFor="linkName" className="block text-base font-semibold text-slate-800 mb-2">Link Name</label>
                        <input id="linkName" type="text" value={linkName} onChange={e => setLinkName(e.target.value)} placeholder="e.g., Summer Campaign YouTube" className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm"/>
                    </div>
                    
                    {/* Destination */}
                    <div>
                        <label className="block text-base font-semibold text-slate-800 mb-2">Destination</label>
                        <div className="flex space-x-4">
                             <div className="flex items-center">
                                <input id="dest_default" name="destinationType" type="radio" checked={destinationType === 'default'} onChange={() => setDestinationType('default')} className="h-4 w-4 border-gray-300 text-mint-600 focus:ring-mint-600" />
                                <label htmlFor="dest_default" className="ml-2 block text-sm font-medium text-gray-900">Product Page</label>
                            </div>
                             <div className="flex items-center">
                                <input id="dest_custom" name="destinationType" type="radio" checked={destinationType === 'custom'} onChange={() => setDestinationType('custom')} className="h-4 w-4 border-gray-300 text-mint-600 focus:ring-mint-600" />
                                <label htmlFor="dest_custom" className="ml-2 block text-sm font-medium text-gray-900">Custom URL</label>
                            </div>
                        </div>
                        <div className="mt-2">
                            {destinationType === 'default' ? (
                                <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm">
                                    {MOCK_PRODUCTS_DATA.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                                </select>
                            ) : (
                                <input type="url" value={customUrl} onChange={e => setCustomUrl(e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm" />
                            )}
                        </div>
                    </div>

                    {/* UTM Parameters */}
                    <div>
                         <h3 className="text-base font-semibold text-slate-800 mb-2">Tracking (UTM Parameters)</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="utmSource" className="block text-xs font-medium text-slate-600 mb-1">Source</label>
                                <input id="utmSource" type="text" value={utmSource} onChange={e => setUtmSource(e.target.value)} placeholder="e.g., youtube" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm"/>
                            </div>
                            <div>
                                <label htmlFor="utmMedium" className="block text-xs font-medium text-slate-600 mb-1">Medium</label>
                                <input id="utmMedium" type="text" value={utmMedium} onChange={e => setUtmMedium(e.target.value)} placeholder="e.g., social" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm"/>
                            </div>
                            <div>
                                <label htmlFor="utmCampaign" className="block text-xs font-medium text-slate-600 mb-1">Campaign</label>
                                <input id="utmCampaign" type="text" value={utmCampaign} onChange={e => setUtmCampaign(e.target.value)} placeholder="e.g., summer_sale" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm"/>
                            </div>
                         </div>
                    </div>
                    
                    {/* Generated Links */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                         <div>
                            <label className="block text-sm font-semibold text-slate-800 mb-1">Short Link</label>
                            <div className="relative">
                                <input type="text" readOnly value={shortLink} className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-600 bg-slate-200 ring-1 ring-inset ring-slate-300 text-sm font-mono"/>
                                <button onClick={() => handleCopy('short')} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {copied === 'short' ? <Icon name="check-circle" className="h-5 w-5 text-mint-600"/> : <Icon name="document-duplicate" className="h-5 w-5 text-slate-500"/>}
                                </button>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-semibold text-slate-800 mb-1">Full Destination URL</label>
                             <div className="relative">
                                <input type="text" readOnly value={fullLink} className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-600 bg-slate-200 ring-1 ring-inset ring-slate-300 text-sm font-mono"/>
                                <button onClick={() => handleCopy('full')} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                     {copied === 'full' ? <Icon name="check-circle" className="h-5 w-5 text-mint-600"/> : <Icon name="document-duplicate" className="h-5 w-5 text-slate-500"/>}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700">
                        Create Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkBuilderModal;
