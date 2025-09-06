import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: NavItem[];
}

export interface KpiData {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

export interface ChartDataPoint {
  name: string;
  YouTube: number;
  TikTok: number;
  Instagram: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export interface Notification {
    id: string;
    message: string;
    timestamp: string;
    icon: React.ReactNode;
}

// Catalog Types
export type ProductType = 'Course' | 'Template' | 'Preset';
export type ProductStatus = 'Published' | 'Draft' | 'Archived' | 'Scheduled';
export type PriceModel = 'one-time' | 'subscription';

export interface Product {
  id: string;
  coverUrl: string;
  name: string;
  type: ProductType;
  status: ProductStatus;
  price: number;
  priceModel: PriceModel;
  revenue30d: number;
  conversionRate: number;
  attachRate: number;
  lastUpdated: string;
  sales7d: { day: string; sales: number }[];
}

// Bundles & Offers Types
export type BundleStatus = 'Live' | 'Draft' | 'Expired' | 'Scheduled';
export type BundleType = 'Single-category' | 'Mixed';

export interface Bundle {
  id: string;
  name: string;
  itemCount: number;
  type: BundleType;
  price: number;
  savings: {
    percentage: number;
    amount: number;
  };
  attachRate7d: number;
  attachRate30d: number;
  revenue7d: number;
  revenue30d: number;
  status: BundleStatus;
  conflicts: number;
  lastUpdated: string;
}

export type CouponStatus = 'Active' | 'Expired' | 'Scheduled' | 'Disabled';
export type CouponType = 'percentage' | 'fixed-amount';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  status: CouponStatus;
  redemptions: {
    current: number;
    limit: number | null;
  };
  appliesTo: string;
  startDate: string;
  endDate: string | null;
}

export type OfferType = 'Upsell' | 'Cross-sell';
export type OfferStatus = 'Active' | 'Paused' | 'Draft';

export interface Offer {
  id: string;
  name: string;
  type: OfferType;
  status: OfferStatus;
  primaryProduct: string;
  offeredProduct: string;
  discount: {
    type: 'percentage' | 'fixed-amount';
    value: number;
  };
  impressions: number;
  conversions: number;
  revenueGenerated: number;
}

// Storefront Types
export interface ThemeSettings {
  primaryColor: string;
  headlineFont: string;
  bodyFont: string;
}

// Customers Types
export type CustomerTimelineEventType = 'order' | 'subscription' | 'note' | 'support' | 'offer';
export type SubscriptionStatus = 'Active' | 'Paused' | 'Canceled';
export type RiskScore = 'Low' | 'Medium' | 'High';

export interface CustomerTimelineEvent {
    id: string;
    type: CustomerTimelineEventType;
    icon: string;
    title: string;
    description: string;
    timestamp: string;
}

export interface CustomerSubscription {
    id: string;
    productName: string;
    status: SubscriptionStatus;
    price: number;
    nextRenewal: string;
}

export interface CustomerProduct {
    id: string;
    name: string;
    type: ProductType;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    location: string;
    firstChannel: 'YouTube' | 'TikTok' | 'Instagram' | 'Direct';
    ltv: number;
    ordersCount: number;
    activeSubs: number;
    lastSeen: string;
    refundFlag: boolean;
    riskScore: RiskScore;
    tags: string[];
    subscriptions: CustomerSubscription[];
    products: CustomerProduct[];
    timeline: CustomerTimelineEvent[];
}

export interface Segment {
    id: string;
    isTemplate: boolean;
    name: string;
    description: string;
    memberCount: number;
    revenue: number;
    aov: number;
}

// Analytics Types
export interface RevenueTableItem {
    id: string;
    name: string;
    type: 'Product' | 'Bundle';
    revenue: number;
    discounts: number;
    refunds: number;
    net: number;
    attachRate: number;
}

export type AttributionModel = 'first-touch' | 'last-touch' | 'time-decay';
export type Channel = 'YouTube' | 'TikTok' | 'Instagram' | 'Direct';

export interface AttributionData {
    channel: Channel;
    'first-touch': number;
    'last-touch': number;
    'time-decay': number;
}

export interface CampaignPerformance {
    id: string;
    name: string;
    channel: Channel;
    revenue: number;
    conversions: number;
}

export interface LTVCohortData {
    cohort: string;
    users: number;
    months: (number | null)[];
}

export interface RetentionSurvivalDataPoint {
    month: number;
    youtube: number;
    tiktok: number;
    instagram: number;
}

// Funnels & Paths Types
export interface FunnelStep {
    name: 'Visit' | 'Product View' | 'Add to Cart' | 'Checkout' | 'Purchase';
    users: number;
    medianTime?: string; // e.g., "1m 20s"
}

export interface PathNode {
    name: string;
}

export interface PathLink {
    source: number;
    target: number;
    value: number;
}

export interface PathingData {
    nodes: PathNode[];
    links: PathLink[];
}

// Offers Impact Types
export type OfferImpactType = 'Bundle' | 'Upsell' | 'Coupon';

export interface OfferImpactData {
    id: string;
    name: string;
    type: OfferImpactType;
    metricValue: number; // Attach Rate, Take Rate, or Lift %
    metricLabel: 'Attach Rate' | 'Take Rate' | 'Lift';
    incrementalAOV: number;
    cannibalizationFlag: boolean;
    comparisonData: OfferComparisonData;
}

export interface OfferComparisonMetrics {
    period: string;
    revenue: number;
    margin: number;
}

export interface OfferComparisonData {
    on: OfferComparisonMetrics;
    off: OfferComparisonMetrics;
}

// Affiliates Types
export type AffiliateStatus = 'Active' | 'Pending' | 'Paused' | 'Declined';
export type AffiliateRiskFlag = 'Self-purchase' | 'Spike' | 'Duplicate Device' | 'Coupon Abuse';
export type CommissionStatus = 'On Hold' | 'Cleared' | 'Reversed';
export type PayoutStatus = 'Pending' | 'Approved' | 'Paid';

export interface AffiliatePartner {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: AffiliateStatus;
  commissionRate: number; // percentage
  clicks: number;
  conversions: number;
  epc: number; // earnings per click
  revenue: number;
  unpaidCommission: number;
  lastActive: string;
  riskFlags: AffiliateRiskFlag[];
  joinDate: string;
  uniqueCode: string;
  cookieWindow: number; // days
}

export interface CommissionLedgerEntry {
  id: string;
  orderId: string;
  productName: string;
  orderValue: number;
  commissionAmount: number;
  status: CommissionStatus;
  date: string;
}

export interface AffiliatePayout {
  id: string;
  date: string;
  amount: number;
  status: PayoutStatus;
}

export interface AffiliateLink {
  id: string;
  name: string;
  destinationUrl: string;
  shortlink: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

// Payouts & Finance Types
export type FinancePayoutStatus = 'Pending' | 'Approved' | 'Paid' | 'Hold';
export type RefundRequestStatus = 'Requested' | 'Approved' | 'Rejected' | 'Processed';
export type RefundReason = 'Duplicate Charge' | 'Product Not As Described' | 'Accidental Purchase' | 'Fraudulent' | 'Other';


export interface Payout {
  id: string;
  payeeName: string;
  payeeAvatarUrl: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  status: FinancePayoutStatus;
  scheduledDate: string;
  notes: string | null;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerAvatarUrl: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  reason: RefundReason;
  status: RefundRequestStatus;
  dateOpened: string;
  notes: string[];
  fraudScore: number; // 0-100
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';
export type RefundStatus = 'None' | 'Partial' | 'Full';

export interface OrderProduct {
    name: string;
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    customerAvatarUrl: string;
    date: string;
    products: OrderProduct[];
    totalAmount: number;
    currency: 'USD' | 'EUR' | 'GBP';
    paymentStatus: PaymentStatus;
    refundStatus: RefundStatus;
    channel: 'YouTube' | 'TikTok' | 'Instagram' | 'Direct';
    affiliateName: string | null;
    invoiceId: string;
}