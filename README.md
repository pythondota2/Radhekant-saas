# Radhekant Multipurpose B2B/B2C SaaS Platform

An integrated, enterprise-grade multi-tenant eCommerce and travel SaaS platform designed for Indian B2B trade, regional travel consolidators, and retail buyers.

---

## 🚀 Key Modules & Capabilities

### 1. Domestic Offline Flight Inventory Engine
- **Fixed Departures & Seat Blocks**: Pre-purchased group block seats on IndiGo, Air India, SpiceJet, and Akasa Air.
- **Zero Peak Surge Pricing**: Guaranteed wholesale seat allocations with no dynamic airline surge.
- **Instant PNR & White-Label E-Tickets**: Automated PNR issuance, airline barcode generation, passenger name manifests, and SAC 9964 GST compliance.
- **Dynamic B2B Agent Markup**: Travel agents set their own customized markup per passenger before generating customer quotes.

### 2. Central Multi-Commerce Flagship Catalog
- **Imported Ready-Made Furniture**: Direct factory imports from Foshan/Shunde (Milano luxury sectionals, natural Carrara marble dining sets).
- **Home Decor & Lighting**: Solid brass floor lamps, artisan chandeliers, and decor pieces.
- **Commercial Hardware Depot**: SS 304 soft-close hydraulic hinges and architectural mortise lock sets with tiered bulk wholesale slabs (HSN 8302).

### 3. Decentralized Multi-Agent SaaS Network
- **Annual Membership Tiers**: Starter (₹4,999/yr), Pro Consolidator (₹11,999/yr), and Enterprise Fleet (₹24,999/yr).
- **Dedicated Public Storefronts**: Every verified partner receives a branded URL (`/store/[slug]`) with verified trade badges, contact info, and direct WhatsApp links.
- **National Partner Directory**: Central registry at `/stores` with city filters and category chips across New Delhi, Mumbai, Bengaluru, and Moradabad.

### 4. Super Admin Master Console (`/admin/dashboard`)
- **Platform Settlement Settings**: Radhekant official ICICI Bank A/C, UPI VPA (`radhekant@icici`), GSTIN, PAN, and corporate address management.
- **Flight Engine Cutoff Policies**: Configurable PNR name list cutoff thresholds (24h/48h) and concurrency seat lock timers (10m).
- **SaaS Pricing & Quotas**: Real-time editor for annual joining fees, seat quotas, and catalog listing caps.
- **Promotional Banners Manager**: Interactive trade banner carousel controls on the homepage.
- **Agent UTR Verification Queue**: 1-click review and activation of NEFT/UPI joining payments.
- **Master Catalog CRUD**: Direct addition and inventory control of flagship Chinese furniture imports and flight seat blocks.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Actions)
- **UI Library**: [React 19](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) (SQLite default, PostgreSQL/Supabase ready)
- **Language**: TypeScript

---

## 🏁 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd radhekant-multipurpose-saas
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize Database & Seed Demo Data
```bash
npx prisma db push
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🗺️ Route Sitemap

| Route | Description |
| :--- | :--- |
| `/` | Unified Landing Page with Hero, Promotional Banner Carousel, and Category Spotlights |
| `/flights` | Domestic Offline Flight Search & Seat Allotment Hub |
| `/marketplace` | Central Multi-Commerce Catalog (Furniture, Decor, Hardware) |
| `/product/[slug]` | Product Detail Page with Specifications, CBM, Bulk Slabs, and Reviews |
| `/stores` | Verified Partner Stores National Directory |
| `/store/[slug]` | Dedicated Public Agent Micro-Storefront |
| `/agent/plans` | Agent Membership Onboarding & UTR Settlement Checkout |
| `/agent/dashboard` | Agent Management Console & Flight Reseller Desk |
| `/admin/dashboard` | Super Admin Master Command Console & Platform Settings |
