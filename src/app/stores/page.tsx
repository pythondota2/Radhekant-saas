import React from "react";
import { prisma } from "@/lib/prisma";
import StoresDirectoryClient, { AgentCardData } from "@/components/StoresDirectoryClient";

export const revalidate = 0;

export default async function StoresPage() {
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
    orderBy: { createdAt: "asc" },
  });

  const agents: AgentCardData[] = agentsDb.map((a) => {
    const flightCount = a.user.flightListings.length;
    const productCount = a.user.productListings.length;

    let categoryType: "FLIGHTS" | "FURNITURE" | "HARDWARE" | "MULTI" = "MULTI";
    let categoryLabel = "Travel & Commerce";

    if (flightCount > 0 && productCount === 0) {
      categoryType = "FLIGHTS";
      categoryLabel = "Aviation & Fixed Departures";
    } else if (flightCount === 0 && a.agencyName.toLowerCase().includes("hardware")) {
      categoryType = "HARDWARE";
      categoryLabel = "Hardware & Tools Depot";
    } else if (flightCount === 0 && (a.agencyName.toLowerCase().includes("wood") || a.agencyName.toLowerCase().includes("furnishing"))) {
      categoryType = "FURNITURE";
      categoryLabel = "Solid Woodcraft Studio";
    }

    return {
      id: a.id,
      name: a.agencyName,
      slug: a.slug,
      logo: a.agencyLogo,
      bio: a.bio,
      city: a.city,
      state: a.state,
      phone: a.contactPhone,
      whatsapp: a.whatsappNumber,
      gstin: a.gstin,
      categoryType,
      categoryLabel,
      flightsCount: flightCount,
      productsCount: productCount,
    };
  });

  return <StoresDirectoryClient agents={agents} />;
}
