"use client";

import React, { useState } from "react";
import { Plane, Sofa, Luggage, ArrowRight, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import FlightBookingModal, { FlightItem } from "./FlightBookingModal";
import ProductDetailModal, { ProductItem } from "./ProductDetailModal";

interface AgentStoreClientProps {
  agencyName: string;
  flights: FlightItem[];
  products: ProductItem[];
}

export default function AgentStoreClient({
  agencyName,
  flights: initialFlights,
  products,
}: AgentStoreClientProps) {
  const { persona } = useApp();
  const [flights, setFlights] = useState<FlightItem[]>(initialFlights);
  const [selectedFlight, setSelectedFlight] = useState<FlightItem | null>(null);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const isAgent = persona === "AGENT";

  const handleBookingSuccess = (flightId: string, bookedSeats: number) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === flightId ? { ...f, availableSeats: Math.max(0, f.availableSeats - bookedSeats) } : f
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Agent's Flight Blocks */}
      {flights.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plane className="w-5 h-5 text-blue-600" />
                <span>Exclusive Offline Flights by {agencyName}</span>
              </h2>
              <p className="text-xs text-slate-500">
                Guaranteed seat blocks with direct airline PNR and instant e-ticket issuance.
              </p>
            </div>
            <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
              {flights.length} Active Sectors
            </span>
          </div>

          <div className="space-y-3">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-blue-900 text-base">
                    {flight.airlineCode}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{flight.airlineName}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-mono">
                        {flight.flightNumber}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      📅 {flight.travelDate} •{" "}
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {flight.availableSeats} Seats Available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-center">
                  <div className="text-left">
                    <div className="text-lg font-black text-slate-900">{flight.departureTime}</div>
                    <div className="text-xs font-bold text-slate-700">{flight.originCode}</div>
                  </div>
                  <div className="text-xs text-slate-400">➔ Non-stop ➔</div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">{flight.arrivalTime}</div>
                    <div className="text-xs font-bold text-slate-700">{flight.destinationCode}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">
                      {isAgent ? "B2B Net Rate" : "Fare Per Pax"}
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      {formatINR(isAgent ? flight.netFare : flight.retailFare)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedFlight(flight);
                      setIsFlightModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow transition flex items-center gap-1.5"
                  >
                    <span>{isAgent ? "Agent Book & Markup" : "Book Confirmed Seat"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent's Products */}
      {products.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sofa className="w-5 h-5 text-amber-600" />
                <span>Products by {agencyName}</span>
              </h2>
              <p className="text-xs text-slate-500">
                Direct catalog items dispatched from {agencyName}&apos;s workshop/warehouse.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-md transition flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-lg font-black text-slate-900">
                      {formatINR(p.priceB2C)}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsProductModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
