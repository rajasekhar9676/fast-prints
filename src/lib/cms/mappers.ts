import type { Order, OrderItem, OrderStatus, PaymentStatus, SiteSettings } from "@/types/admin";
import type { CorporateContent, HomepageContent, TestimonialsContent } from "@/types/cms-content";
import type { Product, ProductCategory, Service } from "@/types/product";
import type { CustomerUser } from "@/types/user";
import { Prisma } from "@prisma/client";
import type { Order as DbOrder, OrderItem as DbOrderItem, Product as DbProduct, User as DbUser } from "@prisma/client";

type DbOrderWithItems = DbOrder & { items: DbOrderItem[] };

const FALLBACK_IMAGE_MAP: Record<string, string> = {
  "/images/visiting-cards.jpg": "/images/products/visiting-card-liceria-front-studio.jpg",
  "/images/visiting-cards.png": "/images/products/visiting-card-liceria-front-studio.jpg",
  "/images/letterheads.jpg": "/images/products/letterheads-executive-studio.jpg",
  "/images/letterheads-agrya.png": "/images/products/letterheads-executive-studio.jpg",
  "/images/letterheads-corporate.png": "/images/products/letterheads-executive-studio.jpg",
  "/images/envelopes.jpg": "/images/products/envelopes-corporate-studio.jpg",
  "/images/envelopes.png": "/images/products/envelopes-corporate-studio.jpg",
  "/images/bulk-multicolor.png": "/images/products/sheet-prints-13x19-studio.jpg",
  "/images/bulk-multicolor-print.png": "/images/products/sheet-prints-13x19-studio.jpg",
  "/images/digital-press.jpg": "/images/products/sheet-prints-13x19-studio.jpg",
  "/images/pamphlet-multicolor.png": "/images/products/pamphlets-flyers-studio.jpg",
  "/images/flyers-pamphlets.jpg": "/images/products/pamphlets-flyers-studio.jpg",
  "/images/bill-books.jpg": "/images/products/bill-books-carbonless-studio.jpg",
  "/images/receipt-books.png": "/images/products/bill-books-carbonless-studio.jpg",
  "/images/invoice-books.png": "/images/products/bill-books-carbonless-studio.jpg",
  "/images/stamps-seals.jpg": "/images/products/seals-rubber-stamps.jpg",
  "/images/id-cards.png": "/images/products/id-cards-lanyards-studio.jpg",
  "/images/id-cards-lanyards.jpg": "/images/products/id-cards-lanyards-studio.jpg",
  "/images/id-card-lanyard-set.png": "/images/products/id-cards-lanyards-studio.jpg",
  "/images/lanyards.png": "/images/products/id-cards-lanyards-studio.jpg",
  "/images/photo-frame.jpg": "/images/products/photo-frame-gallery-studio.jpg",
  "/images/photo-print.png": "/images/products/photo-frame-gallery-studio.jpg",
  "/images/banners-standees.jpg": "/images/products/rollup-standee-banner-studio.jpg",
  "/images/signage-wall-mural.png": "/images/products/rollup-standee-banner-studio.jpg",
};

export function normalizeImagePath(img: string | null | undefined): string {
  if (!img) return "/images/services-overview.png";
  if (FALLBACK_IMAGE_MAP[img]) return FALLBACK_IMAGE_MAP[img];
  return img;
}

export function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    basePrice: row.basePrice,
    turnaround: row.turnaround,
    image: normalizeImagePath(row.image),
    gallery: (row.gallery as string[] | null)?.map(normalizeImagePath) ?? undefined,
    category: row.category as Product["category"],
    popular: row.popular || undefined,
    bestseller: row.bestseller || undefined,
    newLaunch: row.newLaunch || undefined,
    badge: row.badge ?? undefined,
    rating: row.rating ?? undefined,
    reviewCount: row.reviewCount ?? undefined,
    highlights: (row.highlights as string[] | null) ?? undefined,
    options: row.options as Product["options"],
  };
}

export function productToDb(product: Product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    basePrice: product.basePrice,
    turnaround: product.turnaround,
    image: product.image,
    gallery: product.gallery ?? Prisma.JsonNull,
    category: product.category,
    popular: product.popular ?? false,
    bestseller: product.bestseller ?? false,
    newLaunch: product.newLaunch ?? false,
    badge: product.badge ?? null,
    rating: product.rating ?? null,
    reviewCount: product.reviewCount ?? null,
    highlights: product.highlights ?? Prisma.JsonNull,
    options: product.options,
  };
}

