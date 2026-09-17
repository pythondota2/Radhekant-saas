import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Plane, 
  Sofa, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";
import AgentStoreClient from "@/components/AgentStoreClient";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function AgentStorePage({ params }: StorePageProps) {
  const { slug } = await params;

  // Fetch agent profile
  const agentProfile = await prisma.agentProfile.findUnique({
    where: { slug },
    include: {
      user: {
        include: {
          flightListings: {
            where: { status: "ACTIVE" },
          },
          productListings: {
            where: { status: "ACTIVE" },
            include: { category: true },
          },
        },
      },
    },
  });

  if (!agentProfile) {
    notFound();
  }

  const flights = agentProfile.user.flightListings.map((f) => ({
    id: f.id,
    sellerId: f.sellerId,
    sellerName: agentProfile.agencyName,
    sellerPhone: agentProfile.contactPhone,
    isFlagship: false,
    airlineName: f.airlineName,
    airlineCode: f.airlineCode,
    flightNumber: f.flightNumber,
    originCity: f.originCity,
    originCode: f.originCode,
    destinationCity: f.destinationCity,
    destinationCode: f.destinationCode,
    departureTime: f.departureTime,
    arrivalTime: f.arrivalTime,
    travelDate: f.travelDate,
    availableSeats: f.availableSeats,
    netFare: f.netFare,
    retailFare: f.retailFare,
    baggageInfo: f.baggageInfo,
    masterPnr: f.masterPnr,
    nameCutoffTime: f.nameCutoffTime,
  }));

  const products = agentProfile.user.productListings.map((p) => {
    let parsedImages: string[] = [];
    try {
      parsedImages = JSON.parse(p.images);
    } catch {
      parsedImages = [p.images];
    }
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      categoryType: p.category.type as "FURNITURE" | "HOME_DECOR" | "HARDWARE",
      categoryName: p.category.name,
      description: p.description,
      images: parsedImages,
      hsnCode: p.hsnCode,
      gstRate: p.gstRate,
      isFlagship: false,
      sourceCountry: p.sourceCountry,
      dimensions: p.dimensions,
      material: p.material,
      cbmVolume: p.cbmVolume,
      assemblyRequired: p.assemblyRequired,
      warrantyYears: p.warrantyYears,
      stock: p.stock,
      priceB2C: p.priceB2C,
      priceB2B: p.priceB2B,
      sellerName: agentProfile.agencyName,
    };
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-8">
      
      {/* Agent Brand Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black text-3xl flex items-center justify-center shadow-xl border-2 border-amber-300">
              {agentProfile.agencyName.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {agentProfile.agencyName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Radhekant Partner
                </span>
              </div>

              {agentProfile.bio && (
                <p className="text-xs text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
                  {agentProfile.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {agentProfile.city}, {agentProfile.state}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  {agentProfile.contactPhone}
                </span>
                {agentProfile.gstin && (
                  <span className="font-mono text-slate-400">
                    GSTIN: {agentProfile.gstin}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {agentProfile.whatsappNumber && (
              <a
                href={`https://wa.me/${agentProfile.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
            <Link
              href="/"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
            >
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* Client-interactive Flight & Product Listings for this Agent */}
      <AgentStoreClient
        agencyName={agentProfile.agencyName}
        flights={flights}
        products={products}
      />

    </div>
  );
}
