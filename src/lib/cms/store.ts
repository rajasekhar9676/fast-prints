import fs from "fs/promises";
import path from "path";

const CMS_DIR = path.join(process.cwd(), "data", "cms");

async function ensureDir() {
  await fs.mkdir(CMS_DIR, { recursive: true });
}

function filePath(name: string) {
  return path.join(CMS_DIR, name);
}

export async function readCmsJson<T>(name: string): Promise<T | null> {
  await ensureDir();
  try {
    const raw = await fs.readFile(filePath(name), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeCmsJson<T>(name: string, data: T): Promise<void> {
  await ensureDir();
  await fs.writeFile(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}

export const cmsFiles = {
  products: "products.json",
  categories: "categories.json",
  services: "services.json",
  orders: "orders.json",
  settings: "settings.json",
} as const;
