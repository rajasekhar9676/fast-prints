import { shopNeedImages } from "@/data/store-images";

export type ShopNeed = {
  id: string;
  title: string;
  href: string;
  image: string;
};

export const shopByNeeds: ShopNeed[] = [
  {
    id: "education",
    title: "Education & Campus",
    href: "/products?category=stationery",
    image: shopNeedImages.education,
  },
  {
    id: "startup",
    title: "Startup Branding",
    href: "/products?category=business-essentials",
    image: shopNeedImages.startup,
  },
  {
    id: "events",
    title: "Events & Promotions",
    href: "/products?category=large-format",
    image: shopNeedImages.events,
  },
  {
    id: "retail",
    title: "Retail & Packaging",
    href: "/products?category=packaging",
    image: shopNeedImages.retail,
  },
  {
    id: "cafe",
    title: "Cafe & Restaurant",
    href: "/products?category=marketing-materials",
    image: shopNeedImages.cafe,
  },
  {
    id: "boutique",
    title: "Boutique & Fashion",
    href: "/products?category=packaging",
    image: shopNeedImages.boutique,
  },
  {
    id: "wedding",
    title: "Weddings",
    href: "/products?category=events",
    image: shopNeedImages.wedding,
  },
  {
    id: "corporate",
    title: "Corporate ID Kits",
    href: "/products/id-card-lanyard-combo",
    image: shopNeedImages.corporate,
  },
];
