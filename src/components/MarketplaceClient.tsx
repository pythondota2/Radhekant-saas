"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plane, 
  Sofa, 
  Sparkles, 
  Hammer, 
  Search, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Luggage, 
  Store, 
  Star,
  Users,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import FlightBookingModal, { FlightItem } from "./FlightBookingModal";
import ProductDetailModal, { ProductItem } from "./ProductDetailModal";

interface MarketplaceClientProps {
  initialFlights: FlightItem[];
  initialProducts: ProductItem[];
}

export default function MarketplaceClient({
  initialFlights,
  initialProducts,
}: MarketplaceClientProps) {
  const { persona } = useApp();
  const [activeTab, setActiveTab] = useState<"FLIGHTS" | "FURNITURE" | "DECOR" | "HARDWARE">("FLIGHTS");

  // Flight filter state
  const [originFilter, setOriginFilter] = useState("");
  const [destFilter, setDestFilter] = useState("");
  const [flights, setFlights] = useState<FlightItem[]>(initialFlights);

  // Selected modals state
  const [selectedFlight, setSelectedFlight] = useState<FlightItem | null>(null);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const isAgent = persona === "AGENT";

  // Filter flights
  const filteredFlights = flights.filter((f) => {
    const matchesOrigin = originFilter ? f.originCode.toLowerCase().includes(originFilter.toLowerCase()) || f.originCity.toLowerCase().includes(originFilter.toLowerCase()) : true;
    const matchesDest = destFilter ? f.destinationCode.toLowerCase().includes(destFilter.toLowerCase()) || f.destinationCity.toLowerCase().includes(destFilter.toLowerCase()) : true;
    return matchesOrigin && matchesDest;
  });

  const furnitureProducts = initialProducts.filter((p) => p.categoryType === "FURNITURE");
  const decorProducts = initialProducts.filter((p) => p.categoryType === "HOME_DECOR");
  const hardwareProducts = initialProducts.filter((p) => p.categoryType === "HARDWARE");

  const handleBookFlightClick = (flight: FlightItem) => {
    setSelectedFlight(flight);
    setIsFlightModalOpen(true);
  };

  const handleBookingSuccess = (flightId: string, bookedSeats: number) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === flightId ? { ...f, availableSeats: Math.max(0, f.availableSeats - bookedSeats) } : f
      )
    );
  };

  const handleProductClick = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>India&apos;s First Integrated Travel & Physical Multi-Commerce SaaS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-balance leading-tight">
            Domestic Offline Flight Inventory, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              Luxury Furniture & Hardware
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Consolidators & travel agents book confirmed fixed-departure domestic flights with instant PNR. Sourced Chinese & Indian ready-made furniture, decor, and bulk hardware supply.
          </p>

          {/* Quick Persona Info pill */}
          {isAgent && (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-medium animate-pulse">
              ✈️ Logged in as Agent: SkyAir Holidays (Viewing B2B Net Wholesale Rates & Wallet)
            </div>
          )}
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab("FLIGHTS")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "FLIGHTS"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Domestic Flights ({flights.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("FURNITURE")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "FURNITURE"
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Sofa className="w-4 h-4" />
              <span>Ready-Made Furniture ({furnitureProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("DECOR")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "DECOR"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Home Decor ({decorProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("HARDWARE")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "HARDWARE"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Hammer className="w-4 h-4" />
              <span>Hardware Depot ({hardwareProducts.length})</span>
            </button>
          </div>

          <Link
            href="/agent/plans"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl border border-blue-200 transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Open Your Agent Store</span>
          </Link>
        </div>
      </section>

      {/* Tab 1: Domestic Flights (Fixed Departures) */}
      {activeTab === "FLIGHTS" && (
        <section id="flights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Flight Search / Filter Bar */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <Plane className="w-4 h-4" />
                <span>Search Guaranteed Fixed Departures (Offline Blocks)</span>
              </h2>
              <span className="text-[11px] text-slate-400">
                Live Seat Inventory • Zero GDS Booking Surcharge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block font-medium">
                  Origin City / Code (e.g. DEL, BOM, BLR)
                </label>
                <input
                  type="text"
                  placeholder="Enter origin (e.g. DEL or Delhi)"
                  value={originFilter}
                  onChange={(e) => setOriginFilter(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block font-medium">
                  Destination City / Code (e.g. GOX, SXR, DEL)
                </label>
                <input
                  type="text"
                  placeholder="Enter destination (e.g. GOX or Goa)"
                  value={destFilter}
                  onChange={(e) => setDestFilter(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setOriginFilter("");
                    setDestFilter("");
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-semibold transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Flights Grid List */}
          <div className="space-y-4">
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 text-sm">No flight blocks matching your sector search.</p>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Airline & Route */}
                  <div className="flex items-center gap-4 min-w-[280px]">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-blue-900 text-base shadow-sm">
                      {flight.airlineCode}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {flight.airlineName}
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-mono">
                          {flight.flightNumber}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>📅 {flight.travelDate}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                          {flight.availableSeats} Seats Left
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flight Times & Duration */}
                  <div className="flex items-center justify-between sm:justify-start gap-6 sm:gap-10 text-center">
                    <div className="text-left">
                      <div className="text-xl font-black text-slate-900">{flight.departureTime}</div>
                      <div className="text-xs font-bold text-slate-700">{flight.originCode}</div>
                      <div className="text-[11px] text-slate-400">{flight.originCity}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Non-stop</span>
                      <div className="w-24 sm:w-32 h-[2px] bg-slate-200 relative my-1.5 flex items-center justify-center">
                        <Plane className="w-3.5 h-3.5 text-blue-600 absolute" />
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Luggage className="w-3 h-3" /> {flight.baggageInfo}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-slate-900">{flight.arrivalTime}</div>
                      <div className="text-xs font-bold text-slate-700">{flight.destinationCode}</div>
                      <div className="text-[11px] text-slate-400">{flight.destinationCity}</div>
                    </div>
                  </div>

                  {/* Seller Agency & Price Action */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-left lg:text-right">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        Issued by
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        {flight.sellerName}
                      </div>

                      {/* Pricing view depending on persona */}
                      {isAgent ? (
                        <div className="mt-1">
                          <div className="text-[10px] text-amber-700 font-bold uppercase">
                            B2B Net Rate
                          </div>
                          <div className="text-xl font-black text-amber-900">
                            {formatINR(flight.netFare)}
                          </div>
                          <div className="text-[10px] text-slate-400 line-through">
                            Retail: {formatINR(flight.retailFare)}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <div className="text-[10px] text-slate-500 uppercase">Per Passenger</div>
                          <div className="text-xl font-black text-slate-900">
                            {formatINR(flight.retailFare)}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleBookFlightClick(flight)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 ${
                        isAgent
                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <span>{isAgent ? "Agent Book & Markup" : "Book Confirmed Seat"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* Tab 2: Ready-Made Furniture */}
      {activeTab === "FURNITURE" && (
        <section id="furniture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Ready-Made Imported & Domestic Furniture
              </h2>
              <p className="text-xs text-slate-500">
                Direct factory imports from China and certified artisan woodcraft studios in India.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Heavy Freight Surface Transit Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furnitureProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {p.isFlagship && (
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-400/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Radhekant Flagship ({p.sourceCountry})
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                    Vol: {p.cbmVolume || 1.2} CBM
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">
                      Sold by {p.sellerName}
                    </div>
                    <Link href={`/product/${p.slug}`} className="block group/title">
                      <h3 className="text-sm font-bold text-slate-900 group-hover/title:text-amber-800 transition line-clamp-1 mt-0.5">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                      {p.description}
                    </p>
                    {p.dimensions && (
                      <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                        📐 {p.dimensions}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Price (Incl. GST)</div>
                      <div className="text-base font-black text-slate-900">
                        {isAgent && p.priceB2B ? formatINR(p.priceB2B) : formatINR(p.priceB2C)}
                      </div>
                      {isAgent && p.priceB2B && (
                        <div className="text-[10px] text-amber-800 font-semibold">
                          B2B Trade Wholesale
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleProductClick(p)}
                        className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/product/${p.slug}`}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
                      >
                        Reviews & Buy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: Home Decor */}
      {activeTab === "DECOR" && (
        <section id="decor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Statement Home Decor & Artisan Lighting
            </h2>
            <p className="text-xs text-slate-500">
              Hand-hammered brass chandeliers, ambient pendants, and architectural accents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decorProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-rose-400 hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {p.isFlagship && (
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-rose-300 text-[10px] font-bold px-2.5 py-1 rounded-md">
                      Artisan Curated
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">
                      Sold by {p.sellerName}
                    </div>
                    <Link href={`/product/${p.slug}`} className="block group/title">
                      <h3 className="text-sm font-bold text-slate-900 group-hover/title:text-rose-800 transition line-clamp-1 mt-0.5">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-black text-slate-900">
                        {isAgent && p.priceB2B ? formatINR(p.priceB2B) : formatINR(p.priceB2C)}
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleProductClick(p)}
                        className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/product/${p.slug}`}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
                      >
                        Reviews & Buy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 4: Hardware Depot */}
      {activeTab === "HARDWARE" && (
        <section id="hardware" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Architectural Hardware & Commercial Supply Depot
              </h2>
              <p className="text-xs text-slate-500">
                Grade 304 stainless steel fittings, hydraulic hinges, mortise locks, and tools for contractors.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
              Wholesale Slabs for Contractors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-800 hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    HSN {p.hsnCode} (18% GST)
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">
                      Distributor: {p.sellerName}
                    </div>
                    <Link href={`/product/${p.slug}`} className="block group/title">
                      <h3 className="text-sm font-bold text-slate-900 group-hover/title:text-slate-800 transition line-clamp-1 mt-0.5">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                      {p.description}
                    </p>

                    {p.bulkSlabs && p.bulkSlabs.length > 0 && (
                      <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-2 text-[11px] text-blue-900">
                        📦 Tiered Pricing: As low as{" "}
                        <strong>{formatINR(p.bulkSlabs[p.bulkSlabs.length - 1].unitPrice)}</strong> for 21+ units
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-black text-slate-900">
                        {isAgent && p.priceB2B ? formatINR(p.priceB2B) : formatINR(p.priceB2C)}
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleProductClick(p)}
                        className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                      >
                        Quick Slabs
                      </button>
                      <Link
                        href={`/product/${p.slug}`}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-white bg-slate-900 hover:bg-black transition"
                      >
                        Reviews & Bulk
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SaaS Monetization & Agent Recruitment Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-blue-900/50">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              Start Your Own Digital Business
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Sell Your Own Flights, Furniture & Hardware on Radhekant
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Are you a travel agent holding offline group seats? Or a furniture artisan/contractor? 
              Get your own branded storefront, dynamic markup tools, and white-label e-tickets with an annual agent membership.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                href="/agent/plans"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition"
              >
                <span>View Agent Membership Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/store/skyair-holidays"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl border border-white/20 transition"
              >
                <span>Preview Sample Agent Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
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
