export type NavCategory = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const navCategories: NavCategory[] = [
  { label: "All Products", href: "/products" },
  { label: "Corporate & Bulk", href: "/corporate", highlight: true },
  { label: "Same Day Delivery", href: "/same-day-delivery" },
  { label: "Visiting Cards", href: "/category/business-essentials" },
  { label: "Marketing", href: "/category/marketing-materials" },
  { label: "Banners & Signage", href: "/category/large-format" },
  { label: "Bill Books & Stationery", href: "/category/stationery" },
  { label: "Stickers & Labels", href: "/category/packaging" },
];

