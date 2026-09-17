"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  Box, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Clock, 
  MessageSquare, 
  Share2, 
  User, 
  CheckCircle2,
  Building,
  Store,
  ChevronRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";

export interface ReviewItem {
  id: string;
  reviewerName: string;
  reviewerCity?: string | null;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface FullProduct {
  id: string;
  title: string;
  slug: string;
  categoryType: "FURNITURE" | "HOME_DECOR" | "HARDWARE";
  categoryName: string;
  categorySlug: string;
  description: string;
  images: string[];
  hsnCode?: string | null;
  gstRate: number;
  isFlagship: boolean;
  sourceCountry: string;
  dimensions?: string | null;
  material?: string | null;
  cbmVolume?: number | null;
  assemblyRequired: boolean;
  warrantyYears: number;
  stock: number;
  priceB2C: number;
  priceB2B?: number | null;
  sellerName: string;
  sellerSlug?: string;
  sellerCity?: string;
  sellerPhone?: string;
  bulkSlabs?: {
    minQty: number;
    maxQty?: number | null;
    unitPrice: number;
  }[];
  reviews: ReviewItem[];
}

interface ProductPageClientProps {
  product: FullProduct;
  relatedProducts: {
    id: string;
    title: string;
    slug: string;
    priceB2C: number;
    image: string;
    categoryName: string;
  }[];
}

export default function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const { persona } = useApp();
  const isAgent = persona === "AGENT";

  // Gallery state
  const [activeImage, setActiveImage] = useState(product.images[0]);

  // Quantity & Pricing state
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Pincode state
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(product.reviews);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Calculate unit price based on slabs or agent wholesale
  let unitPrice = product.priceB2C;
  if (isAgent && product.priceB2B) {
    unitPrice = product.priceB2B;
  } else if (product.bulkSlabs && product.bulkSlabs.length > 0) {
    const matchingSlab = product.bulkSlabs.find(
      (s) => quantity >= s.minQty && (s.maxQty == null || quantity <= s.maxQty)
    );
    if (matchingSlab) {
      unitPrice = matchingSlab.unitPrice;
    }
  }

