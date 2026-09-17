"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Plane, 
  Sofa, 
  Hammer, 
  Sparkles, 
  Store, 
  ShieldCheck, 
  Layers, 
  Menu,
  X,
  ChevronDown,
  Package,
  Wrench,
  Truck,
  Plus
} from "lucide-react";

export type Persona = "CUSTOMER" | "AGENT" | "SUPER_ADMIN";

interface NavbarProps {
  currentPersona?: Persona;
  onPersonaChange?: (persona: Persona) => void;
}

export default function Navbar({
  currentPersona = "CUSTOMER",
  onPersonaChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner for Persona Switcher - Mobile & Tablet Responsive */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Interactive Multi-Tenant Demo
          </span>
          <span className="text-slate-400 hidden md:inline text-[11px]">
            Test marketplace as:
          </span>
        </div>

        {/* Persona toggle buttons */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 w-full sm:w-auto justify-center">
          <button
            onClick={() => onPersonaChange?.("CUSTOMER")}
            className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              currentPersona === "CUSTOMER"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            👤 Buyer
          </button>
          <button
            onClick={() => onPersonaChange?.("AGENT")}
            className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              currentPersona === "AGENT"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            ✈️ Agent (SkyAir)
          </button>
          <button
            onClick={() => onPersonaChange?.("SUPER_ADMIN")}
            className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              currentPersona === "SUPER_ADMIN"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            👑 Super Admin
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-lg leading-tight tracking-tight">
                  RADHEKANT
                </span>
                <span className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase hidden sm:block">
                  Multi-Commerce & Travel SaaS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Flexible Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700">
            {/* Core Flight Search */}
            <Link
              href="/flights"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-700 transition flex items-center gap-2 text-xs font-bold"
            >
              <Plane className="w-4 h-4 text-blue-600" />
              <span>Domestic Flights</span>
            </Link>

            {/* Flexible Category Dropdown (Adapts to any products or services agents sell) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1.5 text-xs font-bold"
              >
                <Package className="w-4 h-4 text-amber-600" />
                <span>Categories & Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Current Portfolios
                  </div>

                  <Link
                    href="/marketplace#furniture"
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Sofa className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Ready-Made Furniture</div>
                      <div className="text-[10px] text-slate-400 font-normal">China & Indian Factory Imports</div>
                    </div>
                  </Link>

                  <Link
                    href="/marketplace#decor"
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Home Decor & Lighting</div>
                      <div className="text-[10px] text-slate-400 font-normal">Chandeliers, Wall Accents & Brass</div>
                    </div>
                  </Link>

                  <Link
                    href="/marketplace#hardware"
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                      <Hammer className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Hardware Supplies</div>
                      <div className="text-[10px] text-slate-400 font-normal">Commercial SS 304 Fittings & Slabs</div>
                    </div>
                  </Link>

                  {/* Future extensibility teaser */}
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                      <Plus className="w-3 h-3 text-blue-600" />
                      <span>Custom Services & Goods</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                      Any new categories added by agents will appear here automatically.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Verified Partner Stores Link */}
            <Link
              href="/stores"
              className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1.5 text-xs font-bold text-slate-600"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Partner Stores</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/agent/plans"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl border border-blue-200 transition shadow-sm"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Become an Agent</span>
            </Link>

            {currentPersona === "AGENT" && (
              <Link
                href="/agent/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3.5 py-2 rounded-xl shadow-sm transition"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Agent Portal</span>
              </Link>
            )}

            {currentPersona === "SUPER_ADMIN" && (
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 px-3.5 py-2 rounded-xl shadow-sm transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean, Accessible, Tablet/Phone Optimized) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Navigation
          </div>

          <Link
            href="/flights"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-800 rounded-xl hover:bg-slate-50"
          >
            <Plane className="w-4 h-4 text-blue-600" />
            <span>Domestic Flights (Fixed Departures)</span>
          </Link>

          <Link
            href="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-blue-700 rounded-xl hover:bg-slate-50"
          >
            <Package className="w-4 h-4 text-blue-600" />
            <span>Browse Central Marketplace ➔</span>
          </Link>

          <Link
            href="/stores"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-emerald-700 rounded-xl hover:bg-slate-50"
          >
            <Store className="w-4 h-4 text-emerald-600" />
            <span>Partner Stores Directory</span>
          </Link>

          <div className="pt-1 pb-1 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Portfolios & Categories
            </div>
            <Link
              href="/marketplace#furniture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-50"
            >
              <Sofa className="w-4 h-4 text-amber-600" />
              <span>Ready-Made Furniture</span>
            </Link>
            <Link
              href="/marketplace#decor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-50"
            >
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Home Decor & Lighting</span>
            </Link>
            <Link
              href="/marketplace#hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-50"
            >
              <Hammer className="w-4 h-4 text-slate-600" />
              <span>Hardware Depot & Slabs</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/agent/plans"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs font-bold text-blue-700 bg-blue-50 py-3 rounded-xl border border-blue-200"
            >
              Become an Agent (Plans & Fees)
            </Link>
            <Link
              href="/agent/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs font-bold text-white bg-amber-600 py-3 rounded-xl shadow-sm"
            >
              Agent Portal & Flight Desk
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs font-bold text-white bg-purple-700 py-3 rounded-xl shadow-sm"
            >
              Super Admin Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
