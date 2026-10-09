import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { services } from "@/data/services";
import type { SiteSettings } from "@/types/admin";
import type { Order } from "@/types/admin";
import type { CustomerUser } from "@/types/user";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";
import {
  categoryToDb,
  orderToDb,
  productToDb,
  serviceToDb,
  settingsToDb,
} from "./mappers";
import {
  defaultCorporateContent,
  defaultHomepageContent,
  defaultTestimonialsContent,
} from "./default-content";

export const defaultSettings: SiteSettings = {
  businessName: "Fast Prints Bengaluru",
  phone: "+91 91647 79922",
  email: "fastprintsbtm@gmail.com",
  whatsapp: "+91 91647 79922",
  website: "www.fastprintsdigital.in",
  promoText: "Same day delivery in Bengaluru · Pickup at BTM 2nd Stage · +91 91647 79922",
  addressLines: [
    "Landmark: 15, 20th Main Rd,",
    "below Canara Bank, opp. Metro Pillar 154,",
    "BTM 2nd Stage, Kuvempu Nagar,",
    "BTM Layout, Bengaluru, Karnataka 560076",
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Landmark+15+20th+Main+Road+BTM+Layout+2nd+Stage+Bengaluru+560076&output=embed",
  parkingNote:
    "Located on 20th Main near Metro Pillar 154 — look for Landmark building below Canara Bank. Street parking is usually available off-peak; message us if you're carrying large rigid boards so we can keep holding space ready.",
};

const CMS_DIR = path.join(process.cwd(), "data", "cms");

let seeding: Promise<void> | null = null;

export async function ensureDbSeeded(): Promise<void> {
  if (!seeding) {
    seeding = seedDatabaseIfEmpty();
  }
  await seeding;
}

async function readJsonFile<T>(name: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(CMS_DIR, name), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function seedDatabaseIfEmpty(): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  try {
    const productCount = await prisma.product.count();
    if (productCount > 0) return;
  } catch {
    return;
  }

  const [
    jsonProducts,
    jsonCategories,
    jsonServices,
    jsonSettings,
    jsonOrders,
    jsonHomepage,
    jsonTestimonials,
    jsonCorporate,
    jsonUsers,
  ] = await Promise.all([
    readJsonFile<typeof products>("products.json"),
    readJsonFile<typeof categories>("categories.json"),
    readJsonFile<typeof services>("services.json"),
    readJsonFile<SiteSettings>("settings.json"),
    readJsonFile<Order[]>("orders.json"),
    readJsonFile("homepage.json"),
    readJsonFile("testimonials.json"),
    readJsonFile("corporate.json"),
    readJsonFile<CustomerUser[]>("users.json"),
  ]);

  const seedProducts = jsonProducts ?? products;
  const seedCategories = jsonCategories ?? categories;
  const seedServices = jsonServices ?? services;
  const seedSettings = jsonSettings ?? defaultSettings;

  await prisma.$transaction(async (tx) => {
    for (const category of seedCategories) {
      await tx.category.create({ data: categoryToDb(category) });
    }

    for (const product of seedProducts) {
      await tx.product.create({ data: productToDb(product) });
    }

    for (const service of seedServices) {
      await tx.service.create({ data: serviceToDb(service) });
    }

    await tx.siteSettings.create({ data: settingsToDb(seedSettings) });

    await tx.cmsDocument.create({
      data: { id: "homepage", content: jsonHomepage ?? defaultHomepageContent },
    });
    await tx.cmsDocument.create({
      data: { id: "testimonials", content: jsonTestimonials ?? defaultTestimonialsContent },
    });
    await tx.cmsDocument.create({
      data: { id: "corporate", content: jsonCorporate ?? defaultCorporateContent },
    });

    for (const user of jsonUsers ?? []) {
      await tx.user.create({
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

    for (const order of jsonOrders ?? []) {
      await tx.order.create({ data: orderToDb(order) });
    }
  });
}

/** @deprecated use ensureDbSeeded */
export const ensureCmsSeeded = ensureDbSeeded;
