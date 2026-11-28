import type { Product } from "@/types/product";

export type MasterSubcategory = {
  id: string;
  name: string;
  description: string;
  href: string;
};

export type MasterCategory = {
  id: "digital-prints" | "banners-signages" | "gifts-merchandise";
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: "Printer" | "Megaphone" | "Gift";
  heroImage: string;
  accentBadgeColor: string;
  gradient: string;
  subcategories: MasterSubcategory[];
  matchingCategories: string[];
  productSlugs: string[];
};

export const MASTER_CATEGORIES: MasterCategory[] = [
  {
    id: "digital-prints",
    name: "Digital Prints",
    shortName: "Digital Prints",
    slug: "digital-prints",
    tagline: "Visiting cards, flyers, stickers, bill books, ID cards & commercial print sheets.",
    description:
      "High-speed digital and offset printing for businesses. From 300GSM premium visiting cards and 100GSM letterheads to die-cut sticker sheets, duplicate bill books, and corporate ID lanyards.",
    badge: "Fast Turnaround · Same-Day",
    iconName: "Printer",
    heroImage: "/images/products/visiting-card-liceria-front-studio.jpg",
    accentBadgeColor: "bg-blue-500/15 text-blue-800 ring-blue-500/30",
    gradient: "from-blue-600 via-indigo-600 to-slate-900",
    subcategories: [
      {
        id: "visiting-cards",
        name: "Visiting Cards",
        description: "300GSM Board, Standard / Rounded Corners, Matt / Gloss",
        href: "/products/visiting-cards",
      },
      {
        id: "letterheads-envelopes",
        name: "Letterheads & Envelopes",
        description: "A4 100GSM Bond Paper & 9.5x4.5 Self-Seal Envelopes",
        href: "/products/letterheads",
      },
      {
        id: "stickers-labels",
        name: "Stickers & Die-Cut Labels",
        description: "PVC Non-Tearable, Mirror Coat, Barcode & MRP Sheet Labels",
        href: "/products/normal-stickers",
      },
      {
        id: "marketing-flyers",
        name: "Flyers & Pamphlets",
        description: "A5 & A4 Art Paper (90-170GSM), Double-sided Offset & Digital",
        href: "/products/pamphlets",
      },
      {
        id: "bill-books",
        name: "Bill Books & Registers",
        description: "A5/A4 Single Color 1+1, 1+2 Carbonless Invoice Books",
        href: "/products/bill-books",
      },
      {
        id: "id-cards-lanyards",
        name: "ID Cards & Lanyards",
        description: "PVC Color Cards, 10/16/20mm Multicolor Satin Ribbon Tags",
        href: "/products/id-cards-lanyards",
      },
      {
        id: "stamps-seals",
        name: "Stamps & Seals",
        description: "Self-Inking Round Seals & Rubber Address Stamps",
        href: "/products/seals-stamps",
      },
      {
        id: "13x19-sheets",
        name: "13 x 19 Sheet Prints",
        description: "130-350GSM, Linen, Velvet & Metallic Texture Board Prints",
        href: "/products/13x19-digital-print",
      },
      {
        id: "document-lamination",
        name: "Lamination Services",
        description: "A5, A4, A3 Pouch Lamination (Glossy & Matt)",
        href: "/products/document-lamination",
      },
    ],
    matchingCategories: [
      "business-essentials",
      "packaging",
      "stationery",
      "marketing-materials",
      "digital-prints",
    ],
    productSlugs: [
      "visiting-cards",
      "letterheads",
      "envelopes",
      "invitations",
      "pamphlets",
      "brochures",
      "posters",
      "certificates",
      "tent-cards",
      "magazines",
      "danglers",
      "product-catalogue",
      "wall-posters",
      "presentation-envelopes",
      "normal-stickers",
      "barcode-stickers",
      "mrp-labels",
      "non-tearable-stickers-pvc",
      "gold-stickers",
      "silver-stickers",
      "transparent-stickers",
      "13x19-sheet-prints",
      "texture-board-prints",
      "lamination-13x19",
      "bill-books",
      "voucher-books",
      "delivery-challan-books",
      "register-books",
      "id-cards-pvc",
      "lanyard-tags",
      "id-card-holders",
      "yoyo-badge-clips",
      "rubber-stamps",
      "self-inking-seals",
    ],
  },
  {
    id: "banners-signages",
    name: "Banners & Signages",
    shortName: "Banners & Signages",
    slug: "banners-signages",
    tagline: "Flex banners, roll-up standees, sunboards, acrylic signs & LED boards.",
    description:
      "Large format outdoor and indoor branding displays. Weather-resistant flex banners, exhibition roll-up standees, UV printed sunboards, acrylic office nameplates, and illuminated 2D/3D LED signage.",
    badge: "Large Format · Events & Retail",
    iconName: "Megaphone",
    heroImage: "/images/signage-wall-mural.png",
    accentBadgeColor: "bg-amber-500/15 text-amber-900 ring-amber-500/30",
    gradient: "from-amber-600 via-orange-600 to-stone-900",
    subcategories: [
      {
        id: "flex-banners",
        name: "Flex Banners & Vinyl",
        description: "Normal Flex, Star Flex & Laminated Vinyl (Per Sq. Ft.)",
        href: "/products/flex-banners",
      },
      {
        id: "rollup-standees",
        name: "Roll-Up Standees & Easels",
        description: "6x3ft & 5x2ft Aluminum Base Pull-up Displays & Easel Stands",
        href: "/products/rollup-standees",
      },
      {
        id: "sunboard-acrylic",
        name: "Sunboards & Acrylic Signs",
        description: "3mm & 5mm Foam Board, Sunpack & Acrylic Office Nameboards",
        href: "/products/sunboard-prints",
      },
      {
        id: "led-glow-boards",
        name: "2D & 3D LED Boards",
        description: "Illuminated Channel Letters, Backlit Acrylic & Glow Signs",
        href: "/products/3d-led-boards",
      },
      {
        id: "canopy-promo-tables",
        name: "Canopy Tents & Promo Tables",
        description: "6x6ft / 4x4ft Branded Event Canopies & Demonstration Counters",
        href: "/products/canopy-tents",
      },
      {
        id: "window-films",
        name: "Frosted & One-Way Vision Films",
        description: "Glass Privacy Frosted Films & Perforated Window Graphics",
        href: "/products/frosted-stickers",
      },
    ],
    matchingCategories: ["large-format", "banners-signages"],
    productSlugs: [
      "flex-banners",
      "vinyl-stickers-large",
      "frosted-stickers",
      "sunboard-prints",
      "sunpack-prints",
      "one-way-vision-stickers",
      "acrylic-office-name-boards",
      "easel-stands",
      "canopy-tents",
      "promo-table-stands",
      "rollup-standees",
      "luxury-rollup-standees",
      "engraving-services",
      "3d-led-boards",
      "2d-boards",
      "acrylic-stands",
    ],
  },
  {
    id: "gifts-merchandise",
    name: "Gifts & Merchandise",
    shortName: "Gifts & Merch",
    slug: "gifts-merchandise",
    tagline: "Custom photo frames, magic mugs, t-shirts, pin badges & corporate gift hampers.",
    description:
      "Personalized corporate merchandise and photo keepsakes. High-resolution ceramic and heat-magic mugs, framed photo prints, custom pin badges, desktop calendars, and curated executive gift kits.",
    badge: "Personalized · Corporate Gifting",
    iconName: "Gift",
    heroImage: "/images/smart-keychains.png",
    accentBadgeColor: "bg-rose-500/15 text-rose-800 ring-rose-500/30",
    gradient: "from-rose-600 via-pink-600 to-zinc-900",
    subcategories: [
      {
        id: "ceramic-magic-mugs",
        name: "Ceramic & Magic Mugs",
        description: "11oz White Ceramic & Heat Sensitive Color-Changing Mugs",
        href: "/products/ceramic-mug-print",
      },
      {
        id: "photo-frames",
        name: "Photo Prints with Frame",
        description: "Framed Prints with 1-inch Beeding (4x6 to 20x30 inch)",
        href: "/products/photo-frames",
      },
      {
        id: "pin-badges",
        name: "Button Pin Badges",
        description: "44mm, 58mm & 70mm Round Campaign & Event Badges",
        href: "/products/round-pin-badges",
      },
      {
        id: "calendars-planners",
        name: "Desk & Wall Calendars",
        description: "Custom Branded Tabletop Tent & Spiral Hanging Calendars",
        href: "/products/table-calendars",
      },
      {
        id: "corporate-diaries",
        name: "Executive Diaries & Planners",
        description: "Custom Embossed PU Leather Corporate Planners & Pens",
        href: "/products/diaries-planners",
      },
      {
        id: "apparel-tshirts",
        name: "Custom T-Shirts & Caps",
        description: "Round Neck & Polo T-Shirts, Embroidered Company Caps",
        href: "/products/tshirt-printing",
      },
      {
        id: "cushions-mousepads",
        name: "Pillows & Desk Items",
        description: "Custom Printed Fabric Satin Keychains, Pillows & Mousepads",
        href: "/products/satin-keychains",
      },
    ],
    matchingCategories: [
      "photo-gifts",
      "apparel",
      "events",
      "gifts-merchandise",
    ],
    productSlugs: [
      "table-calendars",
      "wall-calendars",
      "diaries-planners",
      "pen-printing",
      "ceramic-mug-print",
      "tshirt-printing",
      "cap-printing",
      "photo-frames",
      "satin-keychains",
      "round-pin-badges",
      "name-badges",
      "pillow-print",
      "mouse-pad-print",
    ],
  },
];

export function getMasterCategories(): MasterCategory[] {
  return MASTER_CATEGORIES;
}

export function getMasterCategory(idOrSlug: string): MasterCategory | undefined {
  const norm = idOrSlug.toLowerCase().trim();
  return MASTER_CATEGORIES.find(
    (c) =>
      c.id === norm ||
      c.slug === norm ||
      c.matchingCategories.includes(norm)
  );
}

export function isProductInMasterCategory(product: Product, masterIdOrSlug: string): boolean {
  const master = getMasterCategory(masterIdOrSlug);
  if (!master) return false;
  return (
    master.productSlugs.includes(product.slug) ||
    master.matchingCategories.includes(product.category)
  );
}

export function getProductsForMasterCategory(
  products: Product[],
  masterIdOrSlug: string
): Product[] {
  const master = getMasterCategory(masterIdOrSlug);
  if (!master) return [];
  return products.filter((p) => isProductInMasterCategory(p, master.id));
}
