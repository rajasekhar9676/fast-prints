import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { services } from "@/data/services";
import type { SiteSettings } from "@/types/admin";
import { cmsFiles, readCmsJson, writeCmsJson } from "./store";

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

let seeding: Promise<void> | null = null;

export async function ensureCmsSeeded(): Promise<void> {
  if (!seeding) {
    seeding = seedCmsIfMissing();
  }
  await seeding;
}

async function seedCmsIfMissing(): Promise<void> {
  const [existingProducts, existingCategories, existingServices, existingSettings, existingOrders] =
    await Promise.all([
      readCmsJson(cmsFiles.products),
      readCmsJson(cmsFiles.categories),
      readCmsJson(cmsFiles.services),
      readCmsJson(cmsFiles.settings),
      readCmsJson(cmsFiles.orders),
    ]);

  const writes: Promise<void>[] = [];

  if (!existingProducts) writes.push(writeCmsJson(cmsFiles.products, products));
  if (!existingCategories) writes.push(writeCmsJson(cmsFiles.categories, categories));
  if (!existingServices) writes.push(writeCmsJson(cmsFiles.services, services));
  if (!existingSettings) writes.push(writeCmsJson(cmsFiles.settings, defaultSettings));
  if (!existingOrders) writes.push(writeCmsJson(cmsFiles.orders, []));

  await Promise.all(writes);
}