  // Calculate review score statistics
  const totalReviews = reviewsList.length;
  const avgRating = totalReviews > 0
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeResult("✓ Serviceable! Surface transit delivery in 3 to 5 business days.");
    } else {
      setPincodeResult("⚠️ Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newTitle.trim() || !newComment.trim()) return;

    const addedReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      reviewerName: newAuthor,
      reviewerCity: newCity || "Verified Buyer",
      rating: newRating,
      title: newTitle,
      comment: newComment,
      isVerifiedPurchase: true,
      createdAt: "Just now",
    };

    setReviewsList([addedReview, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewFormOpen(false);
      setNewAuthor("");
      setNewCity("");
      setNewTitle("");
      setNewComment("");
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href={`/#${product.categoryType.toLowerCase()}`} className="hover:text-blue-600 transition">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Hero Grid */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery (lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            {product.isFlagship && (
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Radhekant Flagship Import ({product.sourceCountry})
              </div>
            )}
            {product.cbmVolume && (
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg">
                Volumetric Freight: {product.cbmVolume} CBM
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? "border-blue-600 shadow-md scale-105" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Specifications Strip */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-blue-600" />
              Dimensions, Packaging & Logistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {product.dimensions && (
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Dimensions</span>
                  <span className="font-bold text-slate-800">{product.dimensions}</span>
                </div>
              )}
              {product.material && (
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Material Composition</span>
                  <span className="font-bold text-slate-800">{product.material}</span>
                </div>
              )}
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Assembly Requirement</span>
                <span className="font-bold text-slate-800">
                  {product.assemblyRequired ? "Carpenter Assembly Required" : "Pre-Assembled / Ready to Use"}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Warranty Protection</span>
                <span className="font-bold text-slate-800">
                  {product.warrantyYears} Year Structural Warranty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Slabs, Pincode & Buy Box (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{avgRating}</span>
                <span className="text-slate-400 font-normal">({totalReviews} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {formatINR(unitPrice * quantity)}
              </span>
              {quantity > 1 && (
                <span className="text-xs text-slate-500">
                  ({formatINR(unitPrice)} / unit)
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>Includes {product.gstRate}% GST</span>
              <span>•</span>
              {product.hsnCode && <span className="font-mono">HSN Code: {product.hsnCode}</span>}
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Tax Invoice Provided</span>
            </div>

            {/* Agent Wholesale Alert */}
            {isAgent && product.priceB2B && (
              <div className="bg-amber-100 text-amber-900 p-3 rounded-xl border border-amber-300 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold">Agent Trade Wholesale Rate:</span> {formatINR(product.priceB2B)}
                </div>
                <span className="font-extrabold text-amber-950">
                  Save {formatINR(product.priceB2C - product.priceB2B)}/unit
                </span>
              </div>
            )}

            {/* Hardware Bulk Slabs */}
            {product.bulkSlabs && product.bulkSlabs.length > 0 && (
              <div className="pt-3 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-800 mb-2">
                  📦 Contractor & Trade Tiered Slabs:
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {product.bulkSlabs.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl border transition ${
                        quantity >= s.minQty && (s.maxQty == null || quantity <= s.maxQty)
                          ? "bg-blue-100 border-blue-500 font-bold text-blue-900"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold text-slate-400">
                        {s.minQty}{s.maxQty ? ` - ${s.maxQty}` : "+"} units
                      </div>
                      <div className="font-mono font-extrabold text-slate-900 mt-0.5">
                        {formatINR(s.unitPrice)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-700">Quantity:</span>
            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-slate-100 text-slate-700 font-black text-sm transition"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-14 text-center text-xs font-bold py-2 border-x border-slate-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-slate-100 text-slate-700 font-black text-sm transition"
              >
                +
              </button>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {product.stock} units available in warehouse
            </span>
          </div>

          {/* PIN code delivery checker */}
          <form onSubmit={handlePincodeCheck} className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              Check Indian Delivery & Heavy Freight
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Indian PIN (e.g. 110001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 flex-1 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition"
              >
                Check
              </button>
            </div>
            {pincodeResult && (
              <p className="text-[11px] font-semibold text-emerald-700 mt-1">
                {pincodeResult}
              </p>
            )}
          </form>

          {/* Action Button */}
          <div className="space-y-2 pt-2">
            {orderPlaced ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Order Placed! Dispatch confirmed with GST Tax Invoice.</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOrderPlaced(true);
                  setTimeout(() => setOrderPlaced(false), 3000);
                }}
                className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2"
              >
                <span>{isAgent ? "Dispatch Trade Order (B2B Rate)" : "Buy Now with GST Invoice"}</span>
                <span>•</span>
                <span>{formatINR(unitPrice * quantity)}</span>
              </button>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Genuine Factory Sourced
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-500" /> 24h Order Dispatch
              </span>
            </div>
          </div>

          {/* Seller Profile Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center">
                <Store className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Fulfilled by</span>
                <div className="font-bold text-slate-900">{product.sellerName}</div>
                {product.sellerCity && <div className="text-[11px] text-slate-500">{product.sellerCity}</div>}
              </div>
            </div>

            {product.sellerSlug && (
              <Link
                href={`/store/${product.sellerSlug}`}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Visit Store <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        
        {/* Reviews Summary Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Customer Reviews & Ratings
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {avgRating} / 5.0
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {totalReviews} verified purchaser reviews across India.
            </p>
          </div>

          <button
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow"
          >
            {isReviewFormOpen ? "Cancel Review" : "+ Write a Review"}
          </button>
        </div>

        {/* Review Form Drawer */}
        {isReviewFormOpen && (
          <form
            onSubmit={handleAddReview}
            className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs animate-in fade-in"
          >
            <h3 className="font-bold text-sm text-slate-900">Share Your Product Experience</h3>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you! Your verified review has been published.</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City & State</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Review Headline *</label>
                  <input
                    type="text"
                    placeholder="e.g. Excellent build quality, exactly as shown"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Detailed Review *</label>
                  <textarea
                    rows={3}
                    placeholder="Describe packaging, material finish, delivery, or contractor experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition"
                  >
                    Submit Review
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">{review.title}</span>
                </div>

                <div className="text-[11px] text-slate-400">{review.createdAt}</div>
              </div>

              <p className="text-slate-600 leading-relaxed pt-1">{review.comment}</p>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 font-medium">
                <span className="text-slate-800 font-bold">{review.reviewerName}</span>
                {review.reviewerCity && <span>• {review.reviewerCity}</span>}
                {review.isVerifiedPurchase && (
                  <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            More in {product.categoryName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/product/${rel.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-lg transition group flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 line-clamp-1">
                    {rel.title}
                  </h4>
                  <div className="mt-2 text-sm font-black text-slate-900">
                    {formatINR(rel.priceB2C)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
