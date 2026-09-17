"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plane, 
  Sofa, 
  Sparkles, 
  Hammer, 
  Store, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Luggage, 
  Truck, 
  Clock, 
  Wallet, 
  Building2, 
  Ruler, 
  Star,
  Layers,
  ChevronRight,
  ExternalLink,
  Users
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import FlightBookingModal, { FlightItem } from "./FlightBookingModal";
import ProductDetailModal, { ProductItem } from "./ProductDetailModal";
import PromoBannerCarousel from "./PromoBannerCarousel";

interface LandingPageClientProps {
  featuredFlights: FlightItem[];
  featuredProducts: ProductItem[];
  agents: {
    name: string;
    slug: string;
    category: string;
    city: string;
    bio: string;
    listingsCount: number;
    phone: string;
  }[];
}

export default function LandingPageClient({
  featuredFlights,
  featuredProducts,
  agents,
}: LandingPageClientProps) {
  const { persona } = useApp();
  const isAgent = persona === "AGENT";

  // Modal states for live interaction from landing page
  const [selectedFlight, setSelectedFlight] = useState<FlightItem | null>(null);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [flightsList, setFlightsList] = useState<FlightItem[]>(featuredFlights);

  const handleBookingSuccess = (flightId: string, bookedSeats: number) => {
    setFlightsList((prev) =>
      prev.map((f) =>
        f.id === flightId ? { ...f, availableSeats: Math.max(0, f.availableSeats - bookedSeats) } : f
      )
    );
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Modern, Bold, High Conversion */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 sm:pt-20 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
        
        <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>India&apos;s Integrated Multi-Commerce & Flight SaaS Engine</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.15] text-balance">
            Domestic Offline Flights, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              Ready-Made Furniture & Hardware
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            A unified digital marketplace. Travel agents book guaranteed fixed-departure seat blocks with instant PNRs. Businesses source imported Chinese furniture, artisan decor, and contractor hardware depot.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/flights"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
            >
              <Plane className="w-4 h-4" />
              <span>Book Domestic Flights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/marketplace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl border border-slate-700 transition"
            >
              <Sofa className="w-4 h-4 text-amber-400" />
              <span>Browse Marketplace</span>
            </Link>

            <Link
              href="/agent/plans"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition"
            >
              <Store className="w-4 h-4" />
              <span>Join as an Agent</span>
            </Link>
          </div>

          {/* Quick Pillar Cards on Mobile & Desktop */}
          <div className="pt-6 sm:pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <Link
              href="/flights"
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                  Fixed Flights
                </div>
                <div className="text-[10px] text-slate-400">Offline PNR blocks</div>
              </div>
            </Link>

            <Link
              href="/marketplace#furniture"
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Sofa className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                  Furniture
                </div>
                <div className="text-[10px] text-slate-400">Imported Sofas & Sets</div>
              </div>
            </Link>

            <Link
              href="/marketplace#hardware"
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-500/20 text-slate-300 flex items-center justify-center">
                <Hammer className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white group-hover:text-slate-200 transition">
                  Hardware Depot
                </div>
                <div className="text-[10px] text-slate-400">SS 304 Contractor Slabs</div>
              </div>
            </Link>

            <Link
              href="/stores"
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                  Agent Stores
                </div>
                <div className="text-[10px] text-slate-400">Micro-Storefronts</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL TRADE BANNERS */}
      <PromoBannerCarousel />

      {/* 2. SPOTLIGHT 1: DOMESTIC OFFLINE FLIGHT ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Plane className="w-4 h-4" />
              <span>Offline Inventory Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Domestic Fixed Departures & Block Seats
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Pre-purchased block inventory on IndiGo, Air India & Akasa. Zero surge pricing, instant PNR allotment, and white-label agent e-tickets.
            </p>
          </div>

          <Link
            href="/flights"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition group"
          >
            <span>Search All Flight Sectors</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile: Horizontal Swipeable Snap-Slider / Desktop: Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
          {flightsList.slice(0, 3).map((f) => (
            <div
              key={f.id}
              className="min-w-[280px] sm:min-w-0 flex-1 snap-center bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-900 font-bold flex items-center justify-center text-xs">
                      {f.airlineCode}
                    </span>
                    <span className="font-bold text-slate-800">{f.airlineName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{f.flightNumber}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {f.availableSeats} seats
                  </span>
                </div>

                {/* Sector Diagram */}
                <div className="flex items-center justify-between py-4 text-center">
                  <div className="text-left">
                    <div className="text-2xl font-black text-slate-900">{f.originCode}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[80px]">{f.originCity}</div>
                    <div className="text-xs font-bold text-blue-700 mt-1">{f.departureTime}</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Non-stop</span>
                    <div className="w-14 sm:w-20 h-[1.5px] bg-slate-200 my-1 relative flex items-center justify-center">
                      <Plane className="w-3 h-3 text-blue-600 absolute" />
                    </div>
                    <span className="text-[9px] text-slate-400">{f.travelDate}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">{f.destinationCode}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[80px]">{f.destinationCity}</div>
                    <div className="text-xs font-bold text-blue-700 mt-1">{f.arrivalTime}</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-amber-500" /> {f.baggageInfo}
                  </span>
                  <span className="text-slate-400 truncate max-w-[120px]">
                    Issued by: {f.sellerName}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    {isAgent ? "B2B Net Fare" : "Per Passenger"}
                  </div>
                  <div className="text-lg font-black text-slate-900">
                    {formatINR(isAgent ? f.netFare : f.retailFare)}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedFlight(f);
                    setIsFlightModalOpen(true);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5 ${
                    isAgent
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <span>{isAgent ? "Agent Book" : "Book Seat"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPOTLIGHT 2: CENTRAL MARKETPLACE CATALOG (FURNITURE & HARDWARE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Sofa className="w-4 h-4" />
              <span>Physical Commerce</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Ready-Made Furniture & Hardware Depot
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Factory imports from China, seasoned Indian Sheesham woodcraft, and SS 304 commercial fittings with nationwide heavy freight.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition group"
          >
            <span>View Full Marketplace Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile: Horizontal Swipeable Snap-Slider / Desktop: Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
          {featuredProducts.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="min-w-[280px] sm:min-w-0 flex-1 snap-center bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-xl transition flex flex-col justify-between group"
            >
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {p.isFlagship && (
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Flagship Import ({p.sourceCountry})
                  </div>
                )}
                {p.cbmVolume && (
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                    Vol: {p.cbmVolume} CBM
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">
                    Sold by {p.sellerName}
                  </div>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition line-clamp-1 mt-0.5">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {p.description}
                  </p>
                  {p.dimensions && (
                    <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                      📐 {p.dimensions}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Price (Incl. GST)</div>
                    <div className="text-base font-black text-slate-900">
                      {isAgent && p.priceB2B ? formatINR(p.priceB2B) : formatINR(p.priceB2C)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/product/${p.slug}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
                    >
                      Reviews & Specs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPOTLIGHT 3: AGENT STOREFRONTS & PARTNER NETWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Store className="w-4 h-4" />
              <span>Multi-Agent SaaS Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Verified Agent Micro-Storefronts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Every registered agent gets their own dedicated public URL to share on WhatsApp with verified badge, contact phone, and exclusive listings.
            </p>
          </div>

          <Link
            href="/stores"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition group"
          >
            <span>Explore All Partner Stores</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {agents.map((ag) => (
            <div
              key={ag.slug}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow">
                    {ag.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{ag.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </h3>
                    <div className="text-[11px] text-slate-400">{ag.city} • {ag.category}</div>
                  </div>
                </div>

                <span className="bg-blue-50 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-200">
                  {ag.listingsCount} Live Listings
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {ag.bio}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Contact: <strong>{ag.phone}</strong></span>
                <Link
                  href={`/store/${ag.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>Visit Storefront</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SPOTLIGHT 4: SAAS MONETIZATION & JOINING FEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-blue-900/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Monetization & Agent SaaS Engine
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Start Your Digital Agency On Radhekant
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Are you a travel agent holding offline flight blocks? Or a furniture artisan/distributor? Join hundreds of verified partners. Pay an annual joining fee, upload your inventory, set your own markups, and issue white-label tickets.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-amber-400 font-bold">Starter: ₹4,999/yr</div>
                <div className="text-[10px] text-slate-400">25 Flights • 50 Products</div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-amber-400/40">
                <div className="text-amber-300 font-bold">Pro: ₹11,999/yr</div>
                <div className="text-[10px] text-slate-300">White-Label E-Tickets</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                <div className="text-purple-300 font-bold">Enterprise</div>
                <div className="text-[10px] text-slate-400">Unlimited Multi-Store</div>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/agent/plans"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition"
              >
                <span>View All Plans & Pay Joining Fee</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Bank Settlement (India)</span>
            </h3>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Account Name:</span>
                <span className="font-semibold text-white">Radhekant Tech Pvt Ltd</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>Bank:</span>
                <span className="text-white">ICICI Bank, Connaught Place</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span>UPI VPA:</span>
                <span className="font-mono text-amber-300 font-bold">radhekant@icici</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              ✓ 1-click verification by Master Admin upon UTR submission.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TRUST & INDIAN LOGISTICS PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Plane className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900">Guaranteed Seat Blocks</div>
            <div className="text-[11px] text-slate-500">Row-locked offline PNR issuance</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Truck className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900">Heavy Freight Transit</div>
            <div className="text-[11px] text-slate-500">15,000+ PIN codes for furniture</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900">Full GST Invoicing</div>
            <div className="text-[11px] text-slate-500">SAC 9964 & HSN 9403 / 8302</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900">Advance Deposit Wallet</div>
            <div className="text-[11px] text-slate-500">Instant friction-free bookings</div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Quick-Action Bar on Mobile Devices */}
      <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
        <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between text-xs">
          <Link href="/flights" className="flex items-center gap-1.5 font-bold text-blue-400">
            <Plane className="w-4 h-4" /> Flights
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/marketplace" className="flex items-center gap-1.5 font-bold text-amber-400">
            <Sofa className="w-4 h-4" /> Store
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/agent/plans" className="flex items-center gap-1.5 font-bold text-emerald-400">
            <Store className="w-4 h-4" /> Join Agent
          </Link>
        </div>
      </div>

      {/* Modals for live interaction */}
      <FlightBookingModal
        flight={selectedFlight}
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />

    </div>
  );
}
