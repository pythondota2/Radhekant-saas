"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plane, 
  Wallet, 
  PlusCircle, 
  Store, 
  ExternalLink, 
  ShieldCheck, 
  Users, 
  Clock, 
  CreditCard, 
  Building2, 
  Download, 
  CheckCircle2,
  X,
  FileText
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";

interface AgentFlight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  availableSeats: number;
  netFare: number;
  retailFare: number;
  masterPnr: string;
}

export default function AgentDashboardPage() {
  const { agentWallet, addWallet } = useApp();

  const [activeTab, setActiveTab] = useState<"FLIGHTS" | "PRODUCTS" | "BOOKINGS">("FLIGHTS");

  // Wallet top-up modal
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("25000");
  const [utrNumber, setUtrNumber] = useState("");
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  // Add flight modal
  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false);
  const [newFlight, setNewFlight] = useState({
    airline: "IndiGo",
    flightNumber: "6E-512",
    origin: "DEL",
    originCity: "New Delhi",
    destination: "BLR",
    destinationCity: "Bengaluru",
    travelDate: "2026-10-28",
    departureTime: "07:20",
    arrivalTime: "10:10",
    totalSeats: 20,
    netFare: 4200,
    retailFare: 5500,
    masterPnr: "6E-FD-3391",
  });

  // Sample agent's listed flights
  const [agentFlights, setAgentFlights] = useState<AgentFlight[]>([
    {
      id: "fl-1",
      flightNumber: "6E-205",
      airline: "IndiGo",
      origin: "DEL",
      destination: "GOX",
      travelDate: "2026-10-18",
      departureTime: "06:15",
      arrivalTime: "08:55",
      totalSeats: 25,
      availableSeats: 19,
      netFare: 4850,
      retailFare: 6200,
      masterPnr: "6E-GRP-9844",
    },
    {
      id: "fl-2",
      flightNumber: "AI-806",
      airline: "Air India",
      origin: "BOM",
      destination: "DEL",
      travelDate: "2026-10-20",
      departureTime: "09:30",
      arrivalTime: "11:45",
      totalSeats: 20,
      availableSeats: 12,
      netFare: 5100,
      retailFare: 6500,
      masterPnr: "AI-FD-8821",
    },
  ]);

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(topUpAmount) || 0;
    addWallet(amount);
    setTopUpSuccess(true);
    setTimeout(() => {
      setTopUpSuccess(false);
      setIsTopUpOpen(false);
      setUtrNumber("");
    }, 1500);
  };

  const handleAddFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: AgentFlight = {
      id: `fl-${Date.now()}`,
      flightNumber: newFlight.flightNumber,
      airline: newFlight.airline,
      origin: newFlight.origin,
      destination: newFlight.destination,
      travelDate: newFlight.travelDate,
      departureTime: newFlight.departureTime,
      arrivalTime: newFlight.arrivalTime,
      totalSeats: Number(newFlight.totalSeats),
      availableSeats: Number(newFlight.totalSeats),
      netFare: Number(newFlight.netFare),
      retailFare: Number(newFlight.retailFare),
      masterPnr: newFlight.masterPnr,
    };
    setAgentFlights([newEntry, ...agentFlights]);
    setIsAddFlightOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Agent Profile Banner */}
      <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
            SA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">SkyAir Holidays & Consolidators</h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Verified Agent (Pro Tier)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              New Delhi, India • GSTIN: 07AAAAA1111A1Z1 • Active Subscription
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/store/skyair-holidays"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span>My Public Storefront</span>
            <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
          </Link>

          <button
            onClick={() => setIsTopUpOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-md transition"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Top-up Wallet</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Live Deposit Wallet</div>
          <div className="text-2xl font-black text-amber-900 mt-1">
            {formatINR(agentWallet)}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            + ₹1,00,000 Credit Limit Approved
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">My Listed Flights</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {agentFlights.length} Sectors
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Total Seats in Market: {agentFlights.reduce((acc, f) => acc + f.availableSeats, 0)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Total Bookings Completed</div>
          <div className="text-2xl font-black text-blue-900 mt-1">
            14 Bookings
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">
            All PNRs Ticketed & Delivered
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Estimated Markup Profit</div>
          <div className="text-2xl font-black text-emerald-800 mt-1">
            {formatINR(18400)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Retained 100% (Zero Platform Cut)
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("FLIGHTS")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "FLIGHTS"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              My Flight Inventory ({agentFlights.length})
            </button>
            <button
              onClick={() => setActiveTab("BOOKINGS")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "BOOKINGS"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Recent Passenger Manifests
            </button>
          </div>

          <button
            onClick={() => setIsAddFlightOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add Flight Block</span>
          </button>
        </div>

        {/* Tab 1: Flight Inventory Table */}
        {activeTab === "FLIGHTS" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Flight</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Seats Left</th>
                  <th className="py-3 px-4">My Wholesale Net</th>
                  <th className="py-3 px-4">Public Retail</th>
                  <th className="py-3 px-4">Master PNR</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {agentFlights.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{f.flightNumber}</div>
                      <div className="text-[11px] text-slate-500">{f.airline}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-blue-900">{f.origin}</span> ➔{" "}
                      <span className="font-bold text-blue-900">{f.destination}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>{f.travelDate}</div>
                      <div className="text-slate-400 text-[11px]">
                        {f.departureTime} - {f.arrivalTime}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        {f.availableSeats} / {f.totalSeats}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {formatINR(f.netFare)}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {formatINR(f.retailFare)}
                    </td>
                    <td className="py-3 px-4 font-mono text-blue-700 font-semibold">
                      {f.masterPnr}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold mr-2">
                        Edit
                      </button>
                      <button className="text-slate-500 hover:text-slate-700">
                        Manifest
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Bookings / Manifest */}
        {activeTab === "BOOKINGS" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Sector & Flight</th>
                  <th className="py-3 px-4">Lead Passenger</th>
                  <th className="py-3 px-4">Passengers</th>
                  <th className="py-3 px-4">Amount Billed</th>
                  <th className="py-3 px-4">Airline PNR</th>
                  <th className="py-3 px-4 text-right">E-Ticket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    RAD-FD-89201
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold">DEL ➔ GOX</div>
                    <div className="text-slate-400 text-[11px]">6E-205 • 18 Oct 2026</div>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    Mr. Rohit Verma
                  </td>
                  <td className="py-3 px-4">2 Pax</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{formatINR(11200)}</td>
                  <td className="py-3 px-4 font-mono text-emerald-700 font-bold">6E9841</td>
                  <td className="py-3 px-4 text-right">
                    <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Wallet Top-up Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm">Top-Up Advance Deposit Wallet</h3>
              </div>
              <button
                onClick={() => setIsTopUpOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {topUpSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Wallet Credited!</h4>
                <p className="text-xs text-slate-600">
                  {formatINR(Number(topUpAmount))} added to your live balance for instant ticket bookings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTopUpSubmit} className="p-6 space-y-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-slate-500 font-medium">Settlement Account:</div>
                  <div className="font-bold text-slate-900">Radhekant Technologies Pvt Ltd</div>
                  <div className="text-slate-600 font-mono">ICICI Bank A/c: 000705018921 (IFSC: ICIC0000007)</div>
                  <div className="text-blue-700 font-bold font-mono">UPI VPA: radhekant@icici</div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Deposit Amount (INR) *
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Bank Transfer UTR / UPI Reference Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit UTR from netbanking"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow transition"
                  >
                    Submit & Instant Credit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Flight Block Modal */}
      {isAddFlightOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm">Add Offline Flight Block Inventory</h3>
              </div>
              <button
                onClick={() => setIsAddFlightOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFlightSubmit} className="p-6 space-y-3 text-xs max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Airline *</label>
                  <select
                    value={newFlight.airline}
                    onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  >
                    <option value="IndiGo">IndiGo</option>
                    <option value="Air India">Air India</option>
                    <option value="SpiceJet">SpiceJet</option>
                    <option value="Akasa Air">Akasa Air</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Flight Number *</label>
                  <input
                    type="text"
                    value={newFlight.flightNumber}
                    onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Origin Code (e.g. DEL)</label>
                  <input
                    type="text"
                    value={newFlight.origin}
                    onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Destination Code (e.g. BLR)</label>
                  <input
                    type="text"
                    value={newFlight.destination}
                    onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 uppercase font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={newFlight.travelDate}
                    onChange={(e) => setNewFlight({ ...newFlight, travelDate: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Dep Time</label>
                  <input
                    type="text"
                    value={newFlight.departureTime}
                    onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Arr Time</label>
                  <input
                    type="text"
                    value={newFlight.arrivalTime}
                    onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Total Seats *</label>
                  <input
                    type="number"
                    min="1"
                    value={newFlight.totalSeats}
                    onChange={(e) => setNewFlight({ ...newFlight, totalSeats: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Net Cost (INR)</label>
                  <input
                    type="number"
                    value={newFlight.netFare}
                    onChange={(e) => setNewFlight({ ...newFlight, netFare: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Retail Price (INR)</label>
                  <input
                    type="number"
                    value={newFlight.retailFare}
                    onChange={(e) => setNewFlight({ ...newFlight, retailFare: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Master PNR / Group Ref *</label>
                <input
                  type="text"
                  value={newFlight.masterPnr}
                  onChange={(e) => setNewFlight({ ...newFlight, masterPnr: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition"
                >
                  Publish Flight Block to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
