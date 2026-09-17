# Implementation Plan - Radhekant Multi-Agent B2B/B2C SaaS Platform

A multi-agent / multi-vendor SaaS platform designed for the Indian market where:
1. **Monetization Engine (The Client's Primary Income)**: Master Admin charges agents a **Platform Joining / Membership Subscription Fee** to access selling tools and storefronts.
2. **Decentralized Multi-Agent Inventory**: Each registered, approved agent can list and manage **their own offline flight tickets, ready-made furniture, home decor, or hardware supplies**.
3. **Master Admin's Flagship Store**: The Master Admin (your client) also acts as an anchor seller, listing his own imported Chinese & Indian ready-made furniture, decor, and domestic flight blocks.
4. **Agent Storefronts & Central Marketplace**: Public marketplace with tabbed search (Flights, Furniture, Decor, Hardware) plus dedicated micro-storefronts for each agent.

---

## User Review Required

> [!IMPORTANT]
> **Clarified Business & Monetization Architecture**:
> - **Joining / Membership Fee System**: Agents register and choose a Membership Plan (e.g., Starter, Professional, Enterprise) to unlock inventory listing privileges.
> - **Self-Service Agent Inventory**: Agents manage their own flight seat allotments, pricing, passenger lists, and physical goods.
> - **Master Admin Super-Oversight**: The client can inspect all agent listings, suspend fraudulent accounts, manage joining fees, and run their own flagship catalog.

> [!TIP]
> **Why this is actually simpler and safer for you**:
> Instead of building a complex central clearinghouse where your client takes on liability for everyone else's flights, each agent manages their own tickets, PNR issuance, and orders. The client's business model is clean: **collect membership fees + sell his own flagship goods**.

---

## Proposed System Architecture

```
                               ┌────────────────────────────────────────┐
                               │       Next.js 15 Full-Stack App        │
                               │  (App Router, TypeScript, Tailwind)    │
                               └──────────────────┬─────────────────────┘
                                                  │
                ┌─────────────────────────────────┼────────────────────────────────┐
                ▼                                 ▼                                ▼
     ┌───────────────────────┐       ┌───────────────────────┐       ┌────────────────────────┐
     │   Public Marketplace  │       │  Agent SaaS Dashboard │       │   Super Admin Portal   │
     │  - Central Flight Hub │       │  - Pay Joining Fee    │       │  - Membership Plans    │
     │  - Furniture & Decor  │       │  - My Flight Inventory│       │  - Agent KYC & Fees    │
     │  - Hardware Depot     │       │  - My Product Catalog │       │  - Platform-wide View  │
     │  - Agent Micro-Stores │       │  - My Bookings/Orders │       │  - Master Flagship Cat │
     └───────────────────────┘       └───────────────────────┘       └────────────────────────┘
                │                                 │                                │
                └─────────────────────────────────┼────────────────────────────────┘
                                                  ▼
                               ┌────────────────────────────────────────┐
                               │            Prisma ORM Layer            │
                               │      (Multi-Tenant Data Modeling)      │
                               └──────────────────┬─────────────────────┘
                                                  ▼
                               ┌────────────────────────────────────────┐
                               │         PostgreSQL Database            │
                               │  Users, Memberships, Multi-Vendor      │
                               │  Flights, Products, Bookings, Orders   │
                               └────────────────────────────────────────┘
```

---

## Key Modules & Implementation Phases

### Phase 1: Project Foundation & Multi-Tenant Data Schema
* **Next.js 15 Setup**: TypeScript, Tailwind CSS, Lucide React, Shadcn UI primitives.
* **Prisma Schema Design**:
  * `User` & `AgentProfile`: Role (`SUPER_ADMIN`, `AGENT`, `CUSTOMER`), agency name, logo, bio, contact, GSTIN, PAN, KYC status.
  * `MembershipPlan` & `AgentSubscription`: Plan name, fee (INR), duration, max flight listings, max product listings, payment status (`PENDING_APPROVAL`, `ACTIVE`, `EXPIRED`).
  * `FlightInventory`: Owned by `sellerId` (either Admin or specific Agent). Route (DEL-GOI, etc.), airline, flight number, travel date, seats, price, cutoff, PNR type.
  * `FlightBooking` & `Passenger`: Customer/agent booking record, passenger manifest, status, assigned PNR, e-ticket generation.
  * `Product` & `Category`: Owned by `sellerId`. Category (Furniture, Home Decor, Hardware), images, dimensions, CBM, materials, pricing (B2C & B2B bulk tiers), stock.
  * `Order` & `OrderItem`: Multi-vendor order support with line-item seller tracking.
* **Seed Engine**: Pre-populate membership tiers, sample agent accounts, client's flagship imported furniture/decor, and realistic domestic flight sectors.

### Phase 2: Agent Membership & Onboarding Portal
* **Agent Registration & Plan Selection**:
  * Step 1: Agent signs up with agency name, phone, email, and city.
  * Step 2: Selects a Membership Plan (e.g., Annual Starter ₹4,999, Pro ₹11,999).
  * Step 3: Payment via UPI / QR / Bank Transfer (UTR proof upload) or online gateway.
* **Super Admin Membership Desk**:
  * Super Admin views pending agent registrations and verifies UTR / payment.
  * 1-Click "Approve & Activate" agent account.

### Phase 3: Decentralized Inventory Management (Flight Desk + Product Desk)
* **Agent Flight Desk**:
  * Agents add their own fixed-departure flight blocks (IndiGo, Air India, etc.).
  * Set total seats, travel date, departure/arrival times, and selling price.
  * Monitor seat availability and incoming customer bookings.
  * Enter PNR / upload tickets when booked.
* **Agent Product Desk**:
  * Agents list their own ready-made furniture, decor items, or hardware supplies.
  * Set images, descriptions, dimensions, stock levels, and pricing.
* **Super Admin Flagship Store**:
  * Super Admin can list their own imported Chinese sofas, marble dining tables, luxury home decor, and flight blocks, which get "Verified Flagship" badges.

### Phase 4: Public Marketplace & Agent Micro-Storefronts
* **Central Marketplace**:
  * Tabbed search: **Flights** (origin, destination, date) | **Furniture** | **Home Decor** | **Hardware**.
  * Shows seller badge for each listing (e.g. "Sold by: Radhekant Flagship" or "Sold by: SkyAir Holidays").
* **Agent Dedicated Storefronts**:
  * Shareable link for each agent (e.g. `/agent/[slug]` or `/store/[slug]`) showing only that agent's flight inventory and products with their branding, phone, and WhatsApp chat button.
* **Instant E-Ticket Generator**:
  * Automatically generates professional airline-style PDF e-tickets with the seller agent's agency branding and PNR.

---

## Verification Plan

### Automated Checks
* Strict TypeScript compilation (`npx tsc --noEmit`) to verify multi-tenant relations.
* Prisma validation and migration sanity tests.

### Manual Verification Flow
1. **Agent Onboarding**: Register new agent "AeroGo Travel" ➔ Select Pro Plan ➔ Submit UTR.
2. **Admin Approval**: Login as Super Admin ➔ Approve AeroGo Travel ➔ AeroGo dashboard unlocks.
3. **Agent Listing**: AeroGo logs in ➔ Adds 10 seats for DEL ➔ BOM at ₹4,800.
4. **Flagship Listing**: Super Admin adds a 6-Seater Italian Marble Dining Table under Flagship Furniture.
5. **Customer Experience**: Customer searches DEL ➔ BOM ➔ Sees AeroGo's seats ➔ Books 1 seat ➔ E-ticket generated with AeroGo branding.
6. **Marketplace Verification**: Customer browses Furniture ➔ Sees Master Admin's Italian Dining Table with Flagship badge.
