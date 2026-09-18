import { prisma } from "@/lib/prisma";
import { FlightItem } from "@/components/FlightBookingModal";
import { ProductItem } from "@/components/ProductDetailModal";
import { FullProduct } from "@/components/ProductPageClient";
import { AgentCardData } from "@/components/StoresDirectoryClient";

// ==========================================
// 1. FALLBACK DATASETS (100% Offline / Serverless Resilient)
// ==========================================

export const fallbackFlights: FlightItem[] = [
  {
    id: "fl-1",
    sellerId: "seller-admin",
    sellerName: "Radhekant Flagship Consolidator",
    sellerPhone: "+91 98765 43210",
    isFlagship: true,
    airlineName: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E-205",
    originCity: "New Delhi",
    originCode: "DEL",
    destinationCity: "Goa (MOPA)",
    destinationCode: "GOX",
    departureTime: "06:15",
    arrivalTime: "08:50",
    travelDate: "2026-10-15",
    availableSeats: 19,
    netFare: 4200,
    retailFare: 5600,
    baggageInfo: "15kg Check-in + 7kg Cabin",
    masterPnr: "6E-GRP-9021",
    nameCutoffTime: "24 hours before departure",
  },
  {
    id: "fl-2",
    sellerId: "seller-skyair",
    sellerName: "SkyAir Holidays & Consolidators",
    sellerPhone: "+91 98111 22334",
    isFlagship: false,
    airlineName: "Air India",
    airlineCode: "AI",
    flightNumber: "AI-812",
    originCity: "New Delhi",
    originCode: "DEL",
    destinationCity: "Srinagar",
    destinationCode: "SXR",
    departureTime: "11:20",
    arrivalTime: "12:50",
    travelDate: "2026-10-18",
    availableSeats: 14,
    netFare: 5100,
    retailFare: 6800,
    baggageInfo: "15kg Check-in + 7kg Cabin",
    masterPnr: "AI-BLK-4410",
    nameCutoffTime: "48 hours before departure",
  },
  {
    id: "fl-3",
    sellerId: "seller-skyair",
    sellerName: "SkyAir Holidays & Consolidators",
    sellerPhone: "+91 98111 22334",
    isFlagship: false,
    airlineName: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E-512",
    originCity: "New Delhi",
    originCode: "DEL",
    destinationCity: "Bengaluru",
    destinationCode: "BLR",
    departureTime: "07:20",
    arrivalTime: "10:10",
    travelDate: "2026-10-20",
    availableSeats: 8,
    netFare: 3900,
    retailFare: 5200,
    baggageInfo: "15kg Check-in + 7kg Cabin",
    masterPnr: "6E-GRP-3319",
    nameCutoffTime: "24 hours before departure",
  },
  {
    id: "fl-4",
    sellerId: "seller-aerogo",
    sellerName: "AeroGo Holidays & Charters",
    sellerPhone: "+91 98444 55667",
    isFlagship: false,
    airlineName: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "SG-144",
    originCity: "Mumbai",
    originCode: "BOM",
    destinationCity: "Goa (Dabolim)",
    destinationCode: "GOI",
    departureTime: "14:15",
    arrivalTime: "15:30",
    travelDate: "2026-10-22",
    availableSeats: 12,
    netFare: 3400,
    retailFare: 4700,
    baggageInfo: "15kg Check-in + 7kg Cabin",
    masterPnr: "SG-BLK-7718",
    nameCutoffTime: "24 hours before departure",
  },
  {
    id: "fl-5",
    sellerId: "seller-aerogo",
    sellerName: "AeroGo Holidays & Charters",
    sellerPhone: "+91 98444 55667",
    isFlagship: false,
    airlineName: "Akasa Air",
    airlineCode: "QP",
    flightNumber: "QP-1310",
    originCity: "Mumbai",
    originCode: "BOM",
    destinationCity: "New Delhi",
    destinationCode: "DEL",
    departureTime: "18:40",
    arrivalTime: "21:00",
    travelDate: "2026-10-25",
    availableSeats: 8,
    netFare: 4100,
    retailFare: 5400,
    baggageInfo: "15kg Check-in + 7kg Cabin",
    masterPnr: "QP-GRP-5502",
    nameCutoffTime: "12 hours before departure",
  },
];

