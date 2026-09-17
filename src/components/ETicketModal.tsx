"use client";

import React from "react";
import { X, Printer, CheckCircle, Plane, Luggage, Clock, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";

export interface ETicketData {
  pnr: string;
  bookingRef: string;
  airlineName: string;
  airlineCode: string;
  flightNumber: string;
  originCity: string;
  originCode: string;
  destinationCity: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: string;
  passengers: {
    title: string;
    firstName: string;
    lastName: string;
    gender: string;
    seatNumber?: string;
  }[];
  baggageInfo: string;
  totalAmount: number;
  sellerName: string;
  sellerContact: string;
  isAgentBooking: boolean;
}

interface ETicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: ETicketData | null;
}

export default function ETicketModal({ isOpen, onClose, ticket }: ETicketModalProps) {
  if (!isOpen || !ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm tracking-wide">
              E-TICKET CONFIRMATION (OFFLINE INVENTORY ISSUED)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Body */}
        <div className="p-6 space-y-6" id="printable-ticket">
          {/* Top Brand & Agency Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-2">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Issuing Agency
              </div>
              <div className="text-base font-bold text-slate-900">
                {ticket.sellerName}
              </div>
              <div className="text-xs text-slate-500">
                Contact: {ticket.sellerContact} • Verified Travel Partner
              </div>
            </div>

            <div className="text-left sm:text-right bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100">
              <div className="text-[10px] text-blue-700 font-semibold uppercase tracking-wider">
                Airline PNR
              </div>
              <div className="text-xl font-mono font-extrabold text-blue-950 tracking-wider">
                {ticket.pnr}
              </div>
              <div className="text-[10px] text-slate-500">
                Ref: {ticket.bookingRef}
              </div>
            </div>
          </div>

          {/* Flight Summary Card */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-inner">
            <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-300">{ticket.airlineName}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">
                  {ticket.flightNumber}
                </span>
              </div>
              <div className="text-slate-300 font-medium">
                📅 {ticket.travelDate}
              </div>
            </div>

            {/* Flight Route Diagram */}
            <div className="grid grid-cols-3 items-center py-4 text-center">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {ticket.originCode}
                </div>
                <div className="text-[11px] sm:text-xs text-blue-200 font-medium">
                  {ticket.originCity}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                  {ticket.departureTime}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 rotate-90" />
                <span className="text-[9px] sm:text-[10px] text-blue-300 mt-1 uppercase tracking-wider">
                  Non-Stop Domestic
                </span>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {ticket.destinationCode}
                </div>
                <div className="text-[11px] sm:text-xs text-blue-200 font-medium">
                  {ticket.destinationCity}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                  {ticket.arrivalTime}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
              <span className="flex items-center gap-1.5">
                <Luggage className="w-3.5 h-3.5 text-amber-300" />
                Baggage: {ticket.baggageInfo}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-semibold">
                Confirmed Seat Block
              </span>
            </div>
          </div>

          {/* Passenger Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Passenger Manifest
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Passenger Name</th>
                    <th className="py-2.5 px-3">Gender</th>
                    <th className="py-2.5 px-3">Seat</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {ticket.passengers.map((p, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3 text-slate-400">{idx + 1}</td>
                      <td className="py-2 px-3 font-semibold">
                        {p.title} {p.firstName} {p.lastName}
                      </td>
                      <td className="py-2 px-3 uppercase text-slate-500">{p.gender}</td>
                      <td className="py-2 px-3 font-mono text-blue-700">
                        {p.seatNumber || `${12 + idx}A`}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing & Barcode Aesthetics */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <div>
              <div className="text-[11px] text-slate-500">Total Customer Paid (Inclusive of GST)</div>
              <div className="text-2xl font-black text-slate-900">
                {formatINR(ticket.totalAmount)}
              </div>
              <div className="text-[10px] text-slate-400">
                SAC: 9964 (Domestic Passenger Transport)
              </div>
            </div>

            {/* Visual Barcode Graphic */}
            <div className="flex flex-col items-center">
              <div className="font-mono text-[9px] tracking-widest text-slate-400 mb-1">
                * {ticket.pnr}-{ticket.flightNumber} *
              </div>
              <div className="h-8 flex items-center gap-[2px]">
                {[...Array(38)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full bg-slate-900 ${
                      i % 3 === 0 ? "w-[3px]" : i % 5 === 0 ? "w-[1.5px]" : "w-[1px]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Guaranteed Fixed Departure Ticket</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
