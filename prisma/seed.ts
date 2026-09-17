import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { services } from "@/data/services";
import type { Order } from "@/types/admin";
import type { CustomerUser } from "@/types/user";
import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
import {
  categoryToDb,
  orderToDb,
  productToDb,
  serviceToDb,
  settingsToDb,
} from "../src/lib/cms/mappers";
import {
  defaultCorporateContent,
  defaultHomepageContent,
  defaultTestimonialsContent,
} from "../src/lib/cms/default-content";
import { defaultSettings } from "../src/lib/cms/seed";
import type { SiteSettings } from "../src/types/admin";

const prisma = new PrismaClient();
const CMS_DIR = path.join(process.cwd(), "data", "cms");

async function readJsonFile<T>(name: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(CMS_DIR, name), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function main() {
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

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.service.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.cmsDocument.deleteMany();
  await prisma.corporateInquiry.deleteMany();

  const seedProducts = jsonProducts ?? products;
  const seedCategories = jsonCategories ?? categories;
  const seedServices = jsonServices ?? services;
  const seedSettings = jsonSettings ?? defaultSettings;

  for (const category of seedCategories) {
    await prisma.category.create({ data: categoryToDb(category) });
  }

  for (const product of seedProducts) {
    await prisma.product.create({ data: productToDb(product) });
  }

  for (const service of seedServices) {
    await prisma.service.create({ data: serviceToDb(service) });
  }

  await prisma.siteSettings.create({ data: settingsToDb(seedSettings) });

  await prisma.cmsDocument.create({
    data: { id: "homepage", content: jsonHomepage ?? defaultHomepageContent },
  });
  await prisma.cmsDocument.create({
    data: { id: "testimonials", content: jsonTestimonials ?? defaultTestimonialsContent },
  });
  await prisma.cmsDocument.create({
    data: { id: "corporate", content: jsonCorporate ?? defaultCorporateContent },
  });

  for (const user of jsonUsers ?? []) {
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

  for (const order of jsonOrders ?? []) {
    await prisma.order.create({ data: orderToDb(order) });
  }

  console.log("Database seeded successfully.");
  console.log(`  Products: ${seedProducts.length}`);
  console.log(`  Categories: ${seedCategories.length}`);
  console.log(`  Users: ${(jsonUsers ?? []).length}`);
  console.log(`  Orders: ${(jsonOrders ?? []).length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
