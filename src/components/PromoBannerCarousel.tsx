"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plane, 
  Sofa, 
  Hammer, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Percent,
  Clock,
  ShieldCheck
} from "lucide-react";

export interface PromoBanner {
  id: string;
  tag: string;
  tagColor: "blue" | "amber" | "emerald" | "rose";
  headline: string;
  subheadline: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  accentImage?: string;
}

const defaultBanners: PromoBanner[] = [
  {
    id: "banner-1",
    tag: "Festive Aviation Block Inventory",
    tagColor: "blue",
    headline: "Autumn & Diwali Fixed Departures: Goa, Kashmir & South Corridors",
    subheadline: "Guaranteed offline group fare seats on IndiGo & Air India. Lock wholesale net rates now with zero peak-season fare surges.",
    badge: "Limited Seats Block",
    ctaText: "Search Flight Blocks",
    ctaLink: "/flights",
    bgGradient: "from-blue-950 via-slate-900 to-indigo-950",
  },
  {
    id: "banner-2",
    tag: "Container Import Clearance",
    tagColor: "amber",
    headline: "Italian Velvet Sectionals & Natural Carrara Marble Dining Sets",
    subheadline: "Direct factory sourced from Foshan & Shunde with certified Grade 304 bases. Surface transit delivery across 15,000+ PIN codes.",
    badge: "Direct Factory Wholesale",
    ctaText: "Explore Luxury Furniture",
    ctaLink: "/marketplace#furniture",
    bgGradient: "from-amber-950 via-stone-900 to-slate-950",
  },
  {
    id: "banner-3",
    tag: "Contractor & Builder Depot",
    tagColor: "emerald",
    headline: "Commercial SS 304 Soft-Close Hinges & Architectural Mortise Locks",
    subheadline: "Tiered wholesale slabs for interior designers and contractors. Starting at ₹1,350/box with full GST input tax credit.",
    badge: "Wholesale Slabs Active",
    ctaText: "Order Bulk Hardware",
    ctaLink: "/marketplace#hardware",
    bgGradient: "from-emerald-950 via-slate-900 to-teal-950",
  },
];

export default function PromoBannerCarousel({ banners = defaultBanners }: { banners?: PromoBanner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance banner every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const current = banners[currentIndex];

  const getTagClass = (color: PromoBanner["tagColor"]) => {
    switch (color) {
      case "amber":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "emerald":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "rose":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-12 text-white bg-gradient-to-r ${current.bgGradient} border border-white/10 shadow-2xl transition-all duration-700`}
      >
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getTagClass(
                current.tagColor
              )}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {current.tag}
            </span>

            <span className="bg-white/10 text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
              {current.badge}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            {current.headline}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {current.subheadline}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href={current.ctaLink}
              className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center gap-2 z-20">
          <button
            onClick={prevBanner}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextBanner}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition"
            aria-label="Next banner"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-6 sm:bottom-8 sm:left-12 flex items-center gap-1.5 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === i ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
