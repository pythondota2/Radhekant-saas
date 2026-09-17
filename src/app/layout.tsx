import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import NavbarWrapper from "@/components/NavbarWrapper";

export const metadata: Metadata = {
  title: "Radhekant | Multi-Commerce & Domestic Flight SaaS Marketplace",
  description: "India's premier multi-vendor SaaS platform for offline domestic flight inventory, ready-made imported furniture, home decor, and industrial hardware supplies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-slate-50 min-h-screen flex flex-col text-slate-900">
        <AppProvider>
          <NavbarWrapper />
          <main className="flex-1">{children}</main>
          <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <span className="text-white font-bold text-base tracking-tight">
                    RADHEKANT
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enterprise-grade B2B/B2C SaaS Marketplace. Connecting travel consolidators, imported furniture suppliers, and industrial hardware distributors across India.
                </p>
                <div className="text-xs text-slate-500">
                  New Delhi • Mumbai • Bangalore
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Marketplace</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/#flights" className="hover:text-white transition">Domestic Fixed Departures</a></li>
                  <li><a href="/#furniture" className="hover:text-white transition">Imported Luxury Furniture</a></li>
                  <li><a href="/#decor" className="hover:text-white transition">Artisan Home Decor</a></li>
                  <li><a href="/#hardware" className="hover:text-white transition">Architectural Hardware Depot</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold text-sm mb-3">For Agents & Vendors</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/agent/plans" className="hover:text-white transition">Agent Membership Plans</a></li>
                  <li><a href="/agent/dashboard" className="hover:text-white transition">Agent Flight & Sales Desk</a></li>
                  <li><a href="/store/skyair-holidays" className="hover:text-white transition">Sample Agent Storefront</a></li>
                  <li><a href="/agent/plans" className="hover:text-white transition">Zero Commission Benefits</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Master Platform</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/admin/dashboard" className="hover:text-white transition">Super Admin Console</a></li>
                  <li><span className="text-slate-500">GST SAC 9964 / HSN 9403 Compliant</span></li>
                  <li><span className="text-slate-500">Row-Locked Offline Seat Inventory</span></li>
                  <li><span className="text-slate-500">Instant White-Label E-Tickets</span></li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
              <div>© 2026 Radhekant SaaS Platform. All rights reserved.</div>
              <div className="flex gap-4">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>GST Billing Compliance</span>
              </div>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
