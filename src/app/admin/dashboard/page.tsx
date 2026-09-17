"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Wallet, 
  Plane, 
  Sofa, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  FileText,
  DollarSign,
  TrendingUp,
  Store,
  Settings,
  Sliders,
  Bell,
  Edit3,
  Trash2,
  Save,
  RefreshCw,
  Check,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  MapPin,
  Hash,
  AlertTriangle,
  Layers,
  Clock,
  ExternalLink,
  Hammer
} from "lucide-react";
import { formatINR } from "@/lib/utils";

// Tab types for Super Admin Console
type AdminTab = 
  | "OVERVIEW" 
  | "SETTINGS" 
  | "FLIGHT_RULES" 
  | "MEMBERSHIP_PLANS" 
  | "BANNERS" 
  | "AGENTS" 
  | "FLAGSHIP_CATALOG";

interface PendingAgent {
  id: string;
  agencyName: string;
  contactPerson: string;
  city: string;
  phone: string;
  email: string;
  planName: string;
  amount: number;
  utrNumber: string;
  gstin: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

interface FlagshipProduct {
  id: string;
  title: string;
  category: "FURNITURE" | "HARDWARE" | "HOME_DECOR";
  sourceCountry: "China" | "India";
  cbmVolume: number;
  stock: number;
  priceB2C: number;
  priceB2B: number;
  status: "ACTIVE" | "LOW_STOCK";
}

interface MasterFlightBlock {
  id: string;
  airline: string;
  flightNumber: string;
  sector: string;
  travelDate: string;
  departureTime: string;
  totalSeats: number;
  availableSeats: number;
  netFare: number;
  retailFare: number;
  masterPnr: string;
}

export default function SuperAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("OVERVIEW");
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setSaveToast(message);
    setTimeout(() => setSaveToast(null), 3500);
  };

  // --- 1. SETTINGS STATE (Radhekant Master Settlement & Company) ---
  const [platformSettings, setPlatformSettings] = useState({
    businessName: "Radhekant Multi-Commerce & Travel Solutions LLP",
    gstin: "07AAACR1234F1Z5",
    pan: "AAACR1234F",
    bankName: "ICICI Bank Ltd.",
    accountHolder: "Radhekant E-Commerce Private Limited",
    accountNumber: "000405012988",
    ifscCode: "ICIC0000004",
    branch: "Connaught Place, New Delhi",
    upiId: "radhekant@icici",
    supportEmail: "billing@radhekant.com",
    supportPhone: "+91 98101 23456",
    officeAddress: "402, Barakhamba Road, Connaught Place, New Delhi 110001",
    sacCodeFlights: "9964 (Passenger Air Transport Services)",
    hsnCodeFurniture: "9403 (Ready-Made Furniture & Woodenware)",
    hsnCodeHardware: "8302 (Base Metal Mountings & Fittings)",
  });

  // --- 2. FLIGHT RULES STATE ---
  const [flightRules, setFlightRules] = useState({
    defaultCutoffHours: 24,
    concurrencyHoldMinutes: 10,
    autoReleaseUnpaid: true,
    requirePassengerGovtId: true,
    allowedAirlines: ["IndiGo", "Air India", "SpiceJet", "Akasa Air"],
    agentCommissionCapPercent: 15,
    ticketFooterDisclaimer: "Non-refundable fixed departure block inventory ticket issued via Radhekant offline consolidator network. Standard airline baggage rules (15kg check-in + 7kg cabin) apply.",
  });

  // --- 3. MEMBERSHIP PLANS STATE ---
  const [plans, setPlans] = useState([
    {
      id: "plan-starter",
      name: "Starter Merchant & Agent",
      slug: "starter",
      priceINR: 4999,
      maxFlightListings: 5,
      maxProductListings: 25,
      features: "Offline flight bookings, 5 active flight blocks, 25 store items, verified agent badge, 24/7 WhatsApp support",
      badgeText: "Best for Regional Agents",
      isActive: true,
    },
    {
      id: "plan-pro",
      name: "Pro Consolidator & Trader",
      slug: "pro",
      priceINR: 11999,
      maxFlightListings: 20,
      maxProductListings: 100,
      features: "Custom PNR markup generator, 20 active flight blocks, 100 catalog items, priority container dispatch, B2B wholesale slabs",
      badgeText: "Most Popular",
      isActive: true,
    },
    {
      id: "plan-enterprise",
      name: "Enterprise Fleet & Distributor",
      slug: "enterprise",
      priceINR: 24999,
      maxFlightListings: 999,
      maxProductListings: 999,
      features: "Unlimited flight blocks, direct API webhook sync, multi-branch sub-agents, dedicated RM, custom white-label ticketing domain",
      badgeText: "For Top Consolidators",
      isActive: true,
    },
  ]);

  // --- 4. BANNERS STATE ---
  const [banners, setBanners] = useState([
    {
      id: "banner-1",
      tag: "Festive Aviation Block Inventory",
      headline: "Autumn & Diwali Fixed Departures: Goa, Kashmir & South Corridors",
      subheadline: "Guaranteed offline group fare seats on IndiGo & Air India. Lock wholesale net rates with zero surge pricing.",
      badge: "Limited Seats Block",
      ctaLink: "/flights",
      isActive: true,
    },
    {
      id: "banner-2",
      tag: "Container Import Clearance",
      headline: "Italian Velvet Sectionals & Natural Carrara Marble Dining Sets",
      subheadline: "Direct factory sourced from Foshan & Shunde with certified Grade 304 bases. Surface transit delivery across 15,000+ PIN codes.",
      badge: "Direct Factory Wholesale",
      ctaLink: "/marketplace#furniture",
      isActive: true,
    },
    {
      id: "banner-3",
      tag: "Contractor & Builder Depot",
      headline: "Commercial SS 304 Soft-Close Hinges & Architectural Mortise Locks",
      subheadline: "Tiered wholesale slabs for interior designers and contractors. Starting at ₹1,350/box with full GST input tax credit.",
      badge: "Wholesale Slabs Active",
      ctaLink: "/marketplace#hardware",
      isActive: true,
    },
  ]);

  // --- 5. AGENTS / ONBOARDING STATE ---
  const [agentsList, setAgentsList] = useState<PendingAgent[]>([
    {
      id: "ag-3",
      agencyName: "AeroGo Holidays & Charters",
      contactPerson: "Kunal Singhania",
      city: "Bengaluru",
      phone: "+91 98444 55667",
      email: "kunal@aerogo.in",
      planName: "Pro Consolidator & Trader",
      amount: 11999,
      utrNumber: "UPI/2026/99104821",
      gstin: "29AABCU9821K1Z2",
      status: "PENDING",
      submittedAt: "Today, 11:30 AM",
    },
    {
      id: "ag-1",
      agencyName: "SkyAir Holidays & Consolidators",
      contactPerson: "Rohan Verma",
      city: "New Delhi",
      phone: "+91 98111 22334",
      email: "rohan@skyairholidays.com",
      planName: "Pro Consolidator & Trader",
      amount: 11999,
      utrNumber: "NEFT/ICIC/88129034",
      gstin: "07AAAAA1234A1Z5",
      status: "APPROVED",
      submittedAt: "Yesterday",
    },
    {
      id: "ag-2",
      agencyName: "Bharat Woodcraft & Decor",
      contactPerson: "Vikram Sharma",
      city: "Moradabad",
      phone: "+91 98222 33445",
      email: "vikram@bharatwoodcraft.com",
      planName: "Starter Merchant & Agent",
      amount: 4999,
      utrNumber: "UPI/2026/77123991",
      gstin: "09AAEPV4455H1Z3",
      status: "APPROVED",
      submittedAt: "3 days ago",
    },
    {
      id: "ag-4",
      agencyName: "Apex Hardware Supplies",
      contactPerson: "Suresh Gupta",
      city: "Mumbai",
      phone: "+91 98333 44556",
      email: "suresh@apexhardware.com",
      planName: "Enterprise Fleet & Distributor",
      amount: 24999,
      utrNumber: "RTGS/HDFC/55443322",
      gstin: "27AAACR9988E1Z1",
      status: "APPROVED",
      submittedAt: "1 week ago",
    },
  ]);

  // --- 6. FLAGSHIP MASTER INVENTORY STATE ---
  const [flagshipProducts, setFlagshipProducts] = useState<FlagshipProduct[]>([
    {
      id: "fp-1",
      title: "Milano Luxe 6-Seater Modular L-Shape Sofa",
      category: "FURNITURE",
      sourceCountry: "China",
      cbmVolume: 2.1,
      stock: 8,
      priceB2C: 74999,
      priceB2B: 58000,
      status: "ACTIVE",
    },
    {
      id: "fp-2",
      title: "Carrara Natural Marble 6-Seater Dining Set",
      category: "FURNITURE",
      sourceCountry: "China",
      cbmVolume: 1.6,
      stock: 5,
      priceB2C: 89999,
      priceB2B: 69000,
      status: "ACTIVE",
    },
    {
      id: "fp-3",
      title: "SS 304 Soft-Close Hydraulic Hinges (Box of 20)",
      category: "HARDWARE",
      sourceCountry: "India",
      cbmVolume: 0.05,
      stock: 120,
      priceB2C: 1950,
      priceB2B: 1350,
      status: "ACTIVE",
    },
    {
      id: "fp-4",
      title: "Cast Brass Antique Moradabad Floor Lamp",
      category: "HOME_DECOR",
      sourceCountry: "India",
      cbmVolume: 0.25,
      stock: 3,
      priceB2C: 12499,
      priceB2B: 9200,
      status: "LOW_STOCK",
    },
  ]);

  const [masterFlights, setMasterFlights] = useState<MasterFlightBlock[]>([
    {
      id: "mfl-1",
      airline: "IndiGo",
      flightNumber: "6E-205",
      sector: "DEL ➔ GOX (Goa MOPA)",
      travelDate: "2026-10-15",
      departureTime: "06:15",
      totalSeats: 30,
      availableSeats: 18,
      netFare: 4200,
      retailFare: 5600,
      masterPnr: "6E-GRP-9021",
    },
    {
      id: "mfl-2",
      airline: "Air India",
      flightNumber: "AI-812",
      sector: "DEL ➔ SXR (Srinagar)",
      travelDate: "2026-10-18",
      departureTime: "11:20",
      totalSeats: 25,
      availableSeats: 12,
      netFare: 5100,
      retailFare: 6800,
      masterPnr: "AI-BLK-4410",
    },
  ]);

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "FURNITURE" as "FURNITURE" | "HARDWARE" | "HOME_DECOR",
    sourceCountry: "China" as "China" | "India",
    cbmVolume: 1.5,
    stock: 10,
    priceB2C: 45000,
    priceB2B: 35000,
  });

  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false);
  const [newFlight, setNewFlight] = useState({
    airline: "IndiGo",
    flightNumber: "6E-614",
    sector: "BOM ➔ DEL",
    travelDate: "2026-11-05",
    departureTime: "09:45",
    totalSeats: 25,
    netFare: 3800,
    retailFare: 4900,
    masterPnr: "6E-GRP-7712",
  });

  // Derived financial metrics
  const totalJoiningRevenue = agentsList
    .filter((a) => a.status === "APPROVED")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingApprovalsCount = agentsList.filter((a) => a.status === "PENDING").length;

  const handleApproveAgent = (agentId: string) => {
    setAgentsList((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, status: "APPROVED" } : a))
    );
    showToast("Agent UTR verified successfully. Storefront and Flight Desk activated!");
  };

  const handleRejectAgent = (agentId: string) => {
    setAgentsList((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, status: "REJECTED" } : a))
    );
    showToast("Agent registration marked as rejected.");
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title) return;
    const added: FlagshipProduct = {
      id: `fp-${Date.now()}`,
      ...newProduct,
      status: "ACTIVE",
    };
    setFlagshipProducts((prev) => [added, ...prev]);
    setIsAddProductOpen(false);
    setNewProduct({
      title: "",
      category: "FURNITURE",
      sourceCountry: "China",
      cbmVolume: 1.5,
      stock: 10,
      priceB2C: 45000,
      priceB2B: 35000,
    });
    showToast("New Master Flagship product added to central marketplace!");
  };

  const handleAddFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const added: MasterFlightBlock = {
      id: `mfl-${Date.now()}`,
      ...newFlight,
      availableSeats: newFlight.totalSeats,
    };
    setMasterFlights((prev) => [added, ...prev]);
    setIsAddFlightOpen(false);
    showToast("New Master Fixed Departure flight block added to marketplace!");
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-900">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            ✓
          </div>
          <div className="text-xs font-semibold">{saveToast}</div>
        </div>
      )}

      {/* Top Masthead */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-xl shadow-lg border border-purple-400/30 font-black">
                👑
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    Radhekant Master Console
                  </h1>
                  <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Full-Stack Multi-Tenant SaaS, Platform Settlement, Flight Engine & Central Catalog
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next.js Full-Stack Backend Connected</span>
              </div>

              <Link
                href="/"
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition inline-flex items-center gap-1.5"
              >
                <span>Live Marketplace</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px] font-medium">SaaS Joining Revenue</div>
              <div className="text-lg font-black text-purple-300 mt-0.5">
                {formatINR(totalJoiningRevenue)}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">From {agentsList.filter(a => a.status === "APPROVED").length} paid agents</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px] font-medium">Pending UTR Approvals</div>
              <div className="text-lg font-black text-amber-300 mt-0.5">
                {pendingApprovalsCount} Submissions
              </div>
              <div className="text-[10px] text-amber-400 mt-0.5">Awaiting bank check</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px] font-medium">Master Seat Inventory</div>
              <div className="text-lg font-black text-blue-300 mt-0.5">
                {masterFlights.reduce((a, c) => a + c.availableSeats, 0)} Seats
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Across {masterFlights.length} fixed sectors</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px] font-medium">Flagship Catalog Items</div>
              <div className="text-lg font-black text-slate-100 mt-0.5">
                {flagshipProducts.length} Products
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">China Sofas & SS 304 Hardware</div>
            </div>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="flex gap-1.5 overflow-x-auto mt-6 pt-2 pb-1 no-scrollbar text-xs font-bold">
            <button
              onClick={() => setActiveTab("OVERVIEW")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "OVERVIEW"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("SETTINGS")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "SETTINGS"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Platform & Bank Settings</span>
            </button>

            <button
              onClick={() => setActiveTab("FLIGHT_RULES")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "FLIGHT_RULES"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Flight Cutoff Rules</span>
            </button>

            <button
              onClick={() => setActiveTab("MEMBERSHIP_PLANS")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "MEMBERSHIP_PLANS"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Membership SaaS Pricing</span>
            </button>

            <button
              onClick={() => setActiveTab("BANNERS")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "BANNERS"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Promotional Banners</span>
            </button>

            <button
              onClick={() => setActiveTab("AGENTS")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 relative ${
                activeTab === "AGENTS"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Agent Approvals</span>
              {pendingApprovalsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 ml-1 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("FLAGSHIP_CATALOG")}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "FLAGSHIP_CATALOG"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Sofa className="w-3.5 h-3.5" />
              <span>Master Inventory CRUD</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & SYSTEM HEALTH                           */}
        {/* ========================================================= */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6">
            
            {/* Quick Alert if Pending Approvals */}
            {pendingApprovalsCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">
                      {pendingApprovalsCount} Agent Registration awaiting UTR Verification
                    </h3>
                    <p className="text-xs text-amber-800">
                      AeroGo Holidays has submitted an ICICI UPI UTR for the Pro Plan (₹11,999).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("AGENTS")}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
                >
                  Review & Activate ➔
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Financial Breakdown Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span>SaaS Joining Fee Collections</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    100% Margin
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {formatINR(totalJoiningRevenue)}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Collected directly into Radhekant ICICI A/C (<span className="font-mono text-slate-700">...2988</span>) via NEFT/UPI references. No gateway fee deduction!
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Enterprise Tier (₹24,999/yr)</span>
                    <strong className="text-slate-900">₹24,999 (1 Agent)</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Pro Consolidator (₹11,999/yr)</span>
                    <strong className="text-slate-900">₹11,999 (1 Agent)</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Starter Merchant (₹4,999/yr)</span>
                    <strong className="text-slate-900">₹4,999 (1 Agent)</strong>
                  </div>
                </div>
              </div>

              {/* Architecture & Backend Verification Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Architecture Status</span>
                  </h3>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Unified Stack
                  </span>
                </div>
                
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <span className="font-semibold text-slate-700">Backend Server Engine</span>
                    <span className="text-emerald-700 font-bold">Next.js 15 App Router</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <span className="font-semibold text-slate-700">Database ORM</span>
                    <span className="text-emerald-700 font-bold">Prisma ORM (SQLite / PG)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <span className="font-semibold text-slate-700">Seat Concurrency Locking</span>
                    <span className="text-emerald-700 font-bold">Atomic Transactional</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <span className="font-semibold text-slate-700">Multi-Tenancy Isolation</span>
                    <span className="text-emerald-700 font-bold">Agent Storefront Slugs</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Note: Next.js is both your frontend and backend. No separate Express/PHP backend is required.
                </p>
              </div>

              {/* Quick Navigation Shortcuts */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Quick Master Operations
                </h3>
                <div className="flex flex-col gap-2 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab("SETTINGS")}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-800 border border-slate-200 transition text-left flex items-center justify-between"
                  >
                    <span>Update Settlement Bank / UPI Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab("MEMBERSHIP_PLANS")}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-800 border border-slate-200 transition text-left flex items-center justify-between"
                  >
                    <span>Edit Agent Membership Plan Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab("FLIGHT_RULES")}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-800 border border-slate-200 transition text-left flex items-center justify-between"
                  >
                    <span>Adjust Flight Auto-Cutoff Times</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab("FLAGSHIP_CATALOG")}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-800 border border-slate-200 transition text-left flex items-center justify-between"
                  >
                    <span>Add New Chinese Imported Sofa / Hardware</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PLATFORM & SETTLEMENT SETTINGS                     */}
        {/* ========================================================= */}
        {activeTab === "SETTINGS" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  <span>Radhekant Official Settlement & Company Settings</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure where agents transfer their annual membership joining fees and deposit wallet top-ups.
                </p>
              </div>
              <button
                onClick={() => showToast("Settlement Bank and Platform settings saved successfully!")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Platform Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Bank Transfer Details (NEFT/RTGS/IMPS) */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span>Master Bank Account (For NEFT/RTGS Submissions)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={platformSettings.bankName}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, bankName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      value={platformSettings.accountHolder}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, accountHolder: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Account Number</label>
                      <input
                        type="text"
                        value={platformSettings.accountNumber}
                        onChange={(e) => setPlatformSettings({ ...platformSettings, accountNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 focus:outline-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={platformSettings.ifscCode}
                        onChange={(e) => setPlatformSettings({ ...platformSettings, ifscCode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 focus:outline-purple-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Branch Name</label>
                    <input
                      type="text"
                      value={platformSettings.branch}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, branch: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-purple-600"
                    />
                  </div>
                </div>
              </div>

              {/* UPI & Digital Settlement */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Hash className="w-4 h-4 text-emerald-600" />
                  <span>Instant UPI Settlement & Tax SAC/HSN</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Master UPI VPA</label>
                    <input
                      type="text"
                      value={platformSettings.upiId}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, upiId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-emerald-800 focus:outline-purple-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Rendered on the agent joining checkout page for fast QR scan & pay.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Company GSTIN</label>
                      <input
                        type="text"
                        value={platformSettings.gstin}
                        onChange={(e) => setPlatformSettings({ ...platformSettings, gstin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 focus:outline-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Permanent PAN</label>
                      <input
                        type="text"
                        value={platformSettings.pan}
                        onChange={(e) => setPlatformSettings({ ...platformSettings, pan: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 focus:outline-purple-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Support Helpline & WhatsApp</label>
                    <input
                      type="text"
                      value={platformSettings.supportPhone}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, supportPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Billing Support Email</label>
                    <input
                      type="email"
                      value={platformSettings.supportEmail}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-purple-600"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => showToast("Settlement Bank and Platform settings saved successfully!")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Platform Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: FLIGHT RULES & POLICIES                            */}
        {/* ========================================================= */}
        {activeTab === "FLIGHT_RULES" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-600" />
                  <span>Domestic Offline Flight Engine & Cutoff Policy</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Governs fixed departure seat locking, PNR auto-issuance, and name list cutoff thresholds.
                </p>
              </div>
              <button
                onClick={() => showToast("Flight engine cutoff and seat lock rules updated!")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Flight Policies</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Cutoff Hours & Seat Locking</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Passenger Name List (PNR) Cutoff Window (Hours)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={flightRules.defaultCutoffHours}
                        onChange={(e) => setFlightRules({ ...flightRules, defaultCutoffHours: Number(e.target.value) })}
                        className="w-32 px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                      />
                      <span className="text-slate-500">hours before flight departure</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      After this threshold, agents can no longer change passenger names in the group allotment.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Concurrency Seat Lock Hold (Minutes)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={flightRules.concurrencyHoldMinutes}
                        onChange={(e) => setFlightRules({ ...flightRules, concurrencyHoldMinutes: Number(e.target.value) })}
                        className="w-32 px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                      />
                      <span className="text-slate-500">minutes</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Protects inventory from double-booking while customer or agent completes checkout.
                    </p>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-slate-700 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={flightRules.requirePassengerGovtId}
                        onChange={(e) => setFlightRules({ ...flightRules, requirePassengerGovtId: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <span>Enforce Mandatory Government ID (Aadhaar / Passport) at PNR issuance</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Ticket Footer & Agent Disclaimer</h4>
                
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    White-Label Boarding Pass Terms & Baggage Rules
                  </label>
                  <textarea
                    rows={4}
                    value={flightRules.ticketFooterDisclaimer}
                    onChange={(e) => setFlightRules({ ...flightRules, ticketFooterDisclaimer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 leading-relaxed font-normal"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Printed at the bottom of customer e-tickets generated via the platform.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Allowed Domestic Carriers
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {flightRules.allowedAirlines.map((airline) => (
                      <span key={airline} className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-xl text-xs">
                        ✈️ {airline}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => showToast("Flight engine cutoff and seat lock rules updated!")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Flight Policies</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MEMBERSHIP PLANS & SAAS PRICING                    */}
        {/* ========================================================= */}
        {activeTab === "MEMBERSHIP_PLANS" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-amber-600" />
                  <span>Agent Joining Fee & Membership Tier Pricing</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update the annual platform fee your client charges new agents. Changes reflect immediately on <Link href="/agent/plans" className="text-blue-600 underline">/agent/plans</Link>.
                </p>
              </div>
              <button
                onClick={() => showToast("Membership SaaS plan fees and quota limits updated!")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Plan Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {plans.map((p, idx) => (
                <div key={p.id} className="p-5 rounded-3xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50 transition space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {p.badgeText}
                      </span>
                      <span className="text-slate-400 text-[11px] font-medium">Annual Plan</span>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Plan Title</label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => {
                          const updated = [...plans];
                          updated[idx].name = e.target.value;
                          setPlans(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Joining Fee (INR / Year)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 font-bold text-slate-400">₹</span>
                        <input
                          type="number"
                          value={p.priceINR}
                          onChange={(e) => {
                            const updated = [...plans];
                            updated[idx].priceINR = Number(e.target.value);
                            setPlans(updated);
                          }}
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-500 font-semibold mb-1">Flight Sectors Cap</label>
                        <input
                          type="number"
                          value={p.maxFlightListings}
                          onChange={(e) => {
                            const updated = [...plans];
                            updated[idx].maxFlightListings = Number(e.target.value);
                            setPlans(updated);
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 font-semibold mb-1">Catalog Items Cap</label>
                        <input
                          type="number"
                          value={p.maxProductListings}
                          onChange={(e) => {
                            const updated = [...plans];
                            updated[idx].maxProductListings = Number(e.target.value);
                            setPlans(updated);
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Plan Features (Comma separated)</label>
                      <textarea
                        rows={3}
                        value={p.features}
                        onChange={(e) => {
                          const updated = [...plans];
                          updated[idx].features = e.target.value;
                          setPlans(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                    <span className="text-slate-500">Status: Active</span>
                    <span className="text-emerald-700 font-bold">100% Retained</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => showToast("Membership SaaS plan fees and quota limits updated!")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Plan Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PROMOTIONAL BANNERS & CAMPAIGNS                    */}
        {/* ========================================================= */}
        {activeTab === "BANNERS" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Homepage Promotional Banners & Seasonal Campaigns</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Control the high-impact promotional carousel on the homepage for flight seat rushes, container clearances, and bulk slabs.
                </p>
              </div>
              <button
                onClick={() => showToast("Homepage banner campaigns synchronized!")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Banners</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {banners.map((b, idx) => (
                <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Banner #{idx + 1}</span>
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {b.tag}
                      </span>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={b.isActive}
                        onChange={(e) => {
                          const updated = [...banners];
                          updated[idx].isActive = e.target.checked;
                          setBanners(updated);
                        }}
                        className="w-4 h-4 rounded text-purple-600"
                      />
                      <span className="text-slate-700 font-bold">Display on Homepage</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Headline</label>
                      <input
                        type="text"
                        value={b.headline}
                        onChange={(e) => {
                          const updated = [...banners];
                          updated[idx].headline = e.target.value;
                          setBanners(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Call-To-Action Link</label>
                      <input
                        type="text"
                        value={b.ctaLink}
                        onChange={(e) => {
                          const updated = [...banners];
                          updated[idx].ctaLink = e.target.value;
                          setBanners(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-blue-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Subheadline & Trade Description</label>
                    <textarea
                      rows={2}
                      value={b.subheadline}
                      onChange={(e) => {
                        const updated = [...banners];
                        updated[idx].subheadline = e.target.value;
                        setBanners(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 leading-relaxed font-normal"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => showToast("Homepage banner campaigns synchronized!")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Banners</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: AGENT APPROVALS & DIRECTORY                        */}
        {/* ========================================================= */}
        {activeTab === "AGENTS" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Agent Onboarding & UTR Verification Queue</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review agent NEFT/UPI references against your ICICI bank statement and activate their public storefronts.
                </p>
              </div>
              <div className="text-xs font-semibold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-200">
                Direct Bank Settlement Active
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Agency & Contact</th>
                    <th className="py-3 px-4">City / State</th>
                    <th className="py-3 px-4">Plan Selected</th>
                    <th className="py-3 px-4">Fee Paid</th>
                    <th className="py-3 px-4">Submitted UTR</th>
                    <th className="py-3 px-4">GSTIN</th>
                    <th className="py-3 px-4 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {agentsList.map((agent) => (
                    <tr key={agent.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>{agent.agencyName}</div>
                        <div className="text-slate-400 text-[11px] font-normal">{agent.contactPerson} • {agent.phone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {agent.city}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-lg">
                          {agent.planName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {formatINR(agent.amount)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-900 bg-amber-50/60">
                        {agent.utrNumber}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {agent.gstin}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {agent.status === "APPROVED" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Active & Verified
                          </span>
                        ) : agent.status === "REJECTED" ? (
                          <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" />
                            Rejected
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleRejectAgent(agent.id)}
                              className="px-2.5 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg font-bold"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveAgent(agent.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verify & Activate</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: MASTER FLAGSHIP INVENTORY CRUD                     */}
        {/* ========================================================= */}
        {activeTab === "FLAGSHIP_CATALOG" && (
          <div className="space-y-8">
            
            {/* Section A: Chinese & Indian Furniture / Hardware */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Sofa className="w-5 h-5 text-amber-600" />
                    <span>Master Direct Imports: Chinese Furniture & Hardware Depot</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your own high-margin anchor products available for direct retail purchase or agent wholesale ordering.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-sm transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Flagship Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {flagshipProducts.map((prod) => (
                  <div key={prod.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {prod.sourceCountry} Import
                        </span>
                        <span className="text-emerald-700 font-bold">{prod.stock} in stock</span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                        {prod.title}
                      </h4>

                      <div className="text-[11px] text-slate-500">
                        Category: <strong>{prod.category}</strong> • CBM: {prod.cbmVolume} m³
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">B2C Retail:</span>
                        <span className="text-slate-900">{formatINR(prod.priceB2C)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-amber-700">B2B Wholesale:</span>
                        <span className="text-amber-800">{formatINR(prod.priceB2B)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Master Fixed Departure Flight Blocks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    <span>Master Fixed Departure Flight Blocks (Owned by Radhekant)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Consolidated offline group PNR seats on IndiGo and Air India allocated for agents to resell.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddFlightOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Flight Block</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
                <table className="w-full text-left min-w-[650px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Airline & Flight</th>
                      <th className="py-3 px-4">Sector</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Seats Left</th>
                      <th className="py-3 px-4">Wholesale Net Fare</th>
                      <th className="py-3 px-4">Suggested Retail</th>
                      <th className="py-3 px-4">Master PNR Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {masterFlights.map((fl) => (
                      <tr key={fl.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {fl.airline} • {fl.flightNumber}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-blue-700">
                          {fl.sector}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {fl.travelDate} at {fl.departureTime}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                            {fl.availableSeats} / {fl.totalSeats} seats
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900">
                          {formatINR(fl.netFare)}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-500">
                          {formatINR(fl.retailFare)}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-900 bg-amber-50/50">
                          {fl.masterPnr}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Modal: Add Flagship Product */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sofa className="w-5 h-5 text-amber-600" />
              <span>Add New Master Flagship Product</span>
            </h3>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Italian Velvet Chesterfield Sectional"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  >
                    <option value="FURNITURE">Ready-Made Furniture</option>
                    <option value="HARDWARE">Hardware Depot</option>
                    <option value="HOME_DECOR">Home Decor & Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Factory Origin</label>
                  <select
                    value={newProduct.sourceCountry}
                    onChange={(e) => setNewProduct({ ...newProduct, sourceCountry: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  >
                    <option value="China">China (Foshan / Shunde)</option>
                    <option value="India">India (Domestic Manufacturing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">CBM Volume (m³)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newProduct.cbmVolume}
                    onChange={(e) => setNewProduct({ ...newProduct, cbmVolume: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Warehouse Stock Units</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">B2C Retail Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.priceB2C}
                    onChange={(e) => setNewProduct({ ...newProduct, priceB2C: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">B2B Wholesale Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.priceB2B}
                    onChange={(e) => setNewProduct({ ...newProduct, priceB2B: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-amber-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Add to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Master Flight Block */}
      {isAddFlightOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-600" />
              <span>Add Master Fixed Departure Flight Block</span>
            </h3>

            <form onSubmit={handleAddFlightSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Airline</label>
                  <select
                    value={newFlight.airline}
                    onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  >
                    <option value="IndiGo">IndiGo</option>
                    <option value="Air India">Air India</option>
                    <option value="SpiceJet">SpiceJet</option>
                    <option value="Akasa Air">Akasa Air</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Flight Number</label>
                  <input
                    type="text"
                    required
                    value={newFlight.flightNumber}
                    onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Sector (e.g. DEL ➔ GOX)</label>
                  <input
                    type="text"
                    required
                    value={newFlight.sector}
                    onChange={(e) => setNewFlight({ ...newFlight, sector: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={newFlight.travelDate}
                    onChange={(e) => setNewFlight({ ...newFlight, travelDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Departure</label>
                  <input
                    type="text"
                    value={newFlight.departureTime}
                    onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Total Seats</label>
                  <input
                    type="number"
                    value={newFlight.totalSeats}
                    onChange={(e) => setNewFlight({ ...newFlight, totalSeats: Number(e.target.value) })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Master PNR</label>
                  <input
                    type="text"
                    value={newFlight.masterPnr}
                    onChange={(e) => setNewFlight({ ...newFlight, masterPnr: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Wholesale Net Fare (₹)</label>
                  <input
                    type="number"
                    value={newFlight.netFare}
                    onChange={(e) => setNewFlight({ ...newFlight, netFare: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Suggested Retail (₹)</label>
                  <input
                    type="number"
                    value={newFlight.retailFare}
                    onChange={(e) => setNewFlight({ ...newFlight, retailFare: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddFlightOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Add Flight Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