export const fallbackProducts: FullProduct[] = [
  {
    id: "prod-1",
    title: "Milano Luxe 6-Seater Modular L-Shape Sofa (Italian Velvet)",
    slug: "milano-luxe-6-seater-modular-sofa",
    categoryType: "FURNITURE",
    categoryName: "Ready-Made Furniture",
    categorySlug: "furniture",
    description: "Direct factory import from Shunde, Guangdong. Engineered with high-density 45D resilient foam, imported Italian stain-resistant velvet fabric, and brushed brass stainless steel base. Ideal for luxury residential lounges and corporate reception suites.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    ],
    hsnCode: "9403",
    gstRate: 18,
    isFlagship: true,
    sourceCountry: "China",
    dimensions: "L 280cm x W 180cm x H 85cm",
    material: "Italian Velvet + Kiln-dried Larch Wood Frame + SS 304 Brushed Gold",
    cbmVolume: 2.1,
    assemblyRequired: true,
    warrantyYears: 3,
    stock: 8,
    priceB2C: 74999,
    priceB2B: 58000,
    sellerName: "Radhekant Flagship Store",
    sellerSlug: "radhekant-flagship",
    sellerCity: "New Delhi",
    sellerPhone: "+91 98765 43210",
    bulkSlabs: [
      { minQty: 2, maxQty: 4, unitPrice: 55000 },
      { minQty: 5, maxQty: null, unitPrice: 51000 },
    ],
    reviews: [
      {
        id: "rev-1",
        reviewerName: "Amitabh Singhania",
        reviewerCity: "New Delhi",
        rating: 5,
        title: "Breathtaking Italian velvet finish and top-notch packaging",
        comment: "Ordered 2 sets for our luxury farmstay in Chattarpur. The foam density is solid 45D, no sagging, and the brushed brass footing looks ultra-premium. Very fast dispatch.",
        isVerifiedPurchase: true,
        createdAt: "3 days ago",
      },
      {
        id: "rev-2",
        reviewerName: "Pooja Malhotra",
        reviewerCity: "Gurugram",
        rating: 5,
        title: "Superb quality - exactly like imported Italian catalogues",
        comment: "I was initially skeptical about ordering furniture online, but Radhekant's team provided surface transit tracking and assembly assistance within 24 hours of delivery.",
        isVerifiedPurchase: true,
        createdAt: "1 week ago",
      },
    ],
  },
  {
    id: "prod-2",
    title: "Carrara Natural Marble 6-Seater Dining Set with Gold Base",
    slug: "carrara-natural-marble-dining-set",
    categoryType: "FURNITURE",
    categoryName: "Ready-Made Furniture",
    categorySlug: "furniture",
    description: "Direct import from Foshan stone masonry. Natural 35mm thick Italian Carrara marble slab with resin seal protection against wine and turmeric stains. Supported by architectural champagne-gold electroplated stainless steel pedestal bases.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=80",
    ],
    hsnCode: "9403",
    gstRate: 18,
    isFlagship: true,
    sourceCountry: "China",
    dimensions: "L 200cm x W 100cm x H 76cm",
    material: "Natural Carrara Marble (35mm) + SS 304 Champagne Gold Pedestal",
    cbmVolume: 1.6,
    assemblyRequired: true,
    warrantyYears: 5,
    stock: 5,
    priceB2C: 89999,
    priceB2B: 69000,
    sellerName: "Radhekant Flagship Store",
    sellerSlug: "radhekant-flagship",
    sellerCity: "New Delhi",
    sellerPhone: "+91 98765 43210",
    bulkSlabs: [
      { minQty: 2, maxQty: 3, unitPrice: 65000 },
      { minQty: 4, maxQty: null, unitPrice: 62000 },
    ],
    reviews: [
      {
        id: "rev-3",
        reviewerName: "Rajeev Chawla",
        reviewerCity: "Chandigarh",
        rating: 5,
        title: "Heavy, genuine marble top! Looks like a 2-lakh dining table",
        comment: "The marble slab came encased in a heavy wooden crate with zero scratches. The gold electroplated base is very sturdy. Completely transformed our dining room.",
        isVerifiedPurchase: true,
        createdAt: "5 days ago",
      },
    ],
  },
  {
    id: "prod-3",
    title: "Solid Sheesham Wood 6-Seater Dining Table Set (Honey Oak)",
    slug: "solid-sheesham-wood-dining-table",
    categoryType: "FURNITURE",
    categoryName: "Ready-Made Furniture",
    categorySlug: "furniture",
    description: "Handcrafted in Rajasthan using 100% seasoned termite-resistant Sheesham wood. Includes 6 cushioned dining chairs upholstered in neutral cream textured fabric.",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=1200&q=80",
    ],
    hsnCode: "9403",
    gstRate: 12,
    isFlagship: false,
    sourceCountry: "India",
    dimensions: "L 175cm x W 90cm x H 76cm",
    material: "Seasoned Indian Sheesham Hardwood",
    cbmVolume: 1.2,
    assemblyRequired: true,
    warrantyYears: 5,
    stock: 12,
    priceB2C: 38999,
    priceB2B: 29500,
    sellerName: "Bharat Woodcraft & Furnishings",
    sellerSlug: "bharat-woodcraft",
    sellerCity: "Jaipur",
    sellerPhone: "+91 98222 33445",
    bulkSlabs: [
      { minQty: 3, maxQty: 5, unitPrice: 28000 },
      { minQty: 6, maxQty: null, unitPrice: 26000 },
    ],
    reviews: [],
  },
  {
    id: "prod-4",
    title: "Commercial Grade SS 304 Soft-Close Hydraulic Hinges (Box of 20)",
    slug: "ss304-soft-close-hydraulic-hinges",
    categoryType: "HARDWARE",
    categoryName: "Hardware Supplies",
    categorySlug: "hardware",
    description: "Cold-rolled Grade 304 stainless steel with double copper hydraulic cylinder. Rated for 100,000 opening/closing cycles. 3D adjustable arm for full-overlay cabinet and wardrobe shutters.",
    images: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1200&q=80",
    ],
    hsnCode: "8302",
    gstRate: 18,
    isFlagship: true,
    sourceCountry: "India",
    dimensions: "Standard 35mm cup diameter, 105 degree opening",
    material: "SUS 304 Pure Stainless Steel",
    cbmVolume: 0.05,
    assemblyRequired: false,
    warrantyYears: 10,
    stock: 120,
    priceB2C: 1950,
    priceB2B: 1350,
    sellerName: "Radhekant Hardware Depot",
    sellerSlug: "radhekant-flagship",
    sellerCity: "New Delhi",
    sellerPhone: "+91 98765 43210",
    bulkSlabs: [
      { minQty: 5, maxQty: 19, unitPrice: 1250 },
      { minQty: 20, maxQty: null, unitPrice: 1100 },
    ],
    reviews: [
      {
        id: "rev-4",
        reviewerName: "Kailash Sharma (Interior Contractor)",
        reviewerCity: "Faridabad",
        rating: 5,
        title: "Flawless soft-close mechanism for modular kitchens",
        comment: "We ordered 40 boxes for a residential apartment project. The hydraulic damping is smooth, no shutter banging, and true SS 304 tested with acid test solution.",
        isVerifiedPurchase: true,
        createdAt: "2 weeks ago",
      },
    ],
  },
  {
    id: "prod-5",
    title: "Cast Brass Antique Moradabad Floor Lamp with Linen Shade",
    slug: "cast-brass-antique-moradabad-floor-lamp",
    categoryType: "HOME_DECOR",
    categoryName: "Home Decor & Lighting",
    categorySlug: "decor",
    description: "Cast in pure yellow brass by master Moradabad artisans. Heavy weighted base preventing tip-over, complete with natural beige linen drum shade and warm LED bulb.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80",
    ],
    hsnCode: "9405",
    gstRate: 18,
    isFlagship: false,
    sourceCountry: "India",
    dimensions: "Base Dia 30cm x Total Height 160cm",
    material: "Pure Brass Casting + Handwoven Linen Shade",
    cbmVolume: 0.25,
    assemblyRequired: true,
    warrantyYears: 2,
    stock: 6,
    priceB2C: 14499,
    priceB2B: 10800,
    sellerName: "Bharat Woodcraft & Furnishings",
    sellerSlug: "bharat-woodcraft",
    sellerCity: "Jaipur",
    sellerPhone: "+91 98222 33445",
    bulkSlabs: [
      { minQty: 2, maxQty: 5, unitPrice: 9900 },
    ],
    reviews: [],
  },
  {
    id: "prod-6",
    title: "Architectural Heavy Mortise Door Lock with Solid Brass Handles",
    slug: "architectural-heavy-mortise-door-lock",
    categoryType: "HARDWARE",
    categoryName: "Hardware Supplies",
    categorySlug: "hardware",
    description: "Heavy-duty 85mm double turn mortise lock with computer key cylinder. Premium solid brass handles in matte black and satin nickel dual-tone PVD coating.",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
    ],
    hsnCode: "8301",
    gstRate: 18,
    isFlagship: false,
    sourceCountry: "India",
    dimensions: "Backset 50mm, C-to-C 85mm, Handle Length 240mm",
    material: "Solid Forged Brass Handles + Zinc Alloy Lock Body",
    cbmVolume: 0.08,
    assemblyRequired: true,
    warrantyYears: 5,
    stock: 45,
    priceB2C: 4200,
    priceB2B: 2950,
    sellerName: "Apex Hardware & Architectural Depot",
    sellerSlug: "apex-hardware",
    sellerCity: "Ahmedabad",
    sellerPhone: "+91 98555 66778",
    bulkSlabs: [
      { minQty: 10, maxQty: 24, unitPrice: 2700 },
      { minQty: 25, maxQty: null, unitPrice: 2450 },
    ],
    reviews: [],
  },
];

