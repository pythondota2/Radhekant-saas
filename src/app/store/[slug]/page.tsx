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
import { formatINR } from "@/lib/utils";
import AgentStoreClient from "@/components/AgentStoreClient";
import { getAgentBySlug } from "@/lib/dataService";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function AgentStorePage({ params }: StorePageProps) {
  const { slug } = await params;

  const agentData = await getAgentBySlug(slug);

  if (!agentData || !agentData.profile) {
    notFound();
  }

  const { profile: agentProfile, flights, products } = agentData;

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-8">
      
      {/* Agent Brand Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black text-3xl flex items-center justify-center shadow-xl border-2 border-amber-300">
              {agentProfile.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {agentProfile.name}
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
                  {agentProfile.phone}
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
            {agentProfile.whatsapp && (
              <a
                href={`https://wa.me/${agentProfile.whatsapp.replace(/[^0-9]/g, "")}`}
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
        agencyName={agentProfile.name}
        flights={flights}
        products={products}
      />

    </div>
  );
}
