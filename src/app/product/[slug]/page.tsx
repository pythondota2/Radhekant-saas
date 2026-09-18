import React from "react";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/ProductPageClient";
import { getProductBySlug } from "@/lib/dataService";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const { product, related } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = related.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    priceB2C: p.priceB2C,
    image: p.images[0] || "",
    categoryName: p.categoryName,
  }));

  return (
    <ProductPageClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
