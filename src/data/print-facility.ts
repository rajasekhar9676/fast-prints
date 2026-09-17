/** Print floor & equipment — swap `image` paths when you add real machine photos to public/images/ */
export const printMachines = [
  {
    id: "digital",
    name: "Digital production press",
    tag: "Everyday jobs",
    description: "Visiting cards, brochures, flyers, and short-run corporate print with fast turnaround.",
    specs: ["Up to 300gsm", "Same-day select jobs", "Colour-managed output"],
    image: "/images/bulk-multicolor-print.png",
  },
  {
    id: "offset",
    name: "Offset & multicolour",
    tag: "Bulk volume",
    description: "High-volume pamphlets, books, and stationery with consistent colour across thousands of copies.",
    specs: ["500+ quantity", "Art paper stocks", "Pantone matching"],
    image: "/images/pamphlet-multicolor.png",
  },
  {
    id: "large-format",
    name: "Large format & signage",
    tag: "Brand visibility",
    description: "Banners, wall graphics, flex, and indoor signage for retail, events, and office branding.",
    specs: ["Wide format roll", "Indoor & outdoor", "Custom sizes"],
    image: "/images/signage-wall-mural.png",
  },
  {
    id: "finishing",
    name: "Finishing & ID production",
    tag: "Ready to use",
    description: "Lamination, binding, die-cut, ID card printing, and lanyard assembly under one roof.",
    specs: ["ID + lanyard kits", "Lamination", "Custom packaging"],
    image: "/images/id-card-lanyard-set.png",
  },
] as const;

export const facilityStats = [
  { value: "15+", label: "Years in print" },
  { value: "40+", label: "Services" },
  { value: "Same day", label: "On select jobs" },
  { value: "BTM", label: "Production hub" },
] as const;
