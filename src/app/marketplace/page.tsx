import React from "react";
import { prisma } from "@/lib/prisma";
import MarketplaceClient from "@/components/MarketplaceClient";
import { FlightItem } from "@/components/FlightBookingModal";
import { ProductItem } from "@/components/ProductDetailModal";

export const revalidate = 0;

export default async function MarketplacePage() {
  const flightsDb = await prisma.flightInventory.findMany({
    where: { status: "ACTIVE" },
    include: {
      seller: {
        include: { agentProfile: true },
      },
    },
    orderBy: { travelDate: "asc" },
  });

  const productsDb = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      category: true,
      bulkSlabs: true,
      seller: {
        include: { agentProfile: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const flights: FlightItem[] = flightsDb.map((f) => ({
    id: f.id,
    sellerId: f.sellerId,
    sellerName: f.seller.agentProfile?.agencyName || (f.seller.role === "SUPER_ADMIN" ? "Radhekant Flagship Consolidator" : f.seller.name),
    sellerPhone: f.seller.agentProfile?.contactPhone || f.seller.phone || undefined,
    isFlagship: f.seller.role === "SUPER_ADMIN",
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

  const products: ProductItem[] = productsDb.map((p) => {
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
      isFlagship: p.isFlagship,
      sourceCountry: p.sourceCountry,
      dimensions: p.dimensions,
      material: p.material,
      cbmVolume: p.cbmVolume,
      assemblyRequired: p.assemblyRequired,
      warrantyYears: p.warrantyYears,
      stock: p.stock,
      priceB2C: p.priceB2C,
      priceB2B: p.priceB2B,
      sellerName: p.seller.agentProfile?.agencyName || (p.isFlagship ? "Radhekant Direct Import" : p.seller.name),
      sellerSlug: p.seller.agentProfile?.slug,
      bulkSlabs: p.bulkSlabs.map((s) => ({
        minQty: s.minQty,
        maxQty: s.maxQty,
        unitPrice: s.unitPrice,
      })),
    };
  });

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
              Central Multi-Commerce Marketplace
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready-Made Furniture, Decor & Hardware Depot
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Factory direct Chinese imports, Indian artisan handcrafted Sheesham woodcraft, and commercial contractor supplies with verified GST billing.
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
