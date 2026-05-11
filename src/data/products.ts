import type { Product } from "@/types/product";

const commonQty = [50, 100, 250, 500, 1000];
const apparelQty = [1, 5, 10, 25, 50];
const bannerQty = [1, 2, 5, 10];

export const products: Product[] = [
  {
    id: "p1",
    slug: "premium-business-cards",
    name: "Premium Business Cards",
    shortDescription: "Matte & glossy visiting cards with crisp full-colour print.",
    description:
      "Premium stock with velvet touch or gloss laminate. Upload print-ready PDF or brief our design desk for a polished corporate look.",
    basePrice: 499,
    turnaround: "24–48 hrs",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "business-essentials",
    popular: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 128,
    badge: "Best Seller",
    highlights: ["Spot UV & foil options", "Premium GSM stocks", "Design assist"],
    options: {
      sizes: ["3.5 × 2 in", "Square 2.5 in"],
      finishes: ["Matte", "Glossy", "Velvet Touch"],
      quantities: [100, 250, 500, 1000],
    },
  },
  {
    id: "p2",
    slug: "letterheads-envelopes",
    name: "Letterheads & Envelopes",
    shortDescription: "Corporate stationery packs with consistent brand colour.",
    description:
      "Matched letterheads and envelopes on premium uncoated paper. Ideal for invoices, proposals, and daily correspondence.",
    basePrice: 899,
    turnaround: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    category: "business-essentials",
    highlights: ["Brand colour matching", "Window & plain envelopes"],
    options: {
      sizes: ["A4 Letterhead", "A5 Letterhead"],
      finishes: ["Uncoated", "Laid Texture"],
      quantities: commonQty,
    },
  },
  {
    id: "p3",
    slug: "flyers-leaflets",
    name: "Flyers & Leaflets",
    shortDescription: "High-impact flyers from A6 to A4 with vivid colour.",
    description:
      "Single or double-sided flyers on silk or gloss stock. Same-day rush available for Bengaluru local pickup.",
    basePrice: 699,
    turnaround: "Same-day (select SKUs)",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    category: "marketing-materials",
    popular: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 94,
    badge: "Popular",
    highlights: ["Silk & gloss stocks", "Fold options"],
    options: {
      sizes: ["A6", "A5", "A4", "DL"],
      finishes: ["Silk", "Gloss", "Uncoated"],
      quantities: [250, 500, 1000, 2500],
    },
  },
  {
    id: "p4",
    slug: "tri-fold-brochures",
    name: "Tri-fold Brochures",
    shortDescription: "Marketing brochures with crisp folds & scoring.",
    description:
      "Classic tri-fold layout with scoring for flat lay. Perfect for menus, services, and product sheets.",
    basePrice: 1299,
    turnaround: "2–4 days",
    image:
      "https://images.unsplash.com/photo-1562654507-f09cc07eeed8?auto=format&fit=crop&w=1200&q=80",
    category: "marketing-materials",
    highlights: ["Matt lamination available", "Heavy gsm options"],
    options: {
      sizes: ["A4 folded to DL", "Letter tri-fold"],
      finishes: ["Silk", "Gloss", "Matt Laminated"],
      quantities: [100, 250, 500, 1000],
    },
  },
  {
    id: "p5",
    slug: "vinyl-banners",
    name: "Vinyl & Flex Banners",
    shortDescription: "Weather-resistant banners with eyelets.",
    description:
      "Outdoor flex and indoor vinyl with reinforced edges. Upload artwork or use our wide-format design desk.",
    basePrice: 1499,
    turnaround: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=1200&q=80",
    category: "large-format",
    popular: true,
    rating: 4.7,
    reviewCount: 56,
    highlights: ["Eyelets & hemmed edges", "UV outdoor inks"],
    options: {
      sizes: ["4 × 2 ft", "6 × 3 ft", "8 × 4 ft", "10 × 5 ft"],
      finishes: ["Matt", "Gloss", "Anti-scuff"],
      quantities: bannerQty,
    },
  },
  {
    id: "p6",
    slug: "foam-board-signage",
    name: "Foam Board Signage",
    shortDescription: "Rigid indoor signage for retail & events.",
    description:
      "Lightweight foam PVC boards with vivid UV print. Ideal for POS, exhibitions, and directional signage.",
    basePrice: 899,
    turnaround: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    category: "large-format",
    highlights: ["Contour cut available", "Easel stands"],
    options: {
      sizes: ["A2", "A1", "A0", "3 × 2 ft"],
      finishes: ["Matt UV", "Gloss UV"],
      quantities: [1, 2, 5, 10],
    },
  },
  {
    id: "p7",
    slug: "custom-product-boxes",
    name: "Custom Product Boxes",
    shortDescription: "Branded packaging with custom dimensions.",
    description:
      "Mailer boxes and retail cartons with CMYK print and protective coatings for ecommerce-ready unboxing.",
    basePrice: 3499,
    turnaround: "5–7 days",
    image:
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&w=1200&q=80",
    category: "packaging",
    rating: 4.9,
    reviewCount: 41,
    highlights: ["Die-cut proofing", "Kraft & premium white"],
    options: {
      sizes: ["Small", "Medium", "Large", "Custom die"],
      finishes: ["Kraft", "Premium White", "Matte Laminate"],
      quantities: [50, 100, 250, 500],
    },
  },
  {
    id: "p8",
    slug: "labels-stickers-roll",
    name: "Labels & Stickers (Roll)",
    shortDescription: "Product labels with crisp registration.",
    description:
      "Roll labels for bottles, jars, and shipping. Waterproof vinyl options for chilled goods.",
    basePrice: 799,
    turnaround: "3–5 days",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d42650372?auto=format&fit=crop&w=1200&q=80",
    category: "packaging",
    highlights: ["Waterproof vinyl", "Custom shapes"],
    options: {
      sizes: ["50 × 30 mm", "75 × 45 mm", "100 × 60 mm"],
      finishes: ["Paper", "Vinyl Matt", "Vinyl Gloss"],
      quantities: [500, 1000, 2500, 5000],
    },
  },
  {
    id: "p9",
    slug: "custom-round-neck-tees",
    name: "Custom Round Neck T-Shirts",
    shortDescription: "Screen & DTG prints on premium cotton blends.",
    description:
      "Retail-grade tees with durable inks. Pantone matching available for brand campaigns.",
    basePrice: 449,
    turnaround: "4–6 days",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    category: "apparel",
    popular: true,
    newLaunch: true,
    badge: "New",
    highlights: ["DTG & screen options", "XS–3XL sizes"],
    options: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      finishes: ["180 GSM Cotton", "Premium Bio-wash"],
      quantities: apparelQty,
    },
  },
  {
    id: "p10",
    slug: "corporate-hoodies",
    name: "Corporate Hoodies & Sweatshirts",
    shortDescription: "Embroidery & print combos for teams.",
    description:
      "Pullover hoodies with embroidery logos or large back prints for crew branding.",
    basePrice: 899,
    turnaround: "5–8 days",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
    category: "apparel",
    highlights: ["Embroidery add-on", "Fleece-lined options"],
    options: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      finishes: ["Fleece", "French Terry"],
      quantities: [5, 10, 25, 50],
    },
  },
  {
    id: "p11",
    slug: "canvas-photo-prints",
    name: "Canvas Photo Prints",
    shortDescription: "Gallery-wrap canvas with archival inks.",
    description:
      "Stretched canvas ready to hang. Deep frames and protective varnish optional.",
    basePrice: 1299,
    turnaround: "3–4 days",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=1200&q=80",
    category: "photo-gifts",
    bestseller: true,
    rating: 4.9,
    reviewCount: 203,
    highlights: ["Archival inks", "Gallery wrap"],
    options: {
      sizes: ['12 × 16"', '16 × 20"', '20 × 24"', '24 × 36"'],
      finishes: ["Satin", "Matte"],
      quantities: [1, 2, 5],
    },
  },
  {
    id: "p12",
    slug: "photo-books",
    name: "Premium Photo Books",
    shortDescription: "Lay-flat albums for weddings & portfolios.",
    description:
      "Lay-flat binding with lustre pages and protective laminate for memorable keepsakes.",
    basePrice: 2499,
    turnaround: "5–7 days",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f71cb62?auto=format&fit=crop&w=1200&q=80",
    category: "photo-gifts",
    highlights: ["Lay-flat spreads", "Custom debossing"],
    options: {
      sizes: ["8 × 8 in", "10 × 10 in", "12 × 12 in"],
      finishes: ["Lustre", "Matte"],
      quantities: [1, 2, 5],
    },
  },
  {
    id: "p13",
    slug: "perfect-bound-books",
    name: "Perfect Bound Books",
    shortDescription: "Catalogues & manuals with premium covers.",
    description:
      "Perfect binding for catalogues, manuals, and corporate publications with matt/gloss laminate covers.",
    basePrice: 3999,
    turnaround: "6–10 days",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    highlights: ["Sequential numbering", "Thumb indexes"],
    options: {
      sizes: ["A5 Portrait", "A4 Portrait"],
      finishes: ["Matt Laminate Cover", "Gloss Laminate Cover"],
      quantities: [25, 50, 100, 250],
    },
  },
  {
    id: "p14",
    slug: "saddle-stitch-booklets",
    name: "Saddle Stitch Booklets",
    shortDescription: "Lightweight magazines & annual reports.",
    description:
      "Stapled booklets up to 64 pages with self-cover or separate cover upgrades.",
    basePrice: 1499,
    turnaround: "3–5 days",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    popular: true,
    highlights: ["Self-cover & plus cover", "FSC stocks"],
    options: {
      sizes: ["A5", "A4", "DL"],
      finishes: ["Silk", "Gloss"],
      quantities: [50, 100, 250, 500],
    },
  },
  {
    id: "p15",
    slug: "desk-calendars",
    name: "Desk Calendars",
    shortDescription: "Wire-bound desk calendars with vivid sheets.",
    description:
      "Monthly sheets with brand imagery and sturdy tent stands for corporate gifting.",
    basePrice: 1799,
    turnaround: "5–7 days",
    image:
      "https://images.unsplash.com/photo-1516475429286-061ca8dc6337?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    highlights: ["13-sheet layouts", "Logo emboss"],
    options: {
      sizes: ["7 × 5 in tent", "8 × 6 in tent"],
      finishes: ["Silk", "Gloss"],
      quantities: [25, 50, 100, 250],
    },
  },
  {
    id: "p16",
    slug: "wall-calendars",
    name: "Wall Calendars",
    shortDescription: "Spiral wall calendars for promotions.",
    description:
      "Large monthly grids with drill holes and spiral binding for retail and corporate gifting.",
    basePrice: 2199,
    turnaround: "5–8 days",
    image:
      "https://images.unsplash.com/photo-1517842645767-c956b472b025?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    highlights: ["Hole drilling included", "Seasonal themes"],
    options: {
      sizes: ["A3", "A2"],
      finishes: ["Silk", "Gloss"],
      quantities: [50, 100, 250],
    },
  },
  {
    id: "p17",
    slug: "wedding-invitations-folio",
    name: "Wedding Invitation Folios",
    shortDescription: "Luxury invites with foil & textured inserts.",
    description:
      "Multi-card folios with RSVP inserts and belly bands. Embossing and foiling available.",
    basePrice: 3499,
    turnaround: "7–12 days",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    category: "events",
    bestseller: true,
    badge: "Featured",
    highlights: ["Hot foil & emboss", "RSVP suites"],
    options: {
      sizes: ["5 × 7 in card", "Square 6 in"],
      finishes: ["Textured Card", "Pearl Shimmer"],
      quantities: [50, 75, 100, 150],
    },
  },
  {
    id: "p18",
    slug: "event-backdrops",
    name: "Event Backdrops & Standees",
    shortDescription: "Fabric & vinyl backdrops with stands.",
    description:
      "Portable backdrops for launches and weddings with collapsible stands.",
    basePrice: 5999,
    turnaround: "4–6 days",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80",
    category: "events",
    highlights: ["Fabric & vinyl options", "Stand kits"],
    options: {
      sizes: ["6 × 3 ft", "8 × 4 ft", "10 × 8 ft"],
      finishes: ["Matt", "Blockout"],
      quantities: [1, 2, 3],
    },
  },
  {
    id: "p19",
    slug: "large-format-posters",
    name: "Large Format Posters",
    shortDescription: "Indoor posters with satin photo finish.",
    description:
      "High-resolution posters for retail, education, and hospitality displays.",
    basePrice: 499,
    turnaround: "24–48 hrs",
    image:
      "https://images.unsplash.com/photo-1560358175-d79d57723152?auto=format&fit=crop&w=1200&q=80",
    category: "large-format",
    popular: true,
    highlights: ["Satin photo paper", "Mounting options"],
    options: {
      sizes: ["A2", "A1", "A0"],
      finishes: ["Satin", "Matt"],
      quantities: [1, 5, 10, 25],
    },
  },
  {
    id: "p20",
    slug: "digital-short-run-a4",
    name: "Digital Short-run A4 Prints",
    shortDescription: "Full-colour short runs for decks & reports.",
    description:
      "Perfect for proposals and pitch decks with consistent colour across sets.",
    basePrice: 299,
    turnaround: "Same-day pickup",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    category: "marketing-materials",
    highlights: ["Duplex options", "Stapling"],
    options: {
      sizes: ["A4 Single-sided", "A4 Duplex"],
      finishes: ["100 gsm", "120 gsm"],
      quantities: [25, 50, 100, 250],
    },
  },
  {
    id: "p21",
    slug: "magazine-print-run",
    name: "Magazine Print Run",
    shortDescription: "Perfect bound magazines with self-cover upgrade.",
    description:
      "Periodic magazines with consistent colour profiles edition-to-edition.",
    basePrice: 8999,
    turnaround: "10–14 days",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    highlights: ["ISBN assist", "Shrink-wrap packs"],
    options: {
      sizes: ["A4 Portrait", "Letter"],
      finishes: ["Silk Text", "Gloss Text"],
      quantities: [100, 250, 500, 1000],
    },
  },
  {
    id: "p22",
    slug: "spiral-bound-manuals",
    name: "Spiral Bound Manuals",
    shortDescription: "Training manuals that lay flat.",
    description:
      "Wire-o and spiral binding with transparent covers for durability.",
    basePrice: 899,
    turnaround: "2–4 days",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    highlights: ["Clear PVC covers", "Divider tabs"],
    options: {
      sizes: ["A4", "A5"],
      finishes: ["Silk", "Uncoated"],
      quantities: [10, 25, 50, 100],
    },
  },
  {
    id: "p23",
    slug: "custom-keychains",
    name: "Custom Promotional Keychains",
    shortDescription: "Acrylic & metal keychains for giveaways.",
    description:
      "Laser-cut acrylic or enamel-filled metal keychains with protective coatings.",
    basePrice: 149,
    turnaround: "5–7 days",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
    category: "marketing-materials",
    highlights: ["Bulk-friendly pricing", "Protective epoxy dome"],
    options: {
      sizes: ["40 mm round", "50 mm round"],
      finishes: ["Acrylic", "Metal"],
      quantities: [50, 100, 250, 500],
    },
  },
  {
    id: "p24",
    slug: "logo-design-starter",
    name: "Logo Design Starter Pack",
    shortDescription: "Logo concepts & brand mini-guidelines.",
    description:
      "Three creative routes with vector deliverables and colour specs ready for print.",
    basePrice: 7999,
    turnaround: "7–10 days",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=1200&q=80",
    category: "business-essentials",
    highlights: ["Vector AI/EPS", "Social lockups"],
    options: {
      sizes: ["Starter", "Growth"],
      finishes: ["Digital Delivery"],
      quantities: [1],
    },
  },
  {
    id: "p25",
    slug: "roll-up-standee",
    name: "Roll-up Standee",
    shortDescription: "Portable roll-ups with premium cassette.",
    description:
      "Includes printed graphic and aluminium cassette base with carry bag.",
    basePrice: 3499,
    turnaround: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1560472355-53673bc20503?auto=format&fit=crop&w=1200&q=80",
    category: "large-format",
    popular: true,
    highlights: ["Snap cassette", "Anti-curl PET"],
    options: {
      sizes: ["2 × 5 ft", "3 × 6 ft"],
      finishes: ["Matt", "Gloss"],
      quantities: [1, 2, 5],
    },
  },
  {
    id: "p26",
    slug: "catalog-print-a4",
    name: "Product Catalogues (Stitched)",
    shortDescription: "Stitched catalogues for seasonal launches.",
    description:
      "Saddle stitched catalogues with heavier cover upgrade for retail counters.",
    basePrice: 2299,
    turnaround: "4–6 days",
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1200&q=80",
    category: "stationery",
    highlights: ["Cover upgrade", "Spot colour optional"],
    options: {
      sizes: ["A4 Landscape", "A4 Portrait"],
      finishes: ["Silk", "Gloss"],
      quantities: [50, 100, 250],
    },
  },
  {
    id: "p27",
    slug: "black-white-document-print",
    name: "Black & White Document Printing",
    shortDescription: "High-volume mono prints for compliance packs.",
    description:
      "Sharp monochrome output on premium bond paper with stapling and hole punching.",
    basePrice: 99,
    turnaround: "Same-day",
    image:
      "https://images.unsplash.com/photo-1589656966895-2f89e97ee95e?auto=format&fit=crop&w=1200&q=80",
    category: "business-essentials",
    highlights: ["Duplex savings", "Hole punch"],
    options: {
      sizes: ["A4 Simplex", "A4 Duplex"],
      finishes: ["75 gsm", "100 gsm"],
      quantities: [100, 250, 500, 1000],
    },
  },
];

export const popularProducts = products.filter((p) => p.popular);
export const bestsellerProducts = products.filter((p) => p.bestseller);
export const newLaunchProducts = products.filter((p) => p.newLaunch);

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.category === categoryId);
}