export const fallbackAgents: AgentCardData[] = [
  {
    id: "ag-1",
    name: "SkyAir Holidays & Consolidators",
    slug: "skyair-holidays",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=128&q=80",
    bio: "Specialists in North-South India fixed departures, Goa holiday packages, and Kashmir charters.",
    city: "New Delhi",
    state: "Delhi",
    phone: "+91 98111 22334",
    whatsapp: "+919811122334",
    gstin: "07AAAAA1111A1Z1",
    categoryType: "FLIGHTS",
    categoryLabel: "Aviation & Fixed Departures",
    flightsCount: 2,
    productsCount: 0,
  },
  {
    id: "ag-2",
    name: "Bharat Woodcraft & Furnishings",
    slug: "bharat-woodcraft",
    logo: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=128&q=80",
    bio: "Handcrafted Sheesham wood artisans and contemporary space-saving furniture studio.",
    city: "Jaipur",
    state: "Rajasthan",
    phone: "+91 98222 33445",
    whatsapp: "+919822233445",
    gstin: "08BBBBB2222B1Z2",
    categoryType: "FURNITURE",
    categoryLabel: "Solid Woodcraft Studio",
    flightsCount: 0,
    productsCount: 2,
  },
  {
    id: "ag-3",
    name: "AeroGo Holidays & Charters",
    slug: "aerogo-holidays",
    logo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=128&q=80",
    bio: "High-frequency western corridor fixed departures, Mumbai-Delhi shuttles, and luxury Goa packages.",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91 98444 55667",
    whatsapp: "+919844455667",
    gstin: "27AAAAA8888A1Z9",
    categoryType: "FLIGHTS",
    categoryLabel: "Aviation & Fixed Departures",
    flightsCount: 2,
    productsCount: 0,
  },
  {
    id: "ag-4",
    name: "Apex Hardware & Architectural Depot",
    slug: "apex-hardware",
    logo: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=128&q=80",
    bio: "Authorised wholesale distributor of SS 304 architectural fittings, mortise locks, and builder hardware.",
    city: "Ahmedabad",
    state: "Gujarat",
    phone: "+91 98555 66778",
    whatsapp: "+919855566778",
    gstin: "24AAAAA3333A1Z3",
    categoryType: "HARDWARE",
    categoryLabel: "Hardware & Tools Depot",
    flightsCount: 0,
    productsCount: 1,
  },
  {
    id: "ag-5",
    name: "Radhekant Master Flagship Store",
    slug: "radhekant-flagship",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&q=80",
    bio: "Direct factory-imported Chinese luxury furniture and contractor hardware depot.",
    city: "New Delhi",
    state: "Delhi",
    phone: "+91 98765 43210",
    whatsapp: "+919876543210",
    gstin: "07AAACR1234F1Z5",
    categoryType: "MULTI",
    categoryLabel: "Flagship Imports & Flights",
    flightsCount: 1,
    productsCount: 3,
  },
];

