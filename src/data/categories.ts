import type { ProductCategory } from "@/types/product";
import { categoryImages } from "@/data/store-images";

export const categories: ProductCategory[] = [
  {
    id: "business-essentials",
    name: "Business Essentials",
    tagline: "Cards, letterheads & IDs",
    image: categoryImages["business-essentials"],
    iconColor: "bg-brand-500",
  },
  {
    id: "marketing-materials",
    name: "Marketing Materials",
    tagline: "Pamphlets, flyers & keychains",
    image: categoryImages["marketing-materials"],
    iconColor: "bg-amber-600",
  },
  {
    id: "large-format",
    name: "Large Format",
    tagline: "Signages & wall graphics",
    image: categoryImages["large-format"],
    iconColor: "bg-violet-600",
  },
  {
    id: "packaging",
    name: "Packaging",
    tagline: "Presentation envelopes",
    image: categoryImages.packaging,
    iconColor: "bg-rose-600",
  },
  {
    id: "apparel",
    name: "Apparel & Merch",
    tagline: "T-shirts & branded items",
    image: categoryImages.apparel,
    iconColor: "bg-sky-600",
  },
  {
    id: "photo-gifts",
    name: "Photo Gifts",
    tagline: "Photo & passport prints",
    image: categoryImages["photo-gifts"],
    iconColor: "bg-orange-600",
  },
  {
    id: "stationery",
    name: "Stationery",
    tagline: "Calendars, receipts & bills",
    image: categoryImages.stationery,
    iconColor: "bg-teal-600",
  },
  {
    id: "events",
    name: "Events & Invitations",
    tagline: "Invites & special print",
    image: categoryImages.events,
    iconColor: "bg-fuchsia-600",
  },
];
