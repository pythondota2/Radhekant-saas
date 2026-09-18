import React from "react";
import LandingPageClient from "@/components/LandingPageClient";
import { getFlights, getProducts, getAgents } from "@/lib/dataService";

export const revalidate = 60;

export default async function HomePage() {
  const [flights, products, agentsDb] = await Promise.all([
    getFlights(),
    getProducts(),
    getAgents(),
  ]);

  const featuredFlights = flights.slice(0, 4);
  const featuredProducts = products.slice(0, 6);
  const agents = agentsDb.slice(0, 4).map((a) => ({
    name: a.name,
    slug: a.slug,
    category: a.categoryLabel,
    city: `${a.city}, ${a.state}`,
    bio: a.bio || "Certified Radhekant Verified Partner with direct inventory access.",
    listingsCount: a.flightsCount + a.productsCount,
    phone: a.phone,
  }));

  return (
    <LandingPageClient
      featuredFlights={featuredFlights}
      featuredProducts={featuredProducts}
      agents={agents}
    />
  );
}
