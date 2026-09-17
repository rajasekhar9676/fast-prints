export type NavCategory = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const navCategories: NavCategory[] = [
  { label: "All Products", href: "/products", highlight: true },
  { label: "Same Day", href: "/products?q=same-day" },
  { label: "Visiting Cards", href: "/products?category=business-essentials" },
  { label: "Apparel", href: "/products?category=apparel" },
  { label: "Photo Gifts", href: "/products?category=photo-gifts" },
  { label: "Stationery", href: "/products?category=stationery" },
  { label: "Packaging", href: "/products?category=packaging" },
  { label: "Standees & Signage", href: "/products?category=large-format" },
  { label: "Marketing", href: "/products?category=marketing-materials" },
  { label: "Events", href: "/products?category=events" },
  { label: "Corporate", href: "/corporate" },
];
