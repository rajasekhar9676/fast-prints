import type { Order, SiteSettings } from "@/types/admin";
import type { CorporateContent, HomepageContent, TestimonialsContent } from "@/types/cms-content";
import type { Product, ProductCategory, Service } from "@/types/product";
import type { CustomerUser } from "@/types/user";
import { prisma } from "@/lib/db";
import { readCmsJson, writeCmsJson, cmsFiles } from "./store";
import { products as staticProducts } from "@/data/products";
import { categories as staticCategories } from "@/data/categories";
import { services as staticServices } from "@/data/services";
import {
  categoryToDb,
  orderToDb,
  productToDb,
  serviceToDb,
  settingsToDb,
  toCategory,
  toCorporateContent,
  toHomepageContent,
  toOrder,
  toProduct,
  toService,
  toSiteSettings,
  toTestimonialsContent,
  toUser,
} from "./mappers";
import {
  defaultCorporateContent,
  defaultHomepageContent,
  defaultTestimonialsContent,
} from "./default-content";
import { defaultSettings, ensureDbSeeded } from "./seed";

const orderInclude = { items: true } as const;

export async function getProducts(): Promise<Product[]> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const rows = await prisma.product.findMany({ orderBy: { name: "asc" } });
      if (rows.length > 0) return rows.map(toProduct);
    } catch {
      // fallback to JSON
    }
  }
  const json = await readCmsJson<Product[]>(cmsFiles.products);
  return json ?? staticProducts;
}

const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  "photo-print": "photo-print-with-frame",
  "photo-prints": "photo-print-with-frame",
  "wall-signage-printing": "custom-signages-led-boards",
  "signage": "custom-signages-led-boards",
  "id-card-lanyard-combo": "id-cards-lanyards",
  "labels-packaging": "13x19-sticker-sheets",
  "sticker-sheets": "13x19-sticker-sheets",
  "digital-print": "13x19-digital-print",
  "bill-books": "single-color-bill-books",
  "mugs": "ceramic-magic-mugs",
  "badges": "button-badges",
  "banners": "banners-vinyl-stickers",
  "stamps": "seals-stamps",
};

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  const targetSlug = PRODUCT_SLUG_ALIASES[slug.toLowerCase()] || slug;
  return all.find((p) => p.slug === targetSlug || p.slug === slug || p.id === slug);
}

export async function getCategories(): Promise<ProductCategory[]> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const rows = await prisma.category.findMany({ orderBy: { name: "asc" } });
      if (rows.length > 0) return rows.map(toCategory);
    } catch {
      // fallback to JSON
    }
  }
  const json = await readCmsJson<ProductCategory[]>(cmsFiles.categories);
  return json ?? staticCategories;
}

export async function getServices(): Promise<Service[]> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const rows = await prisma.service.findMany({ orderBy: { name: "asc" } });
      if (rows.length > 0) return rows.map(toService);
    } catch {
      // fallback to JSON
    }
  }
  const json = await readCmsJson<Service[]>(cmsFiles.services);
  return json ?? staticServices;
}

export async function getSettings(): Promise<SiteSettings> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
      if (row) return toSiteSettings(row);
    } catch {
      // fallback to JSON
    }
  }
  const json = await readCmsJson<SiteSettings>(cmsFiles.settings);
  return json ?? defaultSettings;
}

const memoryOrdersCache: Order[] = [];

export async function getOrders(): Promise<Order[]> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const rows = await prisma.order.findMany({
        include: orderInclude,
        orderBy: { createdAt: "desc" },
      });
      return rows.map(toOrder);
    } catch {
      // fallback to JSON
    }
  }
  const json = await readCmsJson<Order[]>(cmsFiles.orders);
  const fileOrders = json ?? [];

  const combined = [...memoryOrdersCache];
  for (const o of fileOrders) {
    if (!combined.some((m) => m.id === o.id)) {
      combined.push(o);
    }
  }
  return combined;
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeCmsJson(cmsFiles.products, products);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.$transaction(async (tx) => {
      const ids = products.map((p) => p.id);
      await tx.product.deleteMany({ where: { id: { notIn: ids } } });
      for (const product of products) {
        await tx.product.upsert({
          where: { id: product.id },
          create: productToDb(product),
          update: productToDb(product),
        });
      }
    });
  } catch {
    // optional DB sync failed
  }
}

