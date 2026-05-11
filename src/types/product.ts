export type ProductCategoryId =
  | "business-essentials"
  | "marketing-materials"
  | "large-format"
  | "packaging"
  | "apparel"
  | "photo-gifts"
  | "stationery"
  | "events";

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  tagline: string;
  image: string;
  iconColor: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  turnaround: string;
  image: string;
  gallery?: string[];
  category: ProductCategoryId;
  popular?: boolean;
  bestseller?: boolean;
  newLaunch?: boolean;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
  options: {
    sizes: string[];
    finishes: string[];
    quantities: number[];
  };
};

export type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
};
