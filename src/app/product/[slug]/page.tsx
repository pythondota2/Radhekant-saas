import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductPageClient, { FullProduct } from "@/components/ProductPageClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Fetch product from DB with category, seller, bulk slabs, and reviews
  const productDb = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      bulkSlabs: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
      seller: {
        include: {
          agentProfile: true,
        },
      },
    },
  });

  if (!productDb) {
    notFound();
  }

  // Fetch related products in the same category
  const relatedDb = await prisma.product.findMany({
    where: {
      categoryId: productDb.categoryId,
      id: { not: productDb.id },
      status: "ACTIVE",
    },
    take: 3,
    include: {
      category: true,
    },
  });

  let parsedImages: string[] = [];
  try {
    parsedImages = JSON.parse(productDb.images);
  } catch {
    parsedImages = [productDb.images];
  }

  const product: FullProduct = {
    id: productDb.id,
    title: productDb.title,
    slug: productDb.slug,
    categoryType: productDb.category.type as "FURNITURE" | "HOME_DECOR" | "HARDWARE",
    categoryName: productDb.category.name,
    categorySlug: productDb.category.slug,
    description: productDb.description,
    images: parsedImages,
    hsnCode: productDb.hsnCode,
    gstRate: productDb.gstRate,
    isFlagship: productDb.isFlagship,
    sourceCountry: productDb.sourceCountry,
    dimensions: productDb.dimensions,
    material: productDb.material,
    cbmVolume: productDb.cbmVolume,
    assemblyRequired: productDb.assemblyRequired,
    warrantyYears: productDb.warrantyYears,
    stock: productDb.stock,
    priceB2C: productDb.priceB2C,
    priceB2B: productDb.priceB2B,
    sellerName: productDb.seller.agentProfile?.agencyName || (productDb.isFlagship ? "Radhekant Direct Import" : productDb.seller.name),
    sellerSlug: productDb.seller.agentProfile?.slug,
    sellerCity: productDb.seller.agentProfile?.city,
    sellerPhone: productDb.seller.agentProfile?.contactPhone,
    bulkSlabs: productDb.bulkSlabs.map((s) => ({
      minQty: s.minQty,
      maxQty: s.maxQty,
      unitPrice: s.unitPrice,
    })),
    reviews: productDb.reviews.map((r) => ({
      id: r.id,
      reviewerName: r.reviewerName,
      reviewerCity: r.reviewerCity,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      isVerifiedPurchase: r.isVerifiedPurchase,
      createdAt: new Date(r.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    })),
  };

  const relatedProducts = relatedDb.map((p) => {
    let imgs: string[] = [];
    try {
      imgs = JSON.parse(p.images);
    } catch {
      imgs = [p.images];
    }
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      priceB2C: p.priceB2C,
      image: imgs[0] || "",
      categoryName: p.category.name,
    };
  });

  return (
    <ProductPageClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