export async function saveCategories(categories: ProductCategory[]): Promise<void> {
  await writeCmsJson(cmsFiles.categories, categories);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.$transaction(async (tx) => {
      const ids = categories.map((c) => c.id);
      await tx.category.deleteMany({ where: { id: { notIn: ids } } });
      for (const category of categories) {
        await tx.category.upsert({
          where: { id: category.id },
          create: categoryToDb(category),
          update: categoryToDb(category),
        });
      }
    });
  } catch {}
}

export async function saveServices(services: Service[]): Promise<void> {
  await writeCmsJson(cmsFiles.services, services);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.$transaction(async (tx) => {
      const ids = services.map((s) => s.id);
      await tx.service.deleteMany({ where: { id: { notIn: ids } } });
      for (const service of services) {
        await tx.service.upsert({
          where: { id: service.id },
          create: serviceToDb(service),
          update: serviceToDb(service),
        });
      }
    });
  } catch {}
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeCmsJson(cmsFiles.settings, settings);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.siteSettings.upsert({
      where: { id: "default" },
      create: settingsToDb(settings),
      update: settingsToDb(settings),
    });
  } catch {}
}

export async function getHomepageContent(): Promise<HomepageContent> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const doc = await prisma.cmsDocument.findUnique({ where: { id: "homepage" } });
      if (doc) return toHomepageContent(doc.content);
    } catch {}
  }
  const json = await readCmsJson<HomepageContent>(cmsFiles.homepage);
  return json ?? defaultHomepageContent;
}

export async function saveHomepageContent(content: HomepageContent): Promise<void> {
  await writeCmsJson(cmsFiles.homepage, content);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.cmsDocument.upsert({
      where: { id: "homepage" },
      create: { id: "homepage", content },
      update: { content },
    });
  } catch {}
}

export async function getTestimonialsContent(): Promise<TestimonialsContent> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const doc = await prisma.cmsDocument.findUnique({ where: { id: "testimonials" } });
      if (doc) return toTestimonialsContent(doc.content);
    } catch {}
  }
  const json = await readCmsJson<TestimonialsContent>(cmsFiles.testimonials);
  return json ?? defaultTestimonialsContent;
}

export async function saveTestimonialsContent(content: TestimonialsContent): Promise<void> {
  await writeCmsJson(cmsFiles.testimonials, content);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.cmsDocument.upsert({
      where: { id: "testimonials" },
      create: { id: "testimonials", content },
      update: { content },
    });
  } catch {}
}

export async function getCorporateContent(): Promise<CorporateContent> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const doc = await prisma.cmsDocument.findUnique({ where: { id: "corporate" } });
      if (doc) return toCorporateContent(doc.content);
    } catch {}
  }
  const json = await readCmsJson<CorporateContent>(cmsFiles.corporate);
  return json ?? defaultCorporateContent;
}

export async function saveCorporateContent(content: CorporateContent): Promise<void> {
  await writeCmsJson(cmsFiles.corporate, content);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.cmsDocument.upsert({
      where: { id: "corporate" },
      create: { id: "corporate", content },
      update: { content },
    });
  } catch {}
}

export async function saveOrders(orders: Order[]): Promise<void> {
  await writeCmsJson(cmsFiles.orders, orders);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.$transaction(async (tx) => {
      const ids = orders.map((o) => o.id);
      await tx.orderItem.deleteMany({ where: { orderId: { notIn: ids } } });
      await tx.order.deleteMany({ where: { id: { notIn: ids } } });
      for (const order of orders) {
        const data = orderToDb(order);
        await tx.order.upsert({
          where: { id: order.id },
          create: data,
          update: {
            orderNumber: data.orderNumber,
            createdAt: data.createdAt,
            status: data.status,
            paymentStatus: data.paymentStatus,
            userId: data.userId,
            razorpayOrderId: data.razorpayOrderId,
            razorpayPaymentId: data.razorpayPaymentId,
            paidAt: data.paidAt,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            customerAddress: data.customerAddress,
            notes: data.notes,
            subtotal: data.subtotal,
          },
        });
        await tx.orderItem.deleteMany({ where: { orderId: order.id } });
        if (order.items.length) {
          await tx.orderItem.createMany({
            data: order.items.map((item) => ({
              orderId: order.id,
              productId: item.productId,
              productName: item.productName,
              productSlug: item.productSlug,
              quantity: item.quantity,
              selectedSize: item.selectedSize,
              selectedFinish: item.selectedFinish,
              selectedUnits: item.selectedUnits,
              unitPrice: item.unitPrice,
              lineTotal: item.lineTotal,
            })),
          });
        }
      }
    });
  } catch {}
}