// ==========================================
// 2. SAFE QUERY WRAPPERS (Try Database -> Fallback)
// ==========================================

export async function getFlights(): Promise<FlightItem[]> {
  try {
    const flightsDb = await prisma.flightInventory.findMany({
      where: { status: "ACTIVE" },
      include: {
        seller: {
          include: { agentProfile: true },
        },
      },
      orderBy: { travelDate: "asc" },
    });

    if (flightsDb && flightsDb.length > 0) {
      return flightsDb.map((f) => ({
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
    }
  } catch (error) {
    console.warn("Prisma flight query failed, using static fallback:", error);
  }
  return fallbackFlights;
}

export async function getProducts(): Promise<ProductItem[]> {
  try {
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
    });

    if (productsDb && productsDb.length > 0) {
      return productsDb.map((p) => {
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
          sellerName: p.seller.agentProfile?.agencyName || "Radhekant Flagship Store",
          sellerSlug: p.seller.agentProfile?.slug || "radhekant-flagship",
          bulkSlabs: p.bulkSlabs.map((s) => ({
            minQty: s.minQty,
            maxQty: s.maxQty,
            unitPrice: s.unitPrice,
          })),
        };
      });
    }
  } catch (error) {
    console.warn("Prisma product query failed, using static fallback:", error);
  }

  return fallbackProducts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    categoryType: p.categoryType,
    categoryName: p.categoryName,
    description: p.description,
    images: p.images,
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
    sellerName: p.sellerName,
    sellerSlug: p.sellerSlug,
    bulkSlabs: p.bulkSlabs,
  }));
}