export function toCategory(row: {
  id: string;
  name: string;
  tagline: string;
  image: string;
  iconColor: string;
}): ProductCategory {
  return {
    id: row.id as ProductCategory["id"],
    name: row.name,
    tagline: row.tagline,
    image: normalizeImagePath(row.image),
    iconColor: row.iconColor,
  };
}

export function categoryToDb(category: ProductCategory) {
  return {
    id: category.id,
    name: category.name,
    tagline: category.tagline,
    image: category.image,
    iconColor: category.iconColor,
  };
}

export function toService(row: {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}): Service {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    icon: row.icon,
  };
}

export function serviceToDb(service: Service) {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    category: service.category,
    icon: service.icon,
  };
}

export function toUser(row: DbUser): CustomerUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    passwordHash: row.passwordHash,
    createdAt: row.createdAt.toISOString(),
  };
}

export function toOrderItem(row: DbOrderItem): OrderItem {
  const anyRow = row as unknown as Record<string, unknown>;
  return {
    productId: row.productId,
    productName: row.productName,
    productSlug: row.productSlug,
    quantity: row.quantity,
    selectedSize: row.selectedSize,
    selectedFinish: row.selectedFinish,
    selectedUnits: row.selectedUnits,
    unitPrice: row.unitPrice,
    lineTotal: row.lineTotal,
    designFileName: typeof anyRow.designFileName === "string" ? anyRow.designFileName : undefined,
    designFileUrl: typeof anyRow.designFileUrl === "string" ? anyRow.designFileUrl : undefined,
  };
}

export function toOrder(row: DbOrderWithItems): Order {
  return {
    id: row.id,
    orderNumber: row.orderNumber,
    createdAt: row.createdAt.toISOString(),
    status: row.status as OrderStatus,
    paymentStatus: row.paymentStatus as PaymentStatus,
    userId: row.userId ?? undefined,
    razorpayOrderId: row.razorpayOrderId ?? undefined,
    razorpayPaymentId: row.razorpayPaymentId ?? undefined,
    paidAt: row.paidAt?.toISOString(),
    customer: {
      name: row.customerName,
      email: row.customerEmail,
      phone: row.customerPhone,
      address: row.customerAddress,
    },
    notes: row.notes ?? undefined,
    items: row.items.map(toOrderItem),
    subtotal: row.subtotal,
  };
}

export function orderToDb(order: Order) {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    createdAt: new Date(order.createdAt),
    status: order.status,
    paymentStatus: order.paymentStatus,
    userId: order.userId ?? null,
    razorpayOrderId: order.razorpayOrderId ?? null,
    razorpayPaymentId: order.razorpayPaymentId ?? null,
    paidAt: order.paidAt ? new Date(order.paidAt) : null,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    customerPhone: order.customer.phone,
    customerAddress: order.customer.address,
    notes: order.notes ?? null,
    subtotal: order.subtotal,
    items: {
      create: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productSlug: item.productSlug,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedFinish: item.selectedFinish,
        selectedUnits: item.selectedUnits,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal,
        designFileName: item.designFileName ?? null,
        designFileUrl: item.designFileUrl ?? null,
      })),
    },
  };
}

export function toSiteSettings(row: {
  businessName: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  promoText: string;
  addressLines: unknown;
  mapEmbedUrl: string;
  parkingNote: string;
}): SiteSettings {
  return {
    businessName: row.businessName,
    phone: row.phone,
    email: row.email,
    whatsapp: row.whatsapp,
    website: row.website,
    promoText: row.promoText,
    addressLines: row.addressLines as string[],
    mapEmbedUrl: row.mapEmbedUrl,
    parkingNote: row.parkingNote,
  };
}

export function settingsToDb(settings: SiteSettings) {
  return {
    id: "default",
    businessName: settings.businessName,
    phone: settings.phone,
    email: settings.email,
    whatsapp: settings.whatsapp,
    website: settings.website,
    promoText: settings.promoText,
    addressLines: settings.addressLines,
    mapEmbedUrl: settings.mapEmbedUrl,
    parkingNote: settings.parkingNote,
  };
}

export function toHomepageContent(content: unknown): HomepageContent {
  return content as HomepageContent;
}

export function toTestimonialsContent(content: unknown): TestimonialsContent {
  return content as TestimonialsContent;
}

export function toCorporateContent(content: unknown): CorporateContent {
  return content as CorporateContent;
}
