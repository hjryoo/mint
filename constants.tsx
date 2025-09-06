import React from 'react';
import { NavItem, KpiData, ChartDataPoint, Task, Notification, Product, Bundle, Coupon, Offer, Customer, Segment, RevenueTableItem, AttributionData, CampaignPerformance, AttributionModel, LTVCohortData, RetentionSurvivalDataPoint, FunnelStep, PathingData, OfferImpactData, AffiliatePartner, CommissionLedgerEntry, AffiliatePayout, AffiliateLink, Payout, Order, RefundRequest } from './types';
import Icon from './components/Icon';

export const NAV_ITEMS: NavItem[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: <Icon name="dashboard" /> },
  { id: 'Catalog', label: 'Catalog', icon: <Icon name="catalog" /> },
  { id: 'Bundles & Offers', label: 'Bundles & Offers', icon: <Icon name="offers" /> },
  { id: 'Storefront', label: 'Storefront', icon: <Icon name="storefront" /> },
  { id: 'Customers', label: 'Customers', icon: <Icon name="customers" /> },
  { id: 'Analytics', label: 'Analytics', icon: <Icon name="analytics" /> },
  { id: 'Affiliates', label: 'Affiliates', icon: <Icon name="affiliates" /> },
  { id: 'Payouts & Finance', label: 'Payouts & Finance', icon: <Icon name="payouts" /> },
];

export const SETTINGS_NAV_ITEMS: NavItem[] = [
    { id: 'Settings', label: 'Settings', icon: <Icon name="settings" /> },
    { id: 'Help', label: 'Help', icon: <Icon name="help" /> },
];

export const MOCK_KPI_DATA: KpiData[] = [
  {
    title: 'MRR',
    value: '$12,480',
    change: '+12.5%',
    changeType: 'increase',
    icon: <Icon name="mrr" />,
  },
  {
    title: 'One-time revenue',
    value: '$8,320',
    change: '+5.2%',
    changeType: 'increase',
    icon: <Icon name="revenue" />,
  },
  {
    title: 'AOV',
    value: '$124.50',
    change: '-1.8%',
    changeType: 'decrease',
    icon: <Icon name="aov" />,
  },
  {
    title: 'Refund rate',
    value: '2.1%',
    change: '+0.5%',
    changeType: 'decrease',
    icon: <Icon name="refund" />,
  },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
    { name: 'Jan', YouTube: 4000, TikTok: 2400, Instagram: 1800 },
    { name: 'Feb', YouTube: 3000, TikTok: 1398, Instagram: 2210 },
    { name: 'Mar', YouTube: 2000, TikTok: 9800, Instagram: 2290 },
    { name: 'Apr', YouTube: 2780, TikTok: 3908, Instagram: 2000 },
    { name: 'May', YouTube: 1890, TikTok: 4800, Instagram: 2181 },
    { name: 'Jun', YouTube: 2390, TikTok: 3800, Instagram: 2500 },
    { name: 'Jul', YouTube: 3490, TikTok: 4300, Instagram: 2100 },
];

export const MOCK_TASKS_DATA: Task[] = [
    { id: 'task1', title: 'Create a coupon', description: 'Boost sales with a limited-time offer.', icon: <Icon name="offers" />, completed: false },
    { id: 'task2', title: 'Bundle your bestsellers', description: 'Increase AOV by bundling popular products.', icon: <Icon name="bundle" />, completed: false },
    { id: 'task3', title: 'Enable affiliate program', description: 'Let others sell for you and earn.', icon: <Icon name="affiliates" />, completed: true },
];

export const MOCK_NOTIFICATIONS_DATA: Notification[] = [
    { id: 'notif1', message: 'Payout of $2,345.67 has been initiated.', timestamp: '2 hours ago', icon: <Icon name="payouts" className="text-mint-600" /> },
    { id: 'notif2', message: 'Revenue spike detected on your "Pro Presets" product.', timestamp: '1 day ago', icon: <Icon name="analytics" className="text-amber-600" /> },
    { id: 'notif3', message: 'New affiliate "Jane Doe" has signed up.', timestamp: '3 days ago', icon: <Icon name="affiliates" className="text-slate-500" /> },
];

