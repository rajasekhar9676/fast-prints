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
    href: "/category/stationery",
    image: shopNeedImages.education,
  },
  {
    id: "startup",
    title: "Startup Branding",
    href: "/category/business-essentials",
    image: shopNeedImages.startup,
  },
  {
    id: "events",
    title: "Events & Promotions",
    href: "/category/large-format",
    image: shopNeedImages.events,
  },
  {
    id: "retail",
    title: "Retail & Packaging",
    href: "/category/packaging",
    image: shopNeedImages.retail,
  },
  {
    id: "cafe",
    title: "Cafe & Restaurant",
    href: "/category/marketing-materials",
    image: shopNeedImages.cafe,
  },
  {
    id: "boutique",
    title: "Boutique & Fashion",
    href: "/category/packaging",
    image: shopNeedImages.boutique,
  },
  {
    id: "wedding",
    title: "Weddings",
    href: "/category/marketing-materials",
    image: shopNeedImages.wedding,
  },
  {
    id: "corporate",
    title: "Corporate ID Kits",
    href: "/products/id-cards-lanyards",
    image: shopNeedImages.corporate,
  },
];
