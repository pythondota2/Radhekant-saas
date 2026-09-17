"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Check, Truck, ShieldCheck, Box, Ruler, Sparkles, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  categoryType: "FURNITURE" | "HOME_DECOR" | "HARDWARE";
  categoryName: string;
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
  bulkSlabs?: {
    minQty: number;
    maxQty?: number | null;
    unitPrice: number;
  }[];
}

interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const { persona } = useApp();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const currentImage = selectedImage || product.images[0];
  const isAgent = persona === "AGENT";

  // Calculate price based on slabs for hardware or wholesale for agents
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

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("Serviceable! Standard delivery 4-6 business days via surface freight.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase">
              {product.categoryName}
            </span>
            {product.isFlagship && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                <Sparkles className="w-3 h-3" />
                Radhekant Flagship Import ({product.sourceCountry})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-auto">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium">
                Seller: {product.sellerName}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                      currentImage === img ? "border-blue-600" : "border-slate-200"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-slate-600" />
                Technical Specifications & Logistics
              </h4>

              {product.dimensions && (
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Dimensions:</span>
                  <span className="font-medium text-slate-800">{product.dimensions}</span>
                </div>
              )}

              {product.material && (
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Material Composition:</span>
                  <span className="font-medium text-slate-800">{product.material}</span>
                </div>
              )}

              {product.cbmVolume && (
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Volumetric Freight (CBM):</span>
                  <span className="font-semibold text-blue-700">{product.cbmVolume} m³</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Assembly:</span>
                <span className="font-medium text-slate-800">
                  {product.assemblyRequired ? "Professional Carpenter Required (Guided)" : "Pre-Assembled / Ready to Use"}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Warranty:</span>
                <span className="font-medium text-slate-800">{product.warrantyYears} Year Comprehensive</span>
              </div>

              {product.hsnCode && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">HSN & GST:</span>
                  <span className="font-mono text-slate-700">HSN {product.hsnCode} ({product.gstRate}% GST)</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Details & Buying Actions */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  {formatINR(unitPrice * quantity)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-slate-500">
                    ({formatINR(unitPrice)} per unit)
                  </span>
                )}
              </div>

              {isAgent && product.priceB2B && (
                <div className="bg-amber-100/70 text-amber-900 p-2.5 rounded-lg border border-amber-300 text-xs flex items-center justify-between">
                  <span>
                    🏷️ <strong>Agent Trade Wholesale Rate:</strong> {formatINR(product.priceB2B)}
                  </span>
                  <span className="font-bold text-amber-950">
                    Saves {formatINR(product.priceB2C - product.priceB2B)}/unit
                  </span>
                </div>
              )}

              {/* Bulk Slabs for Hardware */}
              {product.bulkSlabs && product.bulkSlabs.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-700 mb-1.5">
                    📦 B2B Tiered Bulk Pricing (Contractors & Dealers):
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px] text-center">
                    {product.bulkSlabs.map((s, idx) => (
                      <div
                        key={idx}
                        className={`p-1.5 rounded border ${
                          quantity >= s.minQty && (s.maxQty == null || quantity <= s.maxQty)
                            ? "bg-blue-100 border-blue-400 font-bold text-blue-900"
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        <div>{s.minQty}{s.maxQty ? ` - ${s.maxQty}` : "+"} units</div>
                        <div className="font-mono text-slate-900">{formatINR(s.unitPrice)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-700">Quantity:</label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 font-bold text-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="w-12 text-center text-xs font-semibold py-1.5 border-x border-slate-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 font-bold text-sm"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-500">
                ({product.stock} units ready in warehouse)
              </span>
            </div>

            {/* PIN Code Checker */}
            <form onSubmit={handlePincodeCheck} className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                Check Pincode Delivery & Heavy Freight
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 110001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 flex-1"
                />
                <button
                  type="submit"
                  className="text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-lg transition"
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <div className="text-[11px] font-medium text-emerald-700 mt-1">
                  ✓ {pincodeStatus}
                </div>
              )}
            </form>

            {/* Order Action Button */}
            <div className="pt-2">
              {orderPlaced ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Order Dispatched! GST Tax Invoice Generated.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>{isAgent ? "Dispatch Trade Order (B2B Rate)" : "Buy Now with GST Invoice"}</span>
                    <span>•</span>
                    <span>{formatINR(unitPrice * quantity)}</span>
                  </button>

                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="block text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline py-1 transition"
                  >
                    Open Full Product Page & Verified Customer Reviews ➔
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