export const MOCK_PRODUCTS_DATA: Product[] = [
    { id: 'prod1', coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', name: 'Coding Bootcamp Mini', type: 'Course', status: 'Published', price: 499, priceModel: 'one-time', revenue30d: 12475, conversionRate: 5.2, attachRate: 15.1, lastUpdated: '2 days ago', sales7d: [{day: 'Mon', sales: 120}, {day: 'Tue', sales: 200}, {day: 'Wed', sales: 150}, {day: 'Thu', sales: 300}, {day: 'Fri', sales: 250}, {day: 'Sat', sales: 400}, {day: 'Sun', sales: 350}] },
    { id: 'prod2', coverUrl: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', name: 'Notion Template Pack', type: 'Template', status: 'Published', price: 49, priceModel: 'one-time', revenue30d: 8721, conversionRate: 8.1, attachRate: 22.5, lastUpdated: '5 hours ago', sales7d: [{day: 'Mon', sales: 50}, {day: 'Tue', sales: 80}, {day: 'Wed', sales: 120}, {day: 'Thu', sales: 100}, {day: 'Fri', sales: 150}, {day: 'Sat', sales: 200}, {day: 'Sun', sales: 180}] },
    { id: 'prod3', coverUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', name: 'Pro Video LUTs', type: 'Preset', status: 'Published', price: 79, priceModel: 'one-time', revenue30d: 5432, conversionRate: 4.3, attachRate: 8.2, lastUpdated: '1 week ago', sales7d: [{day: 'Mon', sales: 20}, {day: 'Tue', sales: 40}, {day: 'Wed', sales: 30}, {day: 'Thu', sales: 60}, {day: 'Fri', sales: 80}, {day: 'Sat', sales: 90}, {day: 'Sun', sales: 70}] },
    { id: 'prod4', coverUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', name: 'Creator Community', type: 'Course', status: 'Published', price: 25, priceModel: 'subscription', revenue30d: 12480, conversionRate: 12.3, attachRate: 35.0, lastUpdated: 'yesterday', sales7d: [{day: 'Mon', sales: 10}, {day: 'Tue', sales: 15}, {day: 'Wed', sales: 20}, {day: 'Thu', sales: 25}, {day: 'Fri', sales: 30}, {day: 'Sat', sales: 35}, {day: 'Sun', sales: 40}] },
    { id: 'prod5', coverUrl: 'https://images.unsplash.com/photo-1516116216624-53e697303d36?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', name: 'Draft Website Template', type: 'Template', status: 'Draft', price: 99, priceModel: 'one-time', revenue30d: 0, conversionRate: 0, attachRate: 0, lastUpdated: '3 weeks ago', sales7d: [{day: 'Mon', sales: 0}, {day: 'Tue', sales: 0}, {day: 'Wed', sales: 0}, {day: 'Thu', sales: 0}, {day: 'Fri', sales: 0}, {day: 'Sat', sales: 0}, {day: 'Sun', sales: 0}] },
    { id: 'prod6', coverUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', name: 'Archived Course', type: 'Course', status: 'Archived', price: 199, priceModel: 'one-time', revenue30d: 250, conversionRate: 1.1, attachRate: 2.3, lastUpdated: '2 months ago', sales7d: [{day: 'Mon', sales: 1}, {day: 'Tue', sales: 0}, {day: 'Wed', sales: 0}, {day: 'Thu', sales: 2}, {day: 'Fri', sales: 0}, {day: 'Sat', sales: 1}, {day: 'Sun', sales: 0}] },
];

export const MOCK_BUNDLES_DATA: Bundle[] = [
  { id: 'bun1', name: 'The Creator Starter Kit', itemCount: 3, type: 'Mixed', price: 129, savings: { percentage: 25, amount: 43 }, attachRate7d: 12.5, attachRate30d: 10.2, revenue7d: 1290, revenue30d: 5418, status: 'Live', conflicts: 0, lastUpdated: '3 days ago' },
  { id: 'bun2', name: 'Complete Notion Pack', itemCount: 5, type: 'Single-category', price: 99, savings: { percentage: 40, amount: 66 }, attachRate7d: 8.1, attachRate30d: 9.5, revenue7d: 891, revenue30d: 4158, status: 'Live', conflicts: 1, lastUpdated: '1 week ago' },
  { id: 'bun3', name: 'Summer Preset Bundle', itemCount: 10, type: 'Single-category', price: 199, savings: { percentage: 30, amount: 85 }, attachRate7d: 5.3, attachRate30d: 4.8, revenue7d: 597, revenue30d: 2189, status: 'Expired', conflicts: 0, lastUpdated: '1 month ago' },
  { id: 'bun4', name: 'Holiday Sale Bundle', itemCount: 4, type: 'Mixed', price: 149, savings: { percentage: 50, amount: 149 }, attachRate7d: 0, attachRate30d: 0, revenue7d: 0, revenue30d: 0, status: 'Scheduled', conflicts: 0, lastUpdated: '2 hours ago' },
];

export const MOCK_COUPONS_DATA: Coupon[] = [
  { id: 'coup1', code: 'SUMMER25', type: 'percentage', value: 25, status: 'Active', redemptions: { current: 152, limit: 1000 }, appliesTo: 'All products', startDate: '2024-06-01', endDate: '2024-08-31' },
  { id: 'coup2', code: 'WELCOME10', type: 'fixed-amount', value: 10, status: 'Active', redemptions: { current: 892, limit: null }, appliesTo: 'First purchase', startDate: '2024-01-01', endDate: null },
  { id: 'coup3', code: 'FLASH50', type: 'percentage', value: 50, status: 'Expired', redemptions: { current: 500, limit: 500 }, appliesTo: 'Coding Bootcamp Mini', startDate: '2024-05-10', endDate: '2024-05-12' },
  { id: 'coup4', code: 'LAUNCHDAY', type: 'percentage', value: 15, status: 'Disabled', redemptions: { current: 0, limit: null }, appliesTo: 'New products', startDate: '2024-07-01', endDate: null },
];

export const MOCK_OFFERS_DATA: Offer[] = [
  { id: 'off1', name: 'Bootcamp Upsell', type: 'Upsell', status: 'Active', primaryProduct: 'Coding Bootcamp Mini', offeredProduct: 'Creator Community', discount: { type: 'percentage', value: 50 }, impressions: 1240, conversions: 186, revenueGenerated: 2325 },
  { id: 'off2', name: 'Notion Cross-sell', type: 'Cross-sell', status: 'Active', primaryProduct: 'Notion Template Pack', offeredProduct: 'Productivity Planner', discount: { type: 'fixed-amount', value: 10 }, impressions: 3210, conversions: 450, revenueGenerated: 4050 },
  { id: 'off3', name: 'LUTs One-click Upsell', type: 'Upsell', status: 'Paused', primaryProduct: 'Pro Video LUTs', offeredProduct: 'Advanced Editing Course', discount: { type: 'percentage', value: 20 }, impressions: 850, conversions: 92, revenueGenerated: 7360 },
];

export const MOCK_CUSTOMERS_DATA: Customer[] = [
    { id: 'cust1', name: 'Alex Johnson', email: 'alex.j@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=cust1', location: 'New York, USA', firstChannel: 'YouTube', ltv: 1250.50, ordersCount: 3, activeSubs: 1, lastSeen: '2 hours ago', refundFlag: false, riskScore: 'Low', tags: ['High LTV', 'Subscriber'], subscriptions: [{id: 'sub1', productName: 'Creator Community', status: 'Active', price: 25, nextRenewal: '2024-08-01'}], products: [{id: 'prod1', name: 'Coding Bootcamp Mini', type: 'Course'}, {id: 'prod4', name: 'Creator Community', type: 'Course'}], timeline: [{id: 't1', type: 'order', icon: 'aov', title: 'Order #1234', description: 'Coding Bootcamp Mini', timestamp: '3 months ago'}, {id: 't2', type: 'subscription', icon: 'mrr', title: 'Subscribed to Creator Community', description: '$25/month', timestamp: '3 months ago'}] },
    { id: 'cust2', name: 'Maria Garcia', email: 'maria.g@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=cust2', location: 'Madrid, Spain', firstChannel: 'TikTok', ltv: 128.00, ordersCount: 1, activeSubs: 0, lastSeen: '1 day ago', refundFlag: true, riskScore: 'Medium', tags: ['Refund', 'First Purchase'], subscriptions: [], products: [{id: 'prod2', name: 'Notion Template Pack', type: 'Template'}], timeline: [{id: 't3', type: 'order', icon: 'aov', title: 'Order #1233', description: 'Notion Template Pack, Pro Video LUTs', timestamp: '1 day ago'}] },
    { id: 'cust3', name: 'James Smith', email: 'james.s@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=cust3', location: 'London, UK', firstChannel: 'Instagram', ltv: 25.00, ordersCount: 1, activeSubs: 1, lastSeen: '5 days ago', refundFlag: false, riskScore: 'Low', tags: ['New Buyer', 'Subscriber'], subscriptions: [{id: 'sub2', productName: 'Creator Community', status: 'Active', price: 25, nextRenewal: '2024-07-28'}], products: [{id: 'prod4', name: 'Creator Community', type: 'Course'}], timeline: [{id: 't4', type: 'order', icon: 'aov', title: 'Order #1232', description: 'Creator Community', timestamp: '5 days ago'}] },
    { id: 'cust4', name: 'Patricia Williams', email: 'pat.w@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=cust4', location: 'Toronto, Canada', firstChannel: 'Direct', ltv: 79.00, ordersCount: 1, activeSubs: 0, lastSeen: '2 weeks ago', refundFlag: false, riskScore: 'High', tags: ['Churn Risk'], subscriptions: [], products: [{id: 'prod3', name: 'Pro Video LUTs', type: 'Preset'}], timeline: [{id: 't5', type: 'order', icon: 'aov', title: 'Order #1231', description: 'Pro Video LUTs', timestamp: '2 weeks ago'}] },
];

export const MOCK_SEGMENTS_DATA: Segment[] = [
    { id: 'seg1', isTemplate: true, name: 'High LTV Customers', description: 'Customers with LTV > $500.', memberCount: 82, revenue: 68040, aov: 720.50 },
    { id: 'seg2', isTemplate: true, name: 'Potential Churn', description: 'Subscribers with no activity in 30 days.', memberCount: 45, revenue: 1125, aov: 25.00 },
    { id: 'seg3', isTemplate: false, name: 'My VIPs', description: 'Hand-picked best customers.', memberCount: 12, revenue: 15200, aov: 1266.67 },
    { id: 'seg4', isTemplate: false, name: 'Notion Users', description: 'Customers who bought any Notion template.', memberCount: 212, revenue: 10388, aov: 49.00 },
];

export const MOCK_ANALYTICS_KPI_DATA: KpiData[] = [
    { title: 'Gross Volume', value: '$20,800', change: '+8.1%', changeType: 'increase', icon: <Icon name="revenue" /> },
    { title: 'Net Revenue', value: '$19,852', change: '+7.5%', changeType: 'increase', icon: <Icon name="revenue" /> },
    { title: 'Orders', value: '1,240', change: '+15.2%', changeType: 'increase', icon: <Icon name="aov" /> },
    { title: 'AOV', value: '$124.50', change: '-1.8%', changeType: 'decrease', icon: <Icon name="aov" /> },
    { title: 'MRR', value: '$12,480', change: '+12.5%', changeType: 'increase', icon: <Icon name="mrr" /> },
    { title: 'New Subs', value: '82', change: '+20.1%', changeType: 'increase', icon: <Icon name="mrr" /> },
    { title: 'Churn Rate', value: '4.3%', change: '-0.2%', changeType: 'increase', icon: <Icon name="refund" /> },
    { title: 'Refunds', value: '$948', change: '+10.5%', changeType: 'decrease', icon: <Icon name="refund" /> },
];

export const MOCK_REVENUE_CHART_DATA = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    oneTime: 200 + Math.random() * 500 + i * 20,
    subscription: 350 + Math.random() * 100 + i * 5,
    couponImpact: Math.random() * 100,
    upsellLift: Math.random() * 80,
    bundleShare: Math.random() * 150,
}));

export const MOCK_REVENUE_TABLE_DATA: RevenueTableItem[] = [
    { id: 'item1', name: 'Coding Bootcamp Mini', type: 'Product', revenue: 12475, discounts: 1200.50, refunds: 499.00, net: 10775.50, attachRate: 15.1 },
    { id: 'item2', name: 'Creator Starter Kit', type: 'Bundle', revenue: 5418, discounts: 550.00, refunds: 129.00, net: 4739.00, attachRate: 10.2 },
    { id: 'item3', name: 'Notion Template Pack', type: 'Product', revenue: 8721, discounts: 800.20, refunds: 49.00, net: 7871.80, attachRate: 22.5 },
];

export const MOCK_ATTRIBUTION_DATA: AttributionData[] = [
    { channel: 'YouTube', 'first-touch': 12500, 'last-touch': 10200, 'time-decay': 11500 },
    { channel: 'TikTok', 'first-touch': 8300, 'last-touch': 9800, 'time-decay': 9100 },
    { channel: 'Instagram', 'first-touch': 6100, 'last-touch': 7500, 'time-decay': 6800 },
    { channel: 'Direct', 'first-touch': 4500, 'last-touch': 6300, 'time-decay': 5200 },
];

export const MOCK_CAMPAIGNS_DATA: { [key in AttributionModel]: CampaignPerformance[] } = {
    'first-touch': [
        { id: 'c1', name: 'Summer Launch Video', channel: 'YouTube', revenue: 4500, conversions: 9 },
        { id: 'c2', name: 'Viral Template Trend', channel: 'TikTok', revenue: 3200, conversions: 65 },
    ],
    'last-touch': [
        { id: 'c2', name: 'Viral Template Trend', channel: 'TikTok', revenue: 4100, conversions: 83 },
        { id: 'c3', name: 'Q&A Live Stream', channel: 'Instagram', revenue: 3500, conversions: 25 },
    ],
    'time-decay': [
        { id: 'c1', name: 'Summer Launch Video', channel: 'YouTube', revenue: 4150, conversions: 8 },
        { id: 'c2', name: 'Viral Template Trend', channel: 'TikTok', revenue: 3800, conversions: 78 },
    ],
};

export const MOCK_LTV_COHORT_DATA: LTVCohortData[] = [
    { cohort: 'Jan 2024', users: 150, months: [25.50, 45.20, 60.80, 72.10, 80.50, 85.20, null, null, null, null, null, null] },
    { cohort: 'Feb 2024', users: 180, months: [24.80, 43.10, 58.50, 68.90, 75.20, null, null, null, null, null, null, null] },
    { cohort: 'Mar 2024', users: 210, months: [26.10, 46.50, 62.30, 70.10, null, null, null, null, null, null, null, null] },
    { cohort: 'Apr 2024', users: 195, months: [25.20, 44.80, 59.90, null, null, null, null, null, null, null, null, null] },
    { cohort: 'May 2024', users: 220, months: [27.00, 48.10, null, null, null, null, null, null, null, null, null, null] },
    { cohort: 'Jun 2024', users: 250, months: [26.50, null, null, null, null, null, null, null, null, null, null, null] },
];

export const MOCK_RETENTION_SURVIVAL_DATA: RetentionSurvivalDataPoint[] = [
    { month: 0, youtube: 100, tiktok: 100, instagram: 100 },
    { month: 1, youtube: 95.2, tiktok: 92.1, instagram: 94.5 },
    { month: 2, youtube: 88.4, tiktok: 81.3, instagram: 86.2 },
    { month: 3, youtube: 82.1, tiktok: 75.5, instagram: 80.1 },
    { month: 4, youtube: 78.5, tiktok: 70.2, instagram: 76.8 },
    { month: 5, youtube: 75.3, tiktok: 66.8, instagram: 72.3 },
    { month: 6, youtube: 72.1, tiktok: 63.1, instagram: 68.5 },
    { month: 9, youtube: 65.4, tiktok: 55.2, instagram: 61.9 },
    { month: 12, youtube: 60.2, tiktok: 48.9, instagram: 55.4 },
];

export const MOCK_FUNNEL_DATA: { [key: string]: FunnelStep[] } = {
    'All Channels': [
        { name: 'Visit', users: 25000, medianTime: '1m 20s' },
        { name: 'Product View', users: 12000, medianTime: '2m 10s' },
        { name: 'Add to Cart', users: 3000, medianTime: '45s' },
        { name: 'Checkout', users: 1500, medianTime: '1m 30s' },
        { name: 'Purchase', users: 1240 },
    ],
    'YouTube': [
        { name: 'Visit', users: 15000, medianTime: '1m 45s' },
        { name: 'Product View', users: 8000, medianTime: '2m 30s' },
        { name: 'Add to Cart', users: 2000, medianTime: '50s' },
        { name: 'Checkout', users: 1100, medianTime: '1m 25s' },
        { name: 'Purchase', users: 950 },
    ],
    'TikTok': [
         { name: 'Visit', users: 8000, medianTime: '55s' },
        { name: 'Product View', users: 3500, medianTime: '1m 40s' },
        { name: 'Add to Cart', users: 800, medianTime: '35s' },
        { name: 'Checkout', users: 350, medianTime: '1m 10s' },
        { name: 'Purchase', users: 250 },
    ],
};

export const MOCK_PATHING_DATA: PathingData = {
    nodes: [
        { name: 'Home Page' }, { name: 'Product Page A' }, { name: 'Product Page B' }, { name: 'Checkout' }, { name: 'Purchase A' }, { name: 'Upsell Offer' }, { name: 'Purchase B' }, { name: 'Purchase Upsell' }
    ],
    links: [
        { source: 0, target: 1, value: 50 }, { source: 0, target: 2, value: 30 },
        { source: 1, target: 3, value: 40 }, { source: 2, target: 3, value: 20 },
        { source: 3, target: 4, value: 35 }, { source: 3, target: 6, value: 15 },
        { source: 4, target: 5, value: 25 }, { source: 5, target: 7, value: 15 }
    ]
};

export const MOCK_OFFER_IMPACT_DATA: OfferImpactData[] = [
    { id: 'imp1', name: 'Creator Starter Kit', type: 'Bundle', metricValue: 10.2, metricLabel: 'Attach Rate', incrementalAOV: 25.50, cannibalizationFlag: true, comparisonData: { on: { period: 'Jun 1-30', revenue: 5418, margin: 3792 }, off: { period: 'May 1-31', revenue: 4800, margin: 3840 } } },
    { id: 'imp2', name: 'Bootcamp Upsell', type: 'Upsell', metricValue: 15.0, metricLabel: 'Take Rate', incrementalAOV: 18.75, cannibalizationFlag: false, comparisonData: { on: { period: 'Jun 1-30', revenue: 2325, margin: 2092 }, off: { period: 'May 1-31', revenue: 1500, margin: 1350 } } },
    { id: 'imp3', name: 'SUMMER25 Coupon', type: 'Coupon', metricValue: 8.5, metricLabel: 'Lift', incrementalAOV: 0, cannibalizationFlag: false, comparisonData: { on: { period: 'Jun 1-30', revenue: 12400, margin: 9300 }, off: { period: 'May 1-31', revenue: 11000, margin: 9900 } } },
];

export const MOCK_AFFILIATES_OVERVIEW_KPI_DATA: KpiData[] = [
    { title: 'Total Partners', value: '5', change: '+2 this month', changeType: 'increase', icon: <Icon name="affiliates" /> },
    { title: 'Active Links', value: '12', change: '+5 this month', changeType: 'increase', icon: <Icon name="link" /> },
    { title: '30d Clicks', value: '8,452', change: '+15.2%', changeType: 'increase', icon: <Icon name="customers" /> },
    { title: '30d Conversions', value: '207', change: '+18.1%', changeType: 'increase', icon: <Icon name="aov" /> },
    { title: 'Commissions Paid (30d)', value: '$4,320', change: '+25.1%', changeType: 'increase', icon: <Icon name="revenue" /> },
    { title: 'Pending Payouts', value: '$2,012.07', change: '+10.5%', changeType: 'decrease', icon: <Icon name="payouts" /> },
];

export const MOCK_AFFILIATES_DATA: AffiliatePartner[] = [
    { id: 'aff1', name: 'Laura Nielsen', email: 'laura.n@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=aff1', status: 'Active', commissionRate: 25, clicks: 1250, conversions: 52, epc: 1.25, revenue: 1562.50, unpaidCommission: 390.63, lastActive: '2 hours ago', riskFlags: [], joinDate: '2024-01-15', uniqueCode: 'LAURA25', cookieWindow: 30 },
    { id: 'aff2', name: 'Ben Carter', email: 'ben.c@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=aff2', status: 'Active', commissionRate: 20, clicks: 830, conversions: 35, epc: 0.84, revenue: 697.20, unpaidCommission: 139.44, lastActive: '1 day ago', riskFlags: ['Self-purchase'], joinDate: '2024-02-01', uniqueCode: 'BENC20', cookieWindow: 30 },
    { id: 'aff3', name: 'Sophia Rodriguez', email: 'sophia.r@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=aff3', status: 'Pending', commissionRate: 20, clicks: 0, conversions: 0, epc: 0, revenue: 0, unpaidCommission: 0, lastActive: '5 days ago', riskFlags: [], joinDate: '2024-06-25', uniqueCode: 'SOPHIAR20', cookieWindow: 30 },
    { id: 'aff4', name: 'David Chen', email: 'david.c@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=aff4', status: 'Paused', commissionRate: 30, clicks: 5200, conversions: 120, epc: 0.95, revenue: 4940, unpaidCommission: 1482, lastActive: '2 weeks ago', riskFlags: ['Coupon Abuse'], joinDate: '2023-11-10', uniqueCode: 'DAVIDC30', cookieWindow: 60 },
    { id: 'aff5', name: 'Olivia Martinez', email: 'olivia.m@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=aff5', status: 'Declined', commissionRate: 25, clicks: 15, conversions: 0, epc: 0, revenue: 0, unpaidCommission: 0, lastActive: '1 month ago', riskFlags: [], joinDate: '2024-06-10', uniqueCode: 'OLIVIAM25', cookieWindow: 30 },
];

export const MOCK_AFFILIATE_COMMISSIONS_DATA: CommissionLedgerEntry[] = [
    { id: 'com1', orderId: '#1256', productName: 'Coding Bootcamp Mini', orderValue: 499, commissionAmount: 124.75, status: 'Cleared', date: '2024-06-15' },
    { id: 'com2', orderId: '#1248', productName: 'Notion Template Pack', orderValue: 49, commissionAmount: 12.25, status: 'On Hold', date: '2024-06-28' },
    { id: 'com3', orderId: '#1231', productName: 'Pro Video LUTs', orderValue: 79, commissionAmount: 19.75, status: 'Reversed', date: '2024-05-20' },
    { id: 'com4', orderId: '#1225', productName: 'Creator Community', orderValue: 25, commissionAmount: 6.25, status: 'Cleared', date: '2024-05-01' },
];

export const MOCK_AFFILIATE_LINKS_DATA: AffiliateLink[] = [
    { id: 'link1', name: 'YouTube Review Link', destinationUrl: '...', shortlink: 'https://sig.mint/laura-yt', clicks: 850, conversions: 40, revenue: 1200 },
    { id: 'link2', name: 'Twitter Promo', destinationUrl: '...', shortlink: 'https://sig.mint/laura-tw', clicks: 400, conversions: 12, revenue: 362.50 },
];

export const MOCK_PAYOUTS_DATA: Payout[] = [
  { id: 'pay1', payeeName: 'Laura Nielsen', payeeAvatarUrl: 'https://i.pravatar.cc/150?u=aff1', amount: 390.63, currency: 'USD', status: 'Pending', scheduledDate: '2024-07-15', notes: 'June commissions' },
  { id: 'pay2', payeeName: 'Ben Carter', payeeAvatarUrl: 'https://i.pravatar.cc/150?u=aff2', amount: 139.44, currency: 'USD', status: 'Approved', scheduledDate: '2024-07-15', notes: 'June commissions' },
  { id: 'pay3', payeeName: 'David Chen', payeeAvatarUrl: 'https://i.pravatar.cc/150?u=aff4', amount: 1482.00, currency: 'USD', status: 'Hold', scheduledDate: '2024-07-15', notes: 'Under review for coupon abuse.' },
  { id: 'pay4', payeeName: 'Emma White', payeeAvatarUrl: 'https://i.pravatar.cc/150?u=aff6', amount: 850.20, currency: 'EUR', status: 'Pending', scheduledDate: '2024-07-15', notes: 'June commissions' },
  { id: 'pay5', payeeName: 'James Brown', payeeAvatarUrl: 'https://i.pravatar.cc/150?u=aff7', amount: 245.00, currency: 'GBP', status: 'Paid', scheduledDate: '2024-06-15', notes: 'May commissions' },
];

export const MOCK_ORDERS_DATA: Order[] = [
    { id: '#1256', customerName: 'Alex Johnson', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust1', date: '2024-06-28', products: [{name: 'Coding Bootcamp Mini', quantity: 1}], totalAmount: 499, currency: 'USD', paymentStatus: 'Paid', refundStatus: 'None', channel: 'YouTube', affiliateName: 'Laura Nielsen', invoiceId: 'INV-2024-001' },
    { id: '#1255', customerName: 'Maria Garcia', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust2', date: '2024-06-28', products: [{name: 'Notion Template Pack', quantity: 2}], totalAmount: 98, currency: 'USD', paymentStatus: 'Paid', refundStatus: 'Partial', channel: 'TikTok', affiliateName: null, invoiceId: 'INV-2024-002' },
    { id: '#1254', customerName: 'James Smith', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust3', date: '2024-06-27', products: [{name: 'Creator Community', quantity: 1}], totalAmount: 25, currency: 'USD', paymentStatus: 'Paid', refundStatus: 'None', channel: 'Instagram', affiliateName: 'Ben Carter', invoiceId: 'INV-2024-003' },
    { id: '#1253', customerName: 'New Customer', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust5', date: '2024-06-27', products: [{name: 'Pro Video LUTs', quantity: 1}], totalAmount: 79, currency: 'EUR', paymentStatus: 'Pending', refundStatus: 'None', channel: 'Direct', affiliateName: null, invoiceId: 'INV-2024-004' },
    { id: '#1252', customerName: 'Patricia Williams', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust4', date: '2024-06-26', products: [{name: 'The Creator Starter Kit', quantity: 1}], totalAmount: 129, currency: 'USD', paymentStatus: 'Failed', refundStatus: 'None', channel: 'YouTube', affiliateName: 'Laura Nielsen', invoiceId: 'INV-2024-005' },
    { id: '#1251', customerName: 'Michael Brown', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust6', date: '2024-06-25', products: [{name: 'Coding Bootcamp Mini', quantity: 1}], totalAmount: 499, currency: 'GBP', paymentStatus: 'Paid', refundStatus: 'Full', channel: 'TikTok', affiliateName: null, invoiceId: 'INV-2024-006' },
];

export const MOCK_REFUNDS_DATA: RefundRequest[] = [
  { id: 'ref1', orderId: '#1255', customerName: 'Maria Garcia', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust2', amount: 49.00, currency: 'USD', reason: 'Product Not As Described', status: 'Requested', dateOpened: '2024-06-29', notes: ['Customer states the template is missing pages.'], fraudScore: 10 },
  { id: 'ref2', orderId: '#1251', customerName: 'Michael Brown', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust6', amount: 499.00, currency: 'GBP', reason: 'Accidental Purchase', status: 'Approved', dateOpened: '2024-06-26', notes: ['Approved by admin.', 'Customer bought the wrong course.'], fraudScore: 5 },
  { id: 'ref3', orderId: '#1245', customerName: 'John Doe', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust7', amount: 79.00, currency: 'USD', reason: 'Fraudulent', status: 'Rejected', dateOpened: '2024-06-22', notes: ['High fraud score from payment processor.', 'Chargeback initiated.'], fraudScore: 95 },
  { id: 'ref4', orderId: '#1240', customerName: 'Jane Smith', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust8', amount: 25.00, currency: 'USD', reason: 'Duplicate Charge', status: 'Processed', dateOpened: '2024-06-15', notes: ['System error caused double billing.', 'Refund processed via Stripe.'], fraudScore: 0 },
  { id: 'ref5', orderId: '#1238', customerName: 'Emily Clark', customerAvatarUrl: 'https://i.pravatar.cc/150?u=cust9', amount: 129.00, currency: 'EUR', reason: 'Other', status: 'Requested', dateOpened: '2024-06-30', notes: ["Customer didn't mean to buy the bundle."], fraudScore: 25 },
];