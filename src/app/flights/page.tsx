import React from "react";
import MarketplaceClient from "@/components/MarketplaceClient";
import { getFlights, getProducts } from "@/lib/dataService";

export const revalidate = 60;

export default async function FlightsPage() {
  const [flights, products] = await Promise.all([
    getFlights(),
    getProducts(),
  ]);

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-2">
              Fixed Departure Aviation Engine
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Domestic Offline Flight Inventory Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time seat allotments on IndiGo, Air India, SpiceJet, and Akasa Air. Instant ticket issuance and white-label PNR delivery for B2B agents and travelers.
            </p>
          </div>
        </div>
      </div>

      <MarketplaceClient
        initialFlights={flights}
        initialProducts={products}
      />
    </div>
  );
}
