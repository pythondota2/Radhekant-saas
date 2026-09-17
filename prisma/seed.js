const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.passenger.deleteMany({});
  await prisma.flightBooking.deleteMany({});
  await prisma.bulkPricingSlab.deleteMany({});
  await prisma.productReview.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.flightInventory.deleteMany({});
  await prisma.walletTransaction.deleteMany({});
  await prisma.wallet.deleteMany({});
  await prisma.agentSubscription.deleteMany({});
  await prisma.membershipPlan.deleteMany({});
  await prisma.agentProfile.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Creating Membership Plans...');
  const starterPlan = await prisma.membershipPlan.create({
    data: {
      name: 'Starter Agent Desk',
      slug: 'starter-agent',
      description: 'Ideal for independent travel agents and emerging boutique sellers.',
      priceINR: 4999,
      billingCycle: 'ANNUAL',
      maxFlightListings: 25,
      maxProductListings: 50,
      badgeText: 'Entry Tier',
      features: JSON.stringify([
        'Up to 25 Offline Flight Listings',
        'Up to 50 Product / Decor Listings',
        'Dedicated Public Storefront Link',
        'Instant Booking Notifications',
        'Manual Bank UTR Top-Up System',
        'Standard Email Support',
      ]),
    },
  });

  const proPlan = await prisma.membershipPlan.create({
    data: {
      name: 'Pro Consolidator & Trader',
      slug: 'pro-consolidator',
      description: 'Built for high-volume group fare consolidators and wholesale traders.',
      priceINR: 11999,
      billingCycle: 'ANNUAL',
      maxFlightListings: 150,
      maxProductListings: 300,
      badgeText: 'Most Popular',
      features: JSON.stringify([
        'Up to 150 Offline Flight Listings',
        'Up to 300 Furniture & Hardware Listings',
        'Custom White-Label PDF E-Tickets with Agency Logo',
        'Agent Dynamic Markup Injection Tool',
        'Passenger Name Cutoff Alert Engine',
        'Export Manifest to Excel for Airline Submission',
        'Priority Phone & WhatsApp Support',
      ]),
    },
  });

  const enterprisePlan = await prisma.membershipPlan.create({
    data: {
      name: 'Enterprise Multi-Store Master',
      slug: 'enterprise-master',
      description: 'Full-suite digital marketplace capabilities with unlimited volume.',
      priceINR: 24999,
      billingCycle: 'ANNUAL',
      maxFlightListings: 9999,
      maxProductListings: 9999,
      badgeText: 'Ultimate Scale',
      features: JSON.stringify([
        'Unlimited Flight & Group Fare Listings',
        'Unlimited Product & Bulk Inventory Listings',
        'Multi-Staff Team Logins & Permissions',
        'Custom Subdomain / Verified Agency Badge',
        '0% Platform Transaction Fee',
        'Dedicated Account Manager',
      ]),
    },
  });

  console.log('Creating Users...');
  // 1. Super Admin (Master Client)
  const adminUser = await prisma.user.create({
    data: {
      name: 'Radhekant Super Admin',
      email: 'admin@radhekant.com',
      passwordHash: 'admin123',
      phone: '+91 98765 43210',
      role: 'SUPER_ADMIN',
      wallet: {
        create: {
          balance: 250000,
          creditLimit: 500000,
        },
      },
    },
  });

  // 2. Travel Agent (SkyAir Holidays)
  const skyAirUser = await prisma.user.create({
    data: {
      name: 'Ramesh Sharma',
      email: 'ramesh@skyair.in',
      passwordHash: 'agent123',
      phone: '+91 98111 22334',
      role: 'AGENT',
      agentProfile: {
        create: {
          agencyName: 'SkyAir Holidays & Consolidators',
          slug: 'skyair-holidays',
          agencyLogo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=128&q=80',
          bio: 'Specialists in North-South India fixed departures, Goa holiday packages, and Kashmir charters.',
          city: 'New Delhi',
          state: 'Delhi',
          contactPhone: '+91 98111 22334',
          contactEmail: 'bookings@skyair.in',
          whatsappNumber: '+919811122334',
          gstin: '07AAAAA1111A1Z1',
          pan: 'AAAAA1111A',
          kycStatus: 'VERIFIED',
          commissionRate: 5.0,
          subscription: {
            create: {
              planId: proPlan.id,
              status: 'ACTIVE',
              amountPaidINR: 11999,
              paymentMethod: 'UPI_DIRECT',
              utrReference: 'UPI/2026/883921102',
              approvedAt: new Date(),
            },
          },
        },
      },
      wallet: {
        create: {
          balance: 65400,
          creditLimit: 100000,
        },
      },
    },
  });

  // 3. Furniture Agent (Bharat Woodcraft & Decor)
  const woodcraftUser = await prisma.user.create({
    data: {
      name: 'Vikram Rajput',
      email: 'vikram@bharatwood.in',
      passwordHash: 'agent123',
      phone: '+91 98222 33445',
      role: 'AGENT',
      agentProfile: {
        create: {
          agencyName: 'Bharat Woodcraft & Furnishings',
          slug: 'bharat-woodcraft',
          agencyLogo: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=128&q=80',
          bio: 'Handcrafted Sheesham wood artisans and contemporary space-saving furniture studio.',
          city: 'Jaipur',
          state: 'Rajasthan',
          contactPhone: '+91 98222 33445',
          contactEmail: 'support@bharatwood.in',
          whatsappNumber: '+919822233445',
          gstin: '08BBBBB2222B1Z2',
          pan: 'BBBBB2222B',
          kycStatus: 'VERIFIED',
          subscription: {
            create: {
              planId: starterPlan.id,
              status: 'ACTIVE',
              amountPaidINR: 4999,
              paymentMethod: 'NEFT_BANK',
              utrReference: 'NEFT/2026/4472199',
              approvedAt: new Date(),
            },
          },
        },
      },
      wallet: {
        create: {
          balance: 15000,
          creditLimit: 25000,
        },
      },
    },
  });

  // 4. Mumbai Travel Agent (AeroGo Holidays & Charters)
  const aerogoUser = await prisma.user.create({
    data: {
      name: 'Kunal Singhania',
      email: 'kunal@aerogo.in',
      passwordHash: 'agent123',
      phone: '+91 98444 55667',
      role: 'AGENT',
      agentProfile: {
        create: {
          agencyName: 'AeroGo Holidays & Charters',
          slug: 'aerogo-holidays',
          agencyLogo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=128&q=80',
          bio: 'High-frequency western corridor fixed departures, Mumbai-Delhi shuttles, and luxury Goa packages.',
          city: 'Mumbai',
          state: 'Maharashtra',
          contactPhone: '+91 98444 55667',
          contactEmail: 'info@aerogo.in',
          whatsappNumber: '+919844455667',
          gstin: '27AAAAA8888A1Z9',
          pan: 'AAAAA8888A',
          kycStatus: 'VERIFIED',
          subscription: {
            create: {
              planId: proPlan.id,
              status: 'ACTIVE',
              amountPaidINR: 11999,
              paymentMethod: 'UPI_DIRECT',
              utrReference: 'UPI/2026/99104821',
              approvedAt: new Date(),
            },
          },
        },
      },
      wallet: {
        create: {
          balance: 42000,
          creditLimit: 50000,
        },
      },
    },
  });

  // 5. Hardware Distributor (Apex Hardware & Architectural Depot)
  const apexUser = await prisma.user.create({
    data: {
      name: 'Manish Patel',
      email: 'manish@apexhardware.in',
      passwordHash: 'agent123',
      phone: '+91 98555 66778',
      role: 'AGENT',
      agentProfile: {
        create: {
          agencyName: 'Apex Hardware & Architectural Depot',
          slug: 'apex-hardware',
          agencyLogo: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=128&q=80',
          bio: 'Authorised wholesale distributor of SS 304 architectural fittings, mortise locks, and builder hardware.',
          city: 'Ahmedabad',
          state: 'Gujarat',
          contactPhone: '+91 98555 66778',
          contactEmail: 'orders@apexhardware.in',
          whatsappNumber: '+919855566778',
          gstin: '24CCCCC3333C1Z3',
          pan: 'CCCCC3333C',
          kycStatus: 'VERIFIED',
          subscription: {
            create: {
              planId: proPlan.id,
              status: 'ACTIVE',
              amountPaidINR: 11999,
              paymentMethod: 'NEFT_BANK',
              utrReference: 'NEFT/2026/9928172',
              approvedAt: new Date(),
            },
          },
        },
      },
      wallet: {
        create: {
          balance: 80000,
          creditLimit: 150000,
        },
      },
    },
  });

  // 4. Retail Customer
  const customerUser = await prisma.user.create({
    data: {
      name: 'Aditi Deshmukh',
      email: 'aditi@gmail.com',
      passwordHash: 'cust123',
      phone: '+91 98333 44556',
      role: 'CUSTOMER',
    },
  });

  console.log('Creating Categories...');
  const catFurniture = await prisma.category.create({
    data: {
      name: 'Furniture',
      slug: 'furniture',
      type: 'FURNITURE',
      description: 'Luxury ready-made sofas, dining sets, accent recliners, and bedroom sets.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    },
  });

  const catDecor = await prisma.category.create({
    data: {
      name: 'Home Decor',
      slug: 'home-decor',
      type: 'HOME_DECOR',
      description: 'Handcrafted brass lamps, chandeliers, 3D canvas art, and statement accents.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    },
  });

  const catHardware = await prisma.category.create({
    data: {
      name: 'Hardware & Industrial',
      slug: 'hardware',
      type: 'HARDWARE',
      description: 'Architectural SS fittings, hydraulic hinges, mortise locks, and power tools.',
      image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80',
    },
  });

  console.log('Creating Flight Inventories...');
  // Flight 1: Delhi to Goa (Managed by SkyAir Agent)
  await prisma.flightInventory.create({
    data: {
      sellerId: skyAirUser.id,
      airlineName: 'IndiGo',
      airlineCode: '6E',
      flightNumber: '6E-205',
      originCity: 'New Delhi',
      originCode: 'DEL',
      destinationCity: 'Goa (MOPA)',
      destinationCode: 'GOX',
      departureTime: '06:15',
      arrivalTime: '08:55',
      travelDate: '2026-10-18',
      totalSeats: 25,
      availableSeats: 19,
      netFare: 4850,
      retailFare: 6200,
      baggageInfo: '15kg Check-in + 7kg Cabin',
      masterPnr: '6E-GRP-9844',
      nameCutoffTime: '48 Hours Prior',
      status: 'ACTIVE',
    },
  });

  // Flight 2: Mumbai to Delhi (Managed by SkyAir Agent)
  await prisma.flightInventory.create({
    data: {
      sellerId: skyAirUser.id,
      airlineName: 'Air India',
      airlineCode: 'AI',
      flightNumber: 'AI-806',
      originCity: 'Mumbai',
      originCode: 'BOM',
      destinationCity: 'New Delhi',
      destinationCode: 'DEL',
      departureTime: '09:30',
      arrivalTime: '11:45',
      travelDate: '2026-10-20',
      totalSeats: 20,
      availableSeats: 12,
      netFare: 5100,
      retailFare: 6500,
      baggageInfo: '20kg Check-in + 7kg Cabin',
      masterPnr: 'AI-FD-8821',
      nameCutoffTime: '24 Hours Prior',
      status: 'ACTIVE',
    },
  });

  // Flight 3: Bengaluru to Delhi (Managed by Master Admin Flagship)
  await prisma.flightInventory.create({
    data: {
      sellerId: adminUser.id,
      airlineName: 'Akasa Air',
      airlineCode: 'QP',
      flightNumber: 'QP-1342',
      originCity: 'Bengaluru',
      originCode: 'BLR',
      destinationCity: 'New Delhi',
      destinationCode: 'DEL',
      departureTime: '18:10',
      arrivalTime: '21:05',
      travelDate: '2026-10-22',
      totalSeats: 30,
      availableSeats: 22,
      netFare: 4350,
      retailFare: 5600,
      baggageInfo: '15kg Check-in + 7kg Cabin',
      masterPnr: 'QP-BLK-1102',
      nameCutoffTime: '48 Hours Prior',
      status: 'ACTIVE',
    },
  });

  // Flight 4: Delhi to Srinagar (Managed by Master Admin Flagship)
  await prisma.flightInventory.create({
    data: {
      sellerId: adminUser.id,
      airlineName: 'SpiceJet',
      airlineCode: 'SG',
      flightNumber: 'SG-298',
      originCity: 'New Delhi',
      originCode: 'DEL',
      destinationCity: 'Srinagar',
      destinationCode: 'SXR',
      departureTime: '11:15',
      arrivalTime: '12:45',
      travelDate: '2026-10-25',
      totalSeats: 15,
      availableSeats: 8,
      netFare: 6200,
      retailFare: 7900,
      baggageInfo: '15kg Check-in + 7kg Cabin',
      masterPnr: 'SG-FD-7731',
      nameCutoffTime: '72 Hours Prior',
      status: 'ACTIVE',
    },
  });

  // Flight 5: Mumbai to Goa Mopa (Managed by AeroGo Holidays)
  await prisma.flightInventory.create({
    data: {
      sellerId: aerogoUser.id,
      airlineName: 'IndiGo',
      airlineCode: '6E',
      flightNumber: '6E-512',
      originCity: 'Mumbai',
      originCode: 'BOM',
      destinationCity: 'Goa (MOPA)',
      destinationCode: 'GOX',
      departureTime: '14:20',
      arrivalTime: '15:35',
      travelDate: '2026-10-26',
      totalSeats: 25,
      availableSeats: 18,
      netFare: 3850,
      retailFare: 4900,
      baggageInfo: '15kg Check-in + 7kg Cabin',
      masterPnr: '6E-BOM-7712',
      nameCutoffTime: '48 Hours Prior',
      status: 'ACTIVE',
    },
  });

  // Flight 6: Mumbai to Bengaluru (Managed by AeroGo Holidays)
  await prisma.flightInventory.create({
    data: {
      sellerId: aerogoUser.id,
      airlineName: 'Akasa Air',
      airlineCode: 'QP',
      flightNumber: 'QP-1102',
      originCity: 'Mumbai',
      originCode: 'BOM',
      destinationCity: 'Bengaluru',
      destinationCode: 'BLR',
      departureTime: '20:10',
      arrivalTime: '21:50',
      travelDate: '2026-10-29',
      totalSeats: 20,
      availableSeats: 14,
      netFare: 3600,
      retailFare: 4650,
      baggageInfo: '15kg Check-in + 7kg Cabin',
      masterPnr: 'QP-BOM-9921',
      nameCutoffTime: '24 Hours Prior',
      status: 'ACTIVE',
    },
  });

  console.log('Creating Products...');
  // Product 1: Client's Flagship Imported Italian Sofa
  await prisma.product.create({
    data: {
      sellerId: adminUser.id,
      categoryId: catFurniture.id,
      title: 'Milano Luxe 6-Seater Modular L-Shape Sectional Sofa',
      slug: 'milano-luxe-6-seater-modular-sofa',
      description: 'Imported European-inspired low-profile sectional upholstered in spill-resistant Italian velvet with high-density pocketed spring core. Designed for contemporary luxury living rooms.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
      ]),
      hsnCode: '9403',
      gstRate: 18,
      isFlagship: true,
      sourceCountry: 'China',
      dimensions: 'L 310cm x D 175cm x H 82cm',
      material: 'Imported Italian Velvet, Pine Hardwood Frame, Pocket Springs',
      cbmVolume: 2.1,
      assemblyRequired: true,
      warrantyYears: 3,
      stock: 8,
      priceB2C: 74999,
      priceB2B: 58000,
      isBulkDiscount: true,
    },
  });

  // Product 2: Client's Flagship Natural Carrara Marble Dining Set
  await prisma.product.create({
    data: {
      sellerId: adminUser.id,
      categoryId: catFurniture.id,
      title: 'Carrara White Marble 6-Seater Dining Table with Chairs',
      slug: 'carrara-marble-dining-set',
      description: 'Solid 35mm thick Italian Carrara natural marble slab with rounded bullnose edges resting on a brushed champagne gold stainless steel base. Includes 6 ergonomic cushioned dining chairs.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
        'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80',
      ]),
      hsnCode: '9403',
      gstRate: 18,
      isFlagship: true,
      sourceCountry: 'China',
      dimensions: 'L 180cm x W 90cm x H 76cm',
      material: 'Natural Italian Carrara Marble, Grade 304 Stainless Steel Base',
      cbmVolume: 1.4,
      assemblyRequired: true,
      warrantyYears: 5,
      stock: 5,
      priceB2C: 89999,
      priceB2B: 69000,
      isBulkDiscount: false,
    },
  });

  // Product 3: Agent's Handcrafted Sheesham Wood Coffee Table (Bharat Woodcraft)
  await prisma.product.create({
    data: {
      sellerId: woodcraftUser.id,
      categoryId: catFurniture.id,
      title: 'Royal Heritage Sheesham Wood Center Table with Drawers',
      slug: 'royal-sheesham-center-table',
      description: 'Handcrafted solid Indian Sheesham rosewood center table with 2 pull-out storage drawers and brass inlays. Natural honey teak gloss finish.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&q=80',
      ]),
      hsnCode: '9403',
      gstRate: 12,
      isFlagship: false,
      sourceCountry: 'India',
      dimensions: 'L 110cm x W 60cm x H 45cm',
      material: 'Seasoned Solid Sheesham Rosewood, Brass Hardware',
      cbmVolume: 0.35,
      assemblyRequired: false,
      warrantyYears: 2,
      stock: 15,
      priceB2C: 16499,
      priceB2B: 12500,
    },
  });

  // Product 3B: Bharat Woodcraft 6-Seater Dining Table
  await prisma.product.create({
    data: {
      sellerId: woodcraftUser.id,
      categoryId: catFurniture.id,
      title: 'Jaipur Artisan Solid Sheesham 6-Seater Dining Table Set',
      slug: 'jaipur-royal-sheesham-dining-set',
      description: 'Authentic handcrafted Jodhpuri seasoned Sheesham hardwood dining set with 6 lattice-back cushioned chairs. Natural grain teak polish.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      ]),
      hsnCode: '9403',
      gstRate: 12,
      isFlagship: false,
      sourceCountry: 'India',
      dimensions: 'L 175cm x W 90cm x H 76cm',
      material: 'Grade A Solid Sheesham Wood',
      cbmVolume: 1.1,
      assemblyRequired: true,
      warrantyYears: 5,
      stock: 6,
      priceB2C: 48500,
      priceB2B: 38000,
    },
  });

  // Product 3C: Apex Hardware Mortise Lock
  await prisma.product.create({
    data: {
      sellerId: apexUser.id,
      categoryId: catHardware.id,
      title: 'Architectural Grade Solid Brass Mortise Door Handle with 70mm Cylinder (Pack of 5)',
      slug: 'heavy-duty-brass-mortise-door-lock',
      description: 'Heavy duty drop-forged solid brass mortise handle set with 6-pin brass computer key cylinder. Antique bronze finish suitable for main doors and cabins.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      ]),
      hsnCode: '8302',
      gstRate: 18,
      isFlagship: false,
      sourceCountry: 'India',
      dimensions: 'Plate 240mm x 45mm, Cylinder 70mm',
      material: 'Forged Solid Brass, Antique Finish',
      stock: 45,
      priceB2C: 6999,
      priceB2B: 5200,
      isBulkDiscount: true,
    },
  });

  // Product 3D: SkyAir Holiday Package
  await prisma.product.create({
    data: {
      sellerId: skyAirUser.id,
      categoryId: catDecor.id,
      title: 'Kashmir Paradise Luxury Holiday & Charter Tour (5N/6D Package with Flight Allotment)',
      slug: 'kashmir-autumn-deluxe-holiday-package',
      description: 'Exclusive 5 Nights / 6 Days luxury tour including Srinagar deluxe Dal Lake houseboat, Gulmarg gondola transfers, and confirmed return flight block on IndiGo.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80',
      ]),
      hsnCode: '9983',
      gstRate: 5,
      isFlagship: false,
      sourceCountry: 'India',
      dimensions: '5 Nights / 6 Days All Inclusive',
      material: 'Flights + 5-Star Stay + Private SUV',
      warrantyYears: 1,
      stock: 12,
      priceB2C: 38500,
      priceB2B: 31000,
    },
  });

  // Product 4: Home Decor - Imperial Handcrafted Brass Chandelier
  await prisma.product.create({
    data: {
      sellerId: adminUser.id,
      categoryId: catDecor.id,
      title: 'Imperial Artisan 8-Arm Hand-Hammered Brass Pendant Chandelier',
      slug: 'imperial-brass-chandelier',
      description: 'Statement warm-tone illumination handcrafted in Moradabad brass with etched antique detailing. Adjustable chain height suitable for double-height ceilings and foyers.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
      ]),
      hsnCode: '9405',
      gstRate: 18,
      isFlagship: true,
      sourceCountry: 'India',
      dimensions: 'Diameter 85cm x Height 65cm',
      material: 'Solid Brass Antique Finish',
      warrantyYears: 2,
      stock: 20,
      priceB2C: 15800,
      priceB2B: 11200,
    },
  });

  // Product 5: Hardware - SS 304 Soft-Close Hydraulic Concealed Hinges (Bulk Depot)
  const hingeProduct = await prisma.product.create({
    data: {
      sellerId: adminUser.id,
      categoryId: catHardware.id,
      title: 'SS 304 Soft-Close Hydraulic Kitchen Cabinet Hinges (Box of 20)',
      slug: 'ss304-hydraulic-cabinet-hinges-box20',
      description: 'Commercial-grade grade 304 stainless steel 3D clip-on adjustable hydraulic soft close cabinet hinges. Tested for 80,000 opening cycles with anti-corrosion chrome plating.',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80',
      ]),
      hsnCode: '8302',
      gstRate: 18,
      isFlagship: true,
      sourceCountry: 'India',
      dimensions: 'Cup Diameter 35mm, Depth 11.5mm',
      material: 'Grade 304 Stainless Steel with Hydraulic Piston',
      stock: 120,
      priceB2C: 1950,
      priceB2B: 1450,
      isBulkDiscount: true,
    },
  });

  // Add Bulk Pricing Slabs for Hinges
  await prisma.bulkPricingSlab.createMany({
    data: [
      { productId: hingeProduct.id, minQty: 1, maxQty: 5, unitPrice: 1950 },
      { productId: hingeProduct.id, minQty: 6, maxQty: 20, unitPrice: 1650 },
      { productId: hingeProduct.id, minQty: 21, maxQty: null, unitPrice: 1350 },
    ],
  });

  console.log('Creating Product Reviews...');
  // Find products by slug for reviews
  const sofa = await prisma.product.findUnique({ where: { slug: 'milano-luxe-6-seater-modular-sofa' } });
  const dining = await prisma.product.findUnique({ where: { slug: 'carrara-marble-dining-set' } });
  const centerTable = await prisma.product.findUnique({ where: { slug: 'royal-sheesham-center-table' } });

  if (sofa) {
    await prisma.productReview.createMany({
      data: [
        {
          productId: sofa.id,
          reviewerName: 'Rajesh & Meera Khanna',
          reviewerCity: 'Gurgaon, DLF Phase 5',
          rating: 5,
          title: 'Stunning Italian design, arrived perfectly packed in crate',
          comment: 'We were looking for an imported low-profile sofa for our penthouse living room. The Italian velvet fabric is luxurious and spill-resistant (already tested by our kids). Carpenter assembly was arranged smoothly. Exceptional value compared to Delhi luxury showrooms.',
          isVerifiedPurchase: true,
        },
        {
          productId: sofa.id,
          reviewerName: 'Anand Kulkarni',
          reviewerCity: 'Pune, Maharashtra',
          rating: 5,
          title: 'Firm, extremely comfortable pocket springs',
          comment: 'The CBM freight delivery took 5 days to Pune. Well packaged with multiple foam layers and wooden framing. The modular pieces clip together effortlessly.',
          isVerifiedPurchase: true,
        },
        {
          productId: sofa.id,
          reviewerName: 'Pooja Singhal',
          reviewerCity: 'Mumbai, Worli',
          rating: 4,
          title: 'Magnificent center piece, deep seating',
          comment: 'Very plush and elegant. Delivery team was courteous and placed it in our hall. Beautiful charcoal grey tone.',
          isVerifiedPurchase: true,
        },
      ],
    });
  }

  if (dining) {
    await prisma.productReview.createMany({
      data: [
        {
          productId: dining.id,
          reviewerName: 'Vikramaditya Roy',
          reviewerCity: 'Bengaluru, Indiranagar',
          rating: 5,
          title: 'Genuine heavy Italian Carrara marble, breathtaking polish',
          comment: 'The 35mm marble slab is genuine solid natural stone with beautiful subtle grey veining. The champagne gold base is heavy gauge SS 304 and doesn’t wobble at all. Chairs are very comfortable for long dinner conversations.',
          isVerifiedPurchase: true,
        },
        {
          productId: dining.id,
          reviewerName: 'Dr. Neha Kapoor',
          reviewerCity: 'New Delhi, Vasant Vihar',
          rating: 5,
          title: 'Top notch luxury dining set',
          comment: 'Worth every single rupee. Radhekant team coordinated the surface freight and delivery crane effortlessly. Highly recommended!',
          isVerifiedPurchase: true,
        },
      ],
    });
  }

  if (centerTable) {
    await prisma.productReview.createMany({
      data: [
        {
          productId: centerTable.id,
          reviewerName: 'Harsh Vardhan',
          reviewerCity: 'Jaipur, Rajasthan',
          rating: 5,
          title: 'Authentic solid Sheesham with beautiful wood grain',
          comment: 'Bharat Woodcraft did a phenomenal job. Seasoned wood, brass inlays are flush, and storage drawers slide with ease. No assembly needed, ready to use out of the box.',
          isVerifiedPurchase: true,
        },
      ],
    });
  }

  if (hingeProduct) {
    await prisma.productReview.createMany({
      data: [
        {
          productId: hingeProduct.id,
          reviewerName: 'Gupta Interior Contractors',
          reviewerCity: 'Noida, Sector 63',
          rating: 5,
          title: 'Tested 80 boxes for a modular kitchen project - Flawless hydraulic dampening',
          comment: 'We buy these in bulk slabs of 50+ boxes. Grade 304 stainless steel with zero rusting even in coastal client homes. The 3D adjustment clip makes cabinet leveling very fast for our carpenters.',
          isVerifiedPurchase: true,
        },
        {
          productId: hingeProduct.id,
          reviewerName: 'Sanjay Modulars',
          reviewerCity: 'Hyderabad, Telangana',
          rating: 5,
          title: 'Best wholesale pricing with GST invoice',
          comment: 'The contractor bulk pricing at ₹1,350/box saved us over ₹20,000 on our commercial kitchen fitout. Fast dispatch and proper HSN 8302 billing.',
          isVerifiedPurchase: true,
        },
      ],
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
