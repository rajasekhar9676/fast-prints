export type NavCategory = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const navCategories: NavCategory[] = [
  { label: "Corporate & Bulk", href: "/corporate", highlight: true },
  { label: "All Products", href: "/products" },
  { label: "Same Day Delivery", href: "/products?q=same-day" },
  { label: "Visiting Cards", href: "/products?category=business-essentials" },
  { label: "Apparel", href: "/products?category=apparel" },
  { label: "Photo Gifts", href: "/products?category=photo-gifts" },
  { label: "Stationery", href: "/products?category=stationery" },
  { label: "Packaging", href: "/products?category=packaging" },
  { label: "Standees & Signage", href: "/products?category=large-format" },
  { label: "Marketing", href: "/products?category=marketing-materials" },
  { label: "Events", href: "/products?category=events" },
];