export async function getProductBySlug(slug: string): Promise<{ product: FullProduct | null; related: FullProduct[] }> {
  try {
    const productDb = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        bulkSlabs: true,
        reviews: { orderBy: { createdAt: "desc" } },
        seller: { include: { agentProfile: true } },
      },
    });

    if (productDb) {
      let parsedImages: string[] = [];
      try {
        parsedImages = JSON.parse(productDb.images);
      } catch {
        parsedImages = [productDb.images];
      }

      const relatedDb = await prisma.product.findMany({
        where: { categoryId: productDb.categoryId, id: { not: productDb.id }, status: "ACTIVE" },
        take: 3,
        include: { category: true, seller: { include: { agentProfile: true } } },
      });

      const product: FullProduct = {
        id: productDb.id,
        title: productDb.title,
        slug: productDb.slug,
        categoryType: productDb.category.type as any,
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
        sellerName: productDb.seller.agentProfile?.agencyName || "Radhekant Flagship",
        sellerSlug: productDb.seller.agentProfile?.slug || "radhekant-flagship",
        sellerCity: productDb.seller.agentProfile?.city || "New Delhi",
        sellerPhone: productDb.seller.agentProfile?.contactPhone || "+91 98765 43210",
        bulkSlabs: productDb.bulkSlabs.map((s) => ({ minQty: s.minQty, maxQty: s.maxQty, unitPrice: s.unitPrice })),
        reviews: productDb.reviews.map((r) => ({
          id: r.id,
          reviewerName: r.reviewerName,
          reviewerCity: r.reviewerCity,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          isVerifiedPurchase: r.isVerifiedPurchase,
          createdAt: r.createdAt.toLocaleDateString(),
        })),
      };

      const related: FullProduct[] = relatedDb.map((p) => {
        let pImages: string[] = [];
        try { pImages = JSON.parse(p.images); } catch { pImages = [p.images]; }
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          categoryType: p.category.type as any,
          categoryName: p.category.name,
          categorySlug: p.category.slug,
          description: p.description,
          images: pImages,
          hsnCode: p.hsnCode,
          gstRate: p.gstRate,
          isFlagship: p.isFlagship,
          sourceCountry: p.sourceCountry,
          assemblyRequired: p.assemblyRequired,
          warrantyYears: p.warrantyYears,
          stock: p.stock,
          priceB2C: p.priceB2C,
          priceB2B: p.priceB2B,
          sellerName: p.seller.agentProfile?.agencyName || "Radhekant Flagship",
          sellerSlug: p.seller.agentProfile?.slug || "radhekant-flagship",
          sellerCity: p.seller.agentProfile?.city || "New Delhi",
          sellerPhone: p.seller.agentProfile?.contactPhone || "+91 98765 43210",
          bulkSlabs: [],
          reviews: [],
        };
      });

      return { product, related };
    }
  } catch (error) {
    console.warn("Prisma getProductBySlug failed, falling back to static dataset:", error);
  }

  const found = fallbackProducts.find((p) => p.slug === slug) || null;
  const related = fallbackProducts.filter((p) => p.slug !== slug && (!found || p.categoryType === found.categoryType)).slice(0, 3);

  return { product: found, related };
}

