"use client";

import React, { useState } from "react";
import { X, Plane, Wallet, ShieldCheck, UserPlus, Trash2, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import ETicketModal, { ETicketData } from "./ETicketModal";

export interface FlightItem {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerPhone?: string;
  isFlagship: boolean;
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
  availableSeats: number;
  netFare: number;
  retailFare: number;
  baggageInfo: string;
  masterPnr?: string | null;
  nameCutoffTime?: string | null;
}

interface FlightBookingModalProps {
  flight: FlightItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: (flightId: string, bookedSeats: number) => void;
}

interface PassengerForm {
  title: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
}

export default function FlightBookingModal({
  flight,
  isOpen,
  onClose,
  onBookingSuccess,
}: FlightBookingModalProps) {
  const { persona, agentWallet, deductWallet } = useApp();

  const [markupPerPassenger, setMarkupPerPassenger] = useState<number>(500);
  const [passengers, setPassengers] = useState<PassengerForm[]>([
    { title: "Mr", firstName: "", lastName: "", age: "29", gender: "MALE" },
  ]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedTicket, setGeneratedTicket] = useState<ETicketData | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  if (!isOpen || !flight) return null;

  const numPax = passengers.length;
  const isAgent = persona === "AGENT";

  // Calculations:
  // For Agent: wholesale rate = netFare * numPax. Agent can add custom markup. Total customer billed = (netFare + markup) * numPax
  // For Retail Customer: rate = retailFare * numPax
  const netTotalCost = flight.netFare * numPax;
  const customerTotalBilled = isAgent
    ? (flight.netFare + markupPerPassenger) * numPax
    : flight.retailFare * numPax;

  const handleAddPassenger = () => {
    if (passengers.length >= flight.availableSeats) {
      setErrorMsg(`Only ${flight.availableSeats} seats available on this flight.`);
      return;
    }
    setPassengers([
      ...passengers,
      { title: "Mr", firstName: "", lastName: "", age: "28", gender: "MALE" },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerForm,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate inputs
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].firstName.trim() || !passengers[i].lastName.trim()) {
        setErrorMsg(`Please provide full name for Passenger #${i + 1}`);
        return;
      }
    }

    if (!contactPhone.trim()) {
      setErrorMsg("Please enter primary contact phone number.");
      return;
    }

    setBookingLoading(true);

    try {
      // Check agent wallet if agent
      if (isAgent) {
        if (agentWallet < netTotalCost) {
          setErrorMsg(
            `Insufficient wallet balance (${formatINR(
              agentWallet
            )}). Needed: ${formatINR(netTotalCost)}. Please top up your wallet.`
          );
          setBookingLoading(false);
          return;
        }
        deductWallet(netTotalCost);
      }

      // Generate realistic airline PNR
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const randomPnr = `${flight.airlineCode}${randomSuffix}`;
      const bookingRef = `RAD-FD-${Math.floor(10000 + Math.random() * 90000)}`;

      const ticketData: ETicketData = {
        pnr: randomPnr,
        bookingRef,
        airlineName: flight.airlineName,
        airlineCode: flight.airlineCode,
        flightNumber: flight.flightNumber,
        originCity: flight.originCity,
        originCode: flight.originCode,
        destinationCity: flight.destinationCity,
        destinationCode: flight.destinationCode,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        travelDate: flight.travelDate,
        passengers: passengers.map((p, idx) => ({
          title: p.title,
          firstName: p.firstName,
          lastName: p.lastName,
          gender: p.gender,
          seatNumber: `${14 + idx}${idx % 2 === 0 ? "A" : "B"}`,
        })),
        baggageInfo: flight.baggageInfo,
        totalAmount: customerTotalBilled,
        sellerName: isAgent ? "SkyAir Holidays & Consolidators" : flight.sellerName,
        sellerContact: isAgent ? "+91 98111 22334" : (flight.sellerPhone || "+91 98765 43210"),
        isAgentBooking: isAgent,
      };

      // Notify parent to decrement available seats
      onBookingSuccess?.(flight.id, numPax);

      setGeneratedTicket(ticketData);
      setIsTicketModalOpen(true);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg("Failed to book seats. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleTicketClose = () => {
    setIsTicketModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Instant Offline Ticket Issuance
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{flight.originCode}</span>
                <span className="text-blue-400">➔</span>
                <span>{flight.destinationCode}</span>
                <span className="text-xs bg-blue-800/80 px-2 py-0.5 rounded text-blue-200 font-mono ml-2">
                  {flight.flightNumber} ({flight.airlineName})
                </span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmitBooking}>
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Flight Summary Strip */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Departure:</span>{" "}
                  <span className="font-semibold text-slate-800">
                    {flight.departureTime} ({flight.originCity})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Arrival:</span>{" "}
                  <span className="font-semibold text-slate-800">
                    {flight.arrivalTime} ({flight.destinationCity})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Travel Date:</span>{" "}
                  <span className="font-semibold text-slate-800">{flight.travelDate}</span>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-semibold">
                  {flight.availableSeats} Seats Available
                </div>
              </div>

              {/* B2B Agent Markup Card (Shown only to Agents) */}
              {isAgent && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                        B2B Agent Portal Pricing & Wallet
                      </span>
                    </div>
                    <span className="text-xs text-amber-800 font-medium">
                      Your Wallet: <strong className="text-amber-950">{formatINR(agentWallet)}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                      <div className="text-slate-500">Wholesale Net Fare</div>
                      <div className="text-base font-bold text-slate-900">
                        {formatINR(flight.netFare)} <span className="text-[10px] font-normal text-slate-500">/ pax</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                      <label className="text-slate-700 font-semibold block mb-1">
                        Your Custom Markup
                      </label>
                      <div className="flex items-center">
                        <span className="text-slate-400 mr-1 font-bold">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="50"
                          value={markupPerPassenger}
                          onChange={(e) => setMarkupPerPassenger(Number(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-bold text-amber-800"
                        />
                      </div>
                    </div>

                    <div className="bg-amber-100/70 p-2.5 rounded-lg border border-amber-300">
                      <div className="text-amber-900 font-medium">Client E-Ticket Price</div>
                      <div className="text-base font-extrabold text-amber-950">
                        {formatINR(flight.netFare + markupPerPassenger)}{" "}
                        <span className="text-[10px] font-normal text-amber-800">/ pax</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    💡 The issued PDF E-ticket will display <strong>{formatINR(flight.netFare + markupPerPassenger)}</strong> and your agency details. Your wholesale net fare remains 100% confidential.
                  </p>
                </div>
              )}

              {/* Passenger Manifest Inputs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Passenger Information ({numPax})</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddPassenger}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Passenger</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {passengers.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Passenger #{idx + 1} (Adult)</span>
                        {passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePassenger(idx)}
                            className="text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="col-span-1">
                          <select
                            value={p.title}
                            onChange={(e) =>
                              handlePassengerChange(idx, "title", e.target.value)
                            }
                            className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium"
                          >
                            <option value="Mr">Mr.</option>
                            <option value="Mrs">Mrs.</option>
                            <option value="Ms">Ms.</option>
                            <option value="Master">Master</option>
                          </select>
                        </div>
                        <div className="col-span-1">
                          <select
                            value={p.gender}
                            onChange={(e) =>
                              handlePassengerChange(idx, "gender", e.target.value)
                            }
                            className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium"
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <input
                            type="text"
                            placeholder="First / Given Name"
                            value={p.firstName}
                            onChange={(e) =>
                              handlePassengerChange(idx, "firstName", e.target.value)
                            }
                            className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
                            required
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <input
                            type="text"
                            placeholder="Last / Surname"
                            value={p.lastName}
                            onChange={(e) =>
                              handlePassengerChange(idx, "lastName", e.target.value)
                            }
                            className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Contact & Ticket Delivery
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1">Contact Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Email (For PDF Ticket)</label>
                    <input
                      type="email"
                      placeholder="traveler@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}
            </div>

            {/* Footer Summary & Booking Action */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">
                  {isAgent ? "Deduction from Wallet:" : "Total Payable (All Inclusive):"}
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {formatINR(isAgent ? netTotalCost : customerTotalBilled)}
                </div>
                {isAgent && (
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    Your Agent Commission / Profit: {formatINR(markupPerPassenger * numPax)}
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition disabled:opacity-50"
                >
                  {bookingLoading ? (
                    "Issuing Ticket..."
                  ) : (
                    <>
                      <span>{isAgent ? "Confirm & Deduct Wallet" : "Book & Pay Now"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>

      {/* ETicket Pop-up upon successful booking */}
      <ETicketModal
        isOpen={isTicketModalOpen}
        onClose={handleTicketClose}
        ticket={generatedTicket}
      />
    </>
  );
}
