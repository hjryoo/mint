import React, { useState } from 'react';
import { AffiliatePartner } from '../types';
import Icon from './Icon';
import { MOCK_PRODUCTS_DATA } from '../constants';

interface CommissionStructureEditorProps {
    partner: AffiliatePartner;
    onClose: () => void;
}

type RateType = 'percentage' | 'fixed' | 'tiered';

const CommissionStructureEditor: React.FC<CommissionStructureEditorProps> = ({ partner, onClose }) => {
    const [rateType, setRateType] = useState<RateType>('percentage');
    const [rateValue, setRateValue] = useState(partner.commissionRate);
    const [cookieWindow, setCookieWindow] = useState(partner.cookieWindow);
    const [paymentTerms, setPaymentTerms] = useState('Net 30');
    const [autoApprove, setAutoApprove] = useState(true);

    const productOverrides = [
        { productId: 'prod1', type: 'percentage', value: 30 },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" aria-modal="true">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all" role="dialog">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold font-display text-slate-800">Commission Structure</h2>
                        <p className="text-sm text-slate-500">Editing for {partner.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                        <Icon name="x-mark" className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Rate Type */}
                    <fieldset>
                        <legend className="text-base font-semibold text-slate-800 mb-2">Rate Type</legend>
                        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
                            {(['percentage', 'fixed', 'tiered'] as RateType[]).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setRateType(type)}
                                    className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${rateType === type ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            {rateType === 'percentage' && (
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">%</span>
                                    </div>
                                    <input type="number" value={rateValue} onChange={e => setRateValue(Number(e.target.value))} className="block w-full rounded-md border-0 py-2 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm"/>
                                </div>
                            )}
                             {rateType === 'fixed' && (
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input type="number" value={rateValue} onChange={e => setRateValue(Number(e.target.value))} className="block w-full rounded-md border-0 py-2 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm"/>
                                </div>
                            )}
                            {rateType === 'tiered' && (
                                <div className="p-4 text-center bg-slate-50 rounded-md text-sm text-slate-500">
                                    Tiered structure configuration is coming soon.
                                </div>
                            )}
                        </div>
                    </fieldset>

                     {/* Product-specific rates */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-800 mb-2">Product-specific Rates</h3>
                        <div className="border border-slate-200 rounded-lg">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Rate</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {productOverrides.map(override => (
                                        <tr key={override.productId}>
                                            <td className="px-4 py-2 text-sm font-medium text-slate-800">{MOCK_PRODUCTS_DATA.find(p=>p.id === override.productId)?.name}</td>
                                            <td className="px-4 py-2 text-sm text-slate-600">{override.value}%</td>
                                            <td className="px-4 py-2 text-right"><button className="text-slate-400 hover:text-red-600"><Icon name="x-mark" className="w-4 h-4" /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                             <div className="p-2 border-t border-slate-200">
                                <button className="w-full text-center text-sm font-medium text-mint-600 hover:bg-mint-50 rounded-md py-2">
                                    + Add override
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Cookie Window */}
                        <div>
                             <label htmlFor="cookieWindow" className="block text-base font-semibold text-slate-800 mb-2">Cookie Window</label>
                            <select id="cookieWindow" value={cookieWindow} onChange={e => setCookieWindow(Number(e.target.value))} className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm">
                                {[1, 7, 14, 30, 60, 90].map(days => (
                                    <option key={days} value={days}>{days} days</option>
                                ))}
                            </select>
                        </div>
                        {/* Payment Terms */}
                        <div>
                            <label htmlFor="paymentTerms" className="block text-base font-semibold text-slate-800 mb-2">Payment Terms</label>
                            <select id="paymentTerms" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-mint-600 sm:text-sm">
                                {['Net 7', 'Net 15', 'Net 30'].map(term => (
                                    <option key={term} value={term}>{term}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input id="autoApprove" type="checkbox" checked={autoApprove} onChange={e => setAutoApprove(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-mint-600 focus:ring-mint-600" />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="autoApprove" className="font-medium text-gray-900">Automatic Approval</label>
                                <p className="text-gray-500">Automatically approve commissions after the clearing period.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mint-600 hover:bg-mint-700">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommissionStructureEditor;
