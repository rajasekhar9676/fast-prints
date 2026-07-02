import type { Order, SiteSettings } from "@/types/admin";
import type { Product, ProductCategory, Service } from "@/types/product";
import { defaultSettings, ensureCmsSeeded } from "./seed";
import { cmsFiles, readCmsJson, writeCmsJson } from "./store";

export async function getProducts(): Promise<Product[]> {
  await ensureCmsSeeded();
  return (await readCmsJson<Product[]>(cmsFiles.products)) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<ProductCategory[]> {
  await ensureCmsSeeded();
  return (await readCmsJson<ProductCategory[]>(cmsFiles.categories)) ?? [];
}

export async function getServices(): Promise<Service[]> {
  await ensureCmsSeeded();
  return (await readCmsJson<Service[]>(cmsFiles.services)) ?? [];
}

export async function getSettings(): Promise<SiteSettings> {
  await ensureCmsSeeded();
  return (await readCmsJson<SiteSettings>(cmsFiles.settings)) ?? defaultSettings;
}

export async function getOrders(): Promise<Order[]> {
  await ensureCmsSeeded();
  const orders = (await readCmsJson<Order[]>(cmsFiles.orders)) ?? [];
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeCmsJson(cmsFiles.products, products);
}

export async function saveCategories(categories: ProductCategory[]): Promise<void> {
  await writeCmsJson(cmsFiles.categories, categories);
}

export async function saveServices(services: Service[]): Promise<void> {
  await writeCmsJson(cmsFiles.services, services);
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeCmsJson(cmsFiles.settings, settings);
}

export async function saveOrders(orders: Order[]): Promise<void> {
  await writeCmsJson(cmsFiles.orders, orders);
}

export async function addOrder(order: Order): Promise<void> {
  const orders = await getOrders();
  orders.unshift(order);
  await saveOrders(orders);
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
