"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Store, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Plane, 
  Sofa, 
  Hammer, 
  ArrowRight, 
  Search, 
  MessageCircle,
  ExternalLink,
  Users,
  Sparkles
} from "lucide-react";

export interface AgentCardData {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  bio?: string | null;
  city: string;
  state: string;
  phone: string;
  whatsapp?: string | null;
  gstin?: string | null;
  categoryType: "FLIGHTS" | "FURNITURE" | "HARDWARE" | "MULTI";
  categoryLabel: string;
  flightsCount: number;
  productsCount: number;
}

interface StoresDirectoryClientProps {
  agents: AgentCardData[];
}

export default function StoresDirectoryClient({ agents }: StoresDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const filteredAgents = agents.filter((ag) => {
    const matchesSearch = 
      ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ag.bio && ag.bio.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      filterCategory === "ALL" || ag.categoryType === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Store className="w-3.5 h-3.5" />
          <span>Radhekant Verified Agent Network</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          Partner Stores & Digital Micro-Storefronts
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Discover verified travel consolidators, Sheesham furniture studios, and commercial hardware distributors across India. Direct booking and WhatsApp enquiry with each partner.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === "ALL"
                ? "bg-slate-900 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Partners ({agents.length})
          </button>
          <button
            onClick={() => setFilterCategory("FLIGHTS")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === "FLIGHTS"
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Flight Consolidators</span>
          </button>
          <button
            onClick={() => setFilterCategory("FURNITURE")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === "FURNITURE"
                ? "bg-amber-600 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sofa className="w-3.5 h-3.5" />
            <span>Furniture Studios</span>
          </button>
          <button
            onClick={() => setFilterCategory("HARDWARE")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterCategory === "HARDWARE"
                ? "bg-slate-800 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>Hardware Depots</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by agency or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((ag) => (
          <div
            key={ag.slug}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              {/* Agency Avatar & Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-900 text-white font-black text-base flex items-center justify-center shadow-md">
                    {ag.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                      {ag.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-blue-500" />
                      <span>{ag.city}, {ag.state}</span>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>

              {/* Category Specialty Badge */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                  {ag.categoryLabel}
                </span>
                {ag.gstin && (
                  <span className="text-[10px] font-mono text-slate-400">
                    GSTIN: {ag.gstin}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {ag.bio}
              </p>

              {/* Inventory stats */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                  <Plane className="w-3.5 h-3.5 text-blue-600" />
                  <span>{ag.flightsCount} Flight Sectors</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                  <Sofa className="w-3.5 h-3.5 text-amber-600" />
                  <span>{ag.productsCount} Products Listed</span>
                </div>
              </div>
            </div>

            {/* Bottom Contact & Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              {ag.whatsapp ? (
                <a
                  href={`https://wa.me/${ag.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <span className="text-xs text-slate-500">{ag.phone}</span>
              )}

              <Link
                href={`/store/${ag.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <span>Visit Storefront</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Become an Agent Callout */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-blue-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Are You A Travel Consolidator Or Manufacturer?
          </span>
          <h2 className="text-xl sm:text-3xl font-black">
            Get Your Own Branded Micro-Storefront on Radhekant
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Choose an agent plan, upload your domestic flight seats or physical products, and share your store link directly with clients.
          </p>
        </div>

        <Link
          href="/agent/plans"
          className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition"
        >
          View Plans & Join Today ➔
        </Link>
      </div>

    </div>
  );
}