export async function getAgents(): Promise<AgentCardData[]> {
  try {
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

    if (agentsDb && agentsDb.length > 0) {
      return agentsDb.map((a) => {
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
    }
  } catch (error) {
    console.warn("Prisma getAgents failed, using static fallback:", error);
  }

  return fallbackAgents;
}

export async function getAgentBySlug(slug: string) {
  try {
    const agentProfile = await prisma.agentProfile.findUnique({
      where: { slug },
      include: {
        user: {
          include: {
            flightListings: { where: { status: "ACTIVE" } },
            productListings: { where: { status: "ACTIVE" }, include: { category: true } },
          },
        },
      },
    });

    if (agentProfile) {
      const flights: FlightItem[] = agentProfile.user.flightListings.map((f) => ({
        id: f.id,
        sellerId: f.sellerId,
        sellerName: agentProfile.agencyName,
        sellerPhone: agentProfile.contactPhone,
        isFlagship: false,
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

      const products: ProductItem[] = agentProfile.user.productListings.map((p) => {
        let parsedImages: string[] = [];
        try { parsedImages = JSON.parse(p.images); } catch { parsedImages = [p.images]; }
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          categoryType: p.category.type as any,
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
          sellerName: agentProfile.agencyName,
          sellerSlug: agentProfile.slug,
        };
      });

      return {
        profile: {
          id: agentProfile.id,
          name: agentProfile.agencyName,
          slug: agentProfile.slug,
          logo: agentProfile.agencyLogo,
          bio: agentProfile.bio,
          city: agentProfile.city,
          state: agentProfile.state,
          phone: agentProfile.contactPhone,
          email: agentProfile.contactEmail,
          whatsapp: agentProfile.whatsappNumber,
          gstin: agentProfile.gstin,
        },
        flights,
        products,
      };
    }
  } catch (error) {
    console.warn("Prisma getAgentBySlug failed, falling back to static dataset:", error);
  }

  // Fallback
  const agent = fallbackAgents.find((a) => a.slug === slug) || fallbackAgents[0];
  const flights = fallbackFlights.filter((f) => f.sellerName.toLowerCase().includes(agent.name.toLowerCase().split(" ")[0]) || agent.categoryType === "FLIGHTS" || agent.categoryType === "MULTI");
  const products = fallbackProducts.filter((p) => p.sellerName.toLowerCase().includes(agent.name.toLowerCase().split(" ")[0]) || agent.categoryType === "FURNITURE" || agent.categoryType === "HARDWARE" || agent.categoryType === "MULTI");

  return {
    profile: {
      id: agent.id,
      name: agent.name,
      slug: agent.slug,
      logo: agent.logo,
      bio: agent.bio,
      city: agent.city,
      state: agent.state,
      phone: agent.phone,
      email: `${agent.slug}@radhekant.com`,
      whatsapp: agent.whatsapp,
      gstin: agent.gstin,
    },
    flights,
    products,
  };
}
