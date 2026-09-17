/**
 * Image size guide for designers / photographers.
 * Export at 2× the display size for sharp retina screens (values below are recommended upload sizes).
 */
export type ImageSpec = {
  id: string;
  label: string;
  width: number;
  height: number;
  ratio: string;
  format: "PNG" | "JPG" | "WebP";
  notes: string;
  usedOn: string[];
};

export const imageSpecs = {
  homepage: [
    {
      id: "hero-banner",
      label: "Homepage hero (rotating banners)",
      width: 800,
      height: 1000,
      ratio: "4:5",
      format: "PNG",
      notes: "Product on white/transparent background. Used in top hero carousel.",
      usedOn: ["Home → hero carousel"],
    },
    {
      id: "hero-tab-thumb",
      label: "Hero category tabs (small thumb)",
      width: 96,
      height: 96,
      ratio: "1:1",
      format: "PNG",
      notes: "Tiny preview under hero — same product as banner, cropped square.",
      usedOn: ["Home → hero tabs"],
    },
    {
      id: "category-tile",
      label: "Category grid tile",
      width: 600,
      height: 450,
      ratio: "4:3",
      format: "PNG",
      notes: "Popular categories section. Clean product shot, centred.",
      usedOn: ["Home → popular categories"],
    },
    {
      id: "product-rail",
      label: "Product rail card (scroll row)",
      width: 400,
      height: 400,
      ratio: "1:1",
      format: "PNG",
      notes: "Best sellers / same-day / marketing rails on homepage.",
      usedOn: ["Home → product rails"],
    },
    {
      id: "shop-by-need",
      label: "Shop by business need",
      width: 600,
      height: 480,
      ratio: "5:4",
      format: "PNG",
      notes: "Lifestyle or product collage per audience (startup, wedding, etc.).",
      usedOn: ["Home → shop by need"],
    },
    {
      id: "corporate-spotlight-main",
      label: "Corporate spotlight (large)",
      width: 840,
      height: 672,
      ratio: "5:4",
      format: "PNG",
      notes: "Letterheads, ID kits, or corporate sample — premium flat lay.",
      usedOn: ["Home → corporate block"],
    },
    {
      id: "corporate-spotlight-thumb",
      label: "Corporate spotlight (small thumbs)",
      width: 192,
      height: 192,
      ratio: "1:1",
      format: "PNG",
      notes: "3 small previews beside corporate block.",
      usedOn: ["Home → corporate block"],
    },
    {
      id: "print-facility-hero",
      label: "Print floor overview",
      width: 1200,
      height: 900,
      ratio: "4:3",
      format: "JPG",
      notes: "Shop interior or services overview graphic. Wide shot of production area.",
      usedOn: ["Home → our print floor"],
    },
    {
      id: "print-machine",
      label: "Individual machine / capability",
      width: 560,
      height: 350,
      ratio: "16:10",
      format: "JPG",
      notes: "One photo per machine: digital press, offset, large format, finishing.",
      usedOn: ["Home → print floor cards"],
    },
    {
      id: "brand-showcase",
      label: "Brand / services showcase",
      width: 640,
      height: 640,
      ratio: "1:1",
      format: "PNG",
      notes: "Services overview or brand graphic near footer of homepage.",
      usedOn: ["Home → brand showcase"],
    },
  ] satisfies ImageSpec[],

  catalog: [
    {
      id: "product-card",
      label: "Product catalogue card (standard)",
      width: 800,
      height: 600,
      ratio: "4:3",
      format: "PNG",
      notes: "Main product image for shop grid, corporate catalogue, and CMS upload.",
      usedOn: ["Products page", "Corporate catalogue", "Admin → products"],
    },
    {
      id: "product-detail",
      label: "Product detail page (large)",
      width: 1200,
      height: 720,
      ratio: "5:3",
      format: "PNG",
      notes: "Hero image on single product page. Same file as catalogue is OK if 1200px wide.",
      usedOn: ["Product detail → /products/[slug]"],
    },
  ] satisfies ImageSpec[],

  orderFlow: [
    {
      id: "cart-thumb",
      label: "Cart line item thumbnail",
      width: 160,
      height: 160,
      ratio: "1:1",
      format: "PNG",
      notes: "Small square in cart & checkout summary. Usually same product image, auto-scaled.",
      usedOn: ["Cart", "Checkout → order summary"],
    },
  ] satisfies ImageSpec[],

  brand: [
    {
      id: "logo",
      label: "Site logo",
      width: 200,
      height: 200,
      ratio: "1:1",
      format: "PNG",
      notes: "Square logo with transparent background. File: public/logo.png",
      usedOn: ["Header", "Footer", "Admin"],
    },
  ] satisfies ImageSpec[],
} as const;

/** Flat list for easy copy-paste to clients */
export const allImageSpecs: ImageSpec[] = [
  ...imageSpecs.homepage,
  ...imageSpecs.catalog,
  ...imageSpecs.orderFlow,
  ...imageSpecs.brand,
];

export function formatImageSpec(spec: ImageSpec) {
  return `${spec.width}×${spec.height}px (${spec.ratio}) — ${spec.format}`;
}
