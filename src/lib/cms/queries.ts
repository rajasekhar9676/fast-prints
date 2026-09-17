import type { Order, SiteSettings } from "@/types/admin";
import type { CorporateContent, HomepageContent, TestimonialsContent } from "@/types/cms-content";
import type { Product, ProductCategory, Service } from "@/types/product";
import type { CustomerUser } from "@/types/user";
import { prisma } from "@/lib/db";
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
  await ensureDbSeeded();
  const rows = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await ensureDbSeeded();
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : undefined;
}

export async function getCategories(): Promise<ProductCategory[]> {
  await ensureDbSeeded();
  const rows = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return rows.map(toCategory);
}

export async function getServices(): Promise<Service[]> {
  await ensureDbSeeded();
  const rows = await prisma.service.findMany({ orderBy: { name: "asc" } });
  return rows.map(toService);
}

export async function getSettings(): Promise<SiteSettings> {
  await ensureDbSeeded();
  const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  return row ? toSiteSettings(row) : defaultSettings;
}

export async function getOrders(): Promise<Order[]> {
  await ensureDbSeeded();
  const rows = await prisma.order.findMany({
    include: orderInclude,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toOrder);
}

export async function saveProducts(products: Product[]): Promise<void> {
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
}

export async function saveCategories(categories: ProductCategory[]): Promise<void> {
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
}

export async function saveServices(services: Service[]): Promise<void> {
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
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: settingsToDb(settings),
    update: settingsToDb(settings),
  });
}

export async function getHomepageContent(): Promise<HomepageContent> {
  await ensureDbSeeded();
  const doc = await prisma.cmsDocument.findUnique({ where: { id: "homepage" } });
  return doc ? toHomepageContent(doc.content) : defaultHomepageContent;
}

export async function saveHomepageContent(content: HomepageContent): Promise<void> {
  await prisma.cmsDocument.upsert({
    where: { id: "homepage" },
    create: { id: "homepage", content },
    update: { content },
  });
}

export async function getTestimonialsContent(): Promise<TestimonialsContent> {
  await ensureDbSeeded();
  const doc = await prisma.cmsDocument.findUnique({ where: { id: "testimonials" } });
  return doc ? toTestimonialsContent(doc.content) : defaultTestimonialsContent;
}

export async function saveTestimonialsContent(content: TestimonialsContent): Promise<void> {
  await prisma.cmsDocument.upsert({
    where: { id: "testimonials" },
    create: { id: "testimonials", content },
    update: { content },
  });
}

export async function getCorporateContent(): Promise<CorporateContent> {
  await ensureDbSeeded();
  const doc = await prisma.cmsDocument.findUnique({ where: { id: "corporate" } });
  return doc ? toCorporateContent(doc.content) : defaultCorporateContent;
}

export async function saveCorporateContent(content: CorporateContent): Promise<void> {
  await prisma.cmsDocument.upsert({
    where: { id: "corporate" },
    create: { id: "corporate", content },
    update: { content },
  });
}

export async function saveOrders(orders: Order[]): Promise<void> {
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
}

export async function addOrder(order: Order): Promise<void> {
  await prisma.order.create({ data: orderToDb(order) });
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await ensureDbSeeded();
  const row = await prisma.order.findUnique({ where: { id }, include: orderInclude });
  return row ? toOrder(row) : undefined;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  const existing = await prisma.order.findUnique({ where: { id }, include: orderInclude });
  if (!existing) return null;

  const row = await prisma.order.update({
    where: { id },
    data: {
      status: patch.status,
      paymentStatus: patch.paymentStatus,
      razorpayOrderId: patch.razorpayOrderId,
      razorpayPaymentId: patch.razorpayPaymentId,
      paidAt: patch.paidAt ? new Date(patch.paidAt) : undefined,
      notes: patch.notes,
      customerName: patch.customer?.name,
      customerEmail: patch.customer?.email,
      customerPhone: patch.customer?.phone,
      customerAddress: patch.customer?.address,
      subtotal: patch.subtotal,
    },
    include: orderInclude,
  });

  return toOrder(row);
}

export async function getUsers(): Promise<CustomerUser[]> {
  await ensureDbSeeded();
  const rows = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toUser);
}

export async function getUserById(id: string): Promise<CustomerUser | undefined> {
  await ensureDbSeeded();
  const row = await prisma.user.findUnique({ where: { id } });
  return row ? toUser(row) : undefined;
}

export async function getUserByEmail(email: string): Promise<CustomerUser | undefined> {
  await ensureDbSeeded();
  const row = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  return row ? toUser(row) : undefined;
}

export async function createUser(user: CustomerUser): Promise<void> {
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
}

export async function updateUser(
  id: string,
  patch: Partial<Omit<CustomerUser, "id" | "createdAt">>,
): Promise<CustomerUser | null> {
  const row = await prisma.user.update({
    where: { id },
    data: {
      name: patch.name,
      email: patch.email?.toLowerCase(),
      phone: patch.phone,
      address: patch.address,
      passwordHash: patch.passwordHash,
    },
  });
  return toUser(row);
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  await ensureDbSeeded();
  const rows = await prisma.order.findMany({
    where: { userId },
    include: orderInclude,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toOrder);
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
