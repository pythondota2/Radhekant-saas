import React from "react";
import { prisma } from "@/lib/prisma";
import LandingPageClient from "@/components/LandingPageClient";
import { FlightItem } from "@/components/FlightBookingModal";
import { ProductItem } from "@/components/ProductDetailModal";

export const revalidate = 0;

export default async function HomePage() {
  // 1. Fetch featured flights
  const flightsDb = await prisma.flightInventory.findMany({
    where: { status: "ACTIVE" },
    include: {
      seller: {
        include: { agentProfile: true },
      },
    },
    orderBy: { travelDate: "asc" },
    take: 4,
  });

  // 2. Fetch featured products
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
    take: 6,
  });

  // 3. Fetch verified agents for partner network showcase
  const agentsDb = await prisma.agentProfile.findMany({
    where: { kycStatus: "VERIFIED" },
    include: {
      user: {
        include: {
          flightListings: { where: { status: "ACTIVE" } },
          productListings: { where: { status: "ACTIVE" } },
        },
      },
    },
    take: 4,
  });

  const featuredFlights: FlightItem[] = flightsDb.map((f) => ({
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

  const featuredProducts: ProductItem[] = productsDb.map((p) => {
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

  const agents = agentsDb.map((a) => ({
    name: a.agencyName,
    slug: a.slug,
    category: a.user.flightListings.length > 0 ? "Aviation & Fixed Departures" : "Woodcraft & Furnishings",
    city: `${a.city}, ${a.state}`,
    bio: a.bio || "Certified Radhekant Verified Partner with direct inventory access.",
    listingsCount: a.user.flightListings.length + a.user.productListings.length,
    phone: a.contactPhone,
  }));

  return (
    <LandingPageClient
      featuredFlights={featuredFlights}
      featuredProducts={featuredProducts}
      agents={agents}
    />
  );
}
