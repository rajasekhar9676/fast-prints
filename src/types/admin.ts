import type { Product, ProductCategory, Service } from "@/types/product";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_production"
  | "ready"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  productName: string;
  productSlug: string;
  quantity: number;
  selectedSize: string;
  selectedFinish: string;
  selectedUnits: number;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  notes?: string;
  items: OrderItem[];
  subtotal: number;
};

export type SiteSettings = {
  businessName: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  promoText: string;
  addressLines: string[];
  mapEmbedUrl: string;
  parkingNote: string;
};

export type CmsSnapshot = {
  products: Product[];
  categories: ProductCategory[];
  services: Service[];
  settings: SiteSettings;
  orders: Order[];
};

export type CreateOrderPayload = {
  customer: Order["customer"];
  notes?: string;
  items: Array<{
    product: { id: string; name: string; slug: string };
    quantity: number;
    selectedSize: string;
    selectedFinish: string;
    selectedUnits: number;
    unitPrice: number;
  }>;
  subtotal: number;
};
