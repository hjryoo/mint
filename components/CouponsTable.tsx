import React from 'react';
import { Coupon, CouponStatus } from '../types';
import Icon from './Icon';

const StatusChip: React.FC<{ status: CouponStatus }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses: { [key in CouponStatus]: string } = {
        Active: "bg-mint-100 text-mint-800",
        Scheduled: "bg-amber-100 text-amber-800",
        Expired: "bg-slate-100 text-slate-800",
        Disabled: "bg-red-100 text-red-800",
    };
    const statusDotClasses: { [key in CouponStatus]: string } = {
        Active: "bg-mint-500",
        Scheduled: "bg-amber-400",
        Expired: "bg-slate-400",
        Disabled: "bg-red-400",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${statusDotClasses[status]}`}></span>
            {status}
        </span>
    );
};

interface CouponsTableProps {
    coupons: Coupon[];
}

const CouponsTable: React.FC<CouponsTableProps> = ({ coupons }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Discount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Redemptions</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applies To</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {coupons.map((coupon) => (
                    <tr key={coupon.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded-md inline-block border border-slate-200">{coupon.code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <StatusChip status={coupon.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-slate-800">
                                {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value.toFixed(2)}`}
                            </div>
                            <div className="text-sm text-slate-500 capitalize">{coupon.type.replace('-', ' ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {coupon.redemptions.current.toLocaleString()}
                            {coupon.redemptions.limit !== null && ` / ${coupon.redemptions.limit.toLocaleString()}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{coupon.appliesTo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(coupon.startDate).toLocaleDateString()} - {coupon.endDate ? new Date(coupon.endDate).toLocaleDateString() : 'No end date'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100">
                                <Icon name="pencil" className="w-5 h-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default CouponsTable;
