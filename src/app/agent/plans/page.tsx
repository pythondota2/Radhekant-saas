"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Store, 
  Plane, 
  Building2, 
  QrCode, 
  Upload, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  price: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  maxFlights: string;
  maxProducts: string;
}

const plans: Plan[] = [
  {
    id: "starter-agent",
    name: "Starter Agent Desk",
    price: 4999,
    badge: "Entry Tier",
    maxFlights: "Up to 25 Offline Flights",
    maxProducts: "Up to 50 Products",
    features: [
      "25 Domestic Offline Flight Listings",
      "50 Furniture / Hardware Product Listings",
      "Dedicated Public Storefront (radhekant.com/store/your-agency)",
      "Instant Booking SMS & Email Notifications",
      "Manual Bank UTR Wallet Top-Up",
      "Standard Email & WhatsApp Support",
    ],
  },
  {
    id: "pro-consolidator",
    name: "Pro Consolidator & Trader",
    price: 11999,
    badge: "Most Popular",
    isPopular: true,
    maxFlights: "Up to 150 Offline Flights",
    maxProducts: "Up to 300 Products",
    features: [
      "150 Domestic Offline Flight Listings",
      "300 Furniture, Decor & Hardware Listings",
      "Custom White-Label PDF E-Tickets with YOUR Agency Branding",
      "Interactive Dynamic Markup Tool (Set custom client fares)",
      "Passenger Name Cutoff Deadlines & Email Alerts",
      "Export Full Passenger Manifest to Excel for Airlines",
      "Priority WhatsApp & Direct Phone Support",
    ],
  },
  {
    id: "enterprise-master",
    name: "Enterprise Multi-Store Master",
    price: 24999,
    badge: "Ultimate Scale",
    maxFlights: "Unlimited Listings",
    maxProducts: "Unlimited Listings",
    features: [
      "Unlimited Domestic Flight & Group Fare Listings",
      "Unlimited Furniture, Decor & Hardware Catalog",
      "Multi-Staff Sub-Agent Team Logins",
      "Custom Subdomain & Verified Gold Partner Badge",
      "0% Platform Commission on all sales",
      "Dedicated Account Manager for Logistics & Airline Escapes",
    ],
  },
];

export default function AgentPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [agencyName, setAgencyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [gstin, setGstin] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/30">
          <Store className="w-3.5 h-3.5" />
          <span>Radhekant SaaS Partner Ecosystem</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Choose Your Agent Membership Plan
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pay an annual platform joining fee to list your own offline domestic flight blocks, ready-made furniture, or hardware products. Keep 100% of your customer markup.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 relative ${
              plan.isPopular
                ? "bg-slate-900 text-white shadow-2xl scale-105 border-2 border-amber-400"
                : "bg-white text-slate-900 border border-slate-200 shadow-md hover:shadow-xl"
            }`}
          >
            {plan.badge && (
              <div
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm ${
                  plan.isPopular
                    ? "bg-amber-400 text-slate-950"
                    : "bg-slate-800 text-white"
                }`}
              >
                {plan.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black">{formatINR(plan.price)}</span>
                  <span className={`text-xs ${plan.isPopular ? "text-slate-400" : "text-slate-500"}`}>
                    / year + 18% GST
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-xs space-y-1 ${plan.isPopular ? "bg-slate-800/80" : "bg-slate-50"}`}>
                <div className="font-semibold text-blue-400">✈️ {plan.maxFlights}</div>
                <div className="font-semibold text-amber-400">🛋️ {plan.maxProducts}</div>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-xs">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.isPopular ? "text-amber-400" : "text-blue-600"}`} />
                    <span className={plan.isPopular ? "text-slate-300" : "text-slate-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 ${
                  plan.isPopular
                    ? "bg-amber-400 hover:bg-amber-500 text-slate-950"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <span>Select {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Why Join Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <h2 className="text-xl font-bold text-slate-900 text-center">
          How Radhekant Multi-Agent SaaS Works in 3 Simple Steps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Pay Joining Fee</h4>
            <p className="text-slate-500 leading-relaxed">
              Select your plan, transfer the membership fee via UPI or NEFT/IMPS, and submit your UTR reference.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Admin 1-Click Verification</h4>
            <p className="text-slate-500 leading-relaxed">
              Radhekant Master Admin reviews and activates your agency dashboard and unique store link.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">List & Sell Directly</h4>
            <p className="text-slate-500 leading-relaxed">
              Upload your offline flight seats, add your markup, manage passenger names, or sell your furniture.
            </p>
          </div>
        </div>
      </div>

      {/* Membership Registration Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Agent Onboarding
                </span>
                <h3 className="text-base font-bold">{selectedPlan.name}</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Joining Request & UTR Submitted!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <strong>{agencyName || "Agent"}</strong>. We have logged your UTR reference <strong>#{utrNumber || "202688910"}</strong> for the {selectedPlan.name} ({formatINR(selectedPlan.price)}).
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 text-left">
                  💡 <strong>Test Mode Simulation:</strong> Super Admin can now see your registration in the Admin Console and approve it with 1-click!
                </div>
                <div className="pt-2 flex gap-3 justify-center">
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-semibold hover:bg-purple-800"
                  >
                    Go to Super Admin Console to Approve
                  </Link>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Official Bank Account for Joining Fee */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Radhekant Official Settlement Account (India)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="text-slate-400">Account Name:</span>
                      <div className="font-semibold text-slate-800">Radhekant Technologies Pvt Ltd</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Bank & Branch:</span>
                      <div className="font-semibold text-slate-800">ICICI Bank, Connaught Place</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Account Number:</span>
                      <div className="font-mono font-bold text-slate-900">000705018921</div>
                    </div>
                    <div>
                      <span className="text-slate-400">IFSC Code:</span>
                      <div className="font-mono font-bold text-slate-900">ICIC0000007</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">UPI VPA:</span>
                      <div className="font-mono font-bold text-blue-700">radhekant@icici</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Agency / Business Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Tours & Furniture Studio"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        WhatsApp Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="agent@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">City & State *</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, MH"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Bank Transfer UTR / UPI Reference Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 20260916008123 or UPI Ref"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      required
                      className="w-full bg-amber-50 border border-amber-300 rounded-lg p-2 font-mono font-bold text-amber-950"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Enter the 12-digit UTR from your net banking or UPI payment confirmation.
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-500">Total Payable Fee:</div>
                    <div className="text-xl font-black text-slate-900">{formatINR(selectedPlan.price)}</div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow transition"
                  >
                    Submit Joining Request
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
