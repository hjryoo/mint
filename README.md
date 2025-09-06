## 🚀 Overview

SignalMint is a comprehensive creator monetization platform designed for the modern creator economy. It combines e-commerce, analytics, and community features into a single, powerful toolkit that helps creators turn their content into sustainable revenue streams.

### Key Features

- **🛍️ Commerce + Analytics Integration**: Unified toolkit combining product sales with channel-level attribution
- **📊 Revenue Intelligence**: LTV, retention analysis, and channel ROI insights purpose-built for creators
- **🎯 Niche-First Templates**: Pre-built templates for fitness, education, design, and development creators
- **💰 Built-in Monetization**: Bundles, coupons, upsells, cross-sells, and affiliate programs
- **📈 Multi-Channel Attribution**: Track YouTube, TikTok, Instagram, newsletter, and affiliate performance

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)

## 📁 Project Structure

```
signalmint/
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/               # App router pages
│   │   ├── components/        # Reusable UI components
│   │   └── lib/              # Client-side utilities
│   └── api/                   # Node.js/Express backend
│       ├── routes/           # API route handlers
│       ├── models/           # Database models
│       ├── services/         # Business logic
│       └── middleware/       # Express middleware
├── packages/
│   ├── ui/                    # Shared UI component library
│   ├── db/                    # Database schema & migrations
│   ├── analytics/             # Analytics utilities
│   └── payments/              # Payment processing
├── docs/                      # Documentation
├── scripts/                   # Build and deployment scripts
└── config/                    # Configuration files
```

## 🎯 Core Features

### 1. Product Catalog Management
- **Course Builder**: Curriculum editor with modules, lessons, and drip schedules
- **Template Store**: File versioning, compatibility tracking, and update notifications
- **Preset Marketplace**: Digital asset packaging with license management

### 2. Monetization Toolkit
- **Bundles & Offers**: Dynamic pricing, savings calculators, and promotional campaigns
- **Subscription Management**: MRR tracking, churn prevention, and upgrade flows
- **Affiliate Program**: Partner management, commission tracking, and payout automation

### 3. Analytics & Intelligence
- **Channel Attribution**: First-touch, last-touch, and time-decay models
- **LTV & Retention**: Cohort analysis and customer lifecycle insights
- **Revenue Analytics**: Product performance, offer impact, and margin analysis

### 4. Storefront Builder
- **No-Code Editor**: Drag-and-drop sections with responsive preview
- **Conversion Optimization**: Built-in A/B testing and checkout optimization
- **SEO & Performance**: Automated optimization and Core Web Vitals monitoring

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: Custom design system with accessibility focus
- **Charts**: Lightweight charting library for analytics

### Backend
- **Runtime**: Node.js 18+ (TypeScript)
- **Framework**: Express.js with middleware ecosystem
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis for session and analytics cache

### Payments & Analytics
- **Payments**: Stripe/Paddle integration with webhook handling
- **Analytics**: Segment → Mixpanel pipeline
- **CDN**: Global asset delivery for digital products
- **Monitoring**: Structured logging and error tracking

### Infrastructure
- **Hosting**: Vercel (frontend) + Railway/Render (backend)
- **Database**: Managed PostgreSQL (PlanetScale/Neon)
- **File Storage**: AWS S3 or Cloudflare R2
- **Email**: Transactional email service integration