export async function addOrder(order: Order): Promise<void> {
  memoryOrdersCache.unshift(order);
  const existing = (await getOrders()) || [];
  await writeCmsJson(cmsFiles.orders, existing);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.order.create({ data: orderToDb(order) });
  } catch {}
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const all = await getOrders();
  return all.find((o) => o.id === id);
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  const all = await getOrders();
  const index = all.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const updated: Order = {
    ...all[index],
    ...patch,
    customer: patch.customer ? { ...all[index].customer, ...patch.customer } : all[index].customer,
  };
  all[index] = updated;
  await saveOrders(all);
  return updated;
}

const memoryUsersCache: CustomerUser[] = [];

export async function getUsers(): Promise<CustomerUser[]> {
  if (process.env.DATABASE_URL) {
    try {
      await ensureDbSeeded();
      const rows = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
      if (rows.length > 0) return rows.map(toUser);
    } catch {}
  }
  const json = await readCmsJson<CustomerUser[]>(cmsFiles.users);
  const fileUsers = json ?? [];
  
  // Combine file users with memory cache for serverless environments
  const combined = [...memoryUsersCache];
  for (const u of fileUsers) {
    if (!combined.some((m) => m.id === u.id)) {
      combined.push(u);
    }
  }
  return combined;
}

export async function getUserById(id: string): Promise<CustomerUser | undefined> {
  const all = await getUsers();
  return all.find((u) => u.id === id);
}

export async function getUserByEmail(email: string): Promise<CustomerUser | undefined> {
  const all = await getUsers();
  return all.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export async function createUser(user: CustomerUser): Promise<void> {
  memoryUsersCache.unshift(user);
  const all = await getUsers();
  await writeCmsJson(cmsFiles.users, all);
  if (!process.env.DATABASE_URL) return;
  try {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email.toLowerCase(),
        phone: user.phone,
        address: user.address,
        passwordHash: user.passwordHash,
        createdAt: new Date(user.createdAt),
      },
    });
  } catch {}
}

export async function updateUser(
  id: string,
  patch: Partial<Omit<CustomerUser, "id" | "createdAt">>,
): Promise<CustomerUser | null> {
  const all = await getUsers();
  const index = all.findIndex((u) => u.id === id);
  if (index === -1) return null;

  const updated: CustomerUser = {
    ...all[index],
    ...patch,
  };
  all[index] = updated;
  await writeCmsJson(cmsFiles.users, all);
  return updated;
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  const all = await getOrders();
  return all.filter((o) => o.userId === userId);
}

export function filterProductsList(
  products: Product[],
  categories: ProductCategory[],
  category?: string | null,
  q?: string | null,
  budget?: string | null,
) {
  let list = [...products];
  const categoryIds = new Set(categories.map((c) => c.id));

  if (category && categoryIds.has(category as ProductCategory["id"])) {
    list = list.filter((p) => p.category === category);
  }

  if (budget) {
    const [minRaw, maxRaw] = budget.split("-");
    const min = Number(minRaw);
    const max = Number(maxRaw);
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      list = list.filter((p) => p.basePrice >= min && p.basePrice <= max);
    }
  }

  const needle = q?.trim().toLowerCase();
  if (needle) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.shortDescription.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle),
    );
  }

  return list;
}

export function categoryLabelFromList(categories: ProductCategory[], id: string) {
  return categories.find((c) => c.id === id)?.name ?? id;
}
