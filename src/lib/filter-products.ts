import type { ProductCategoryId } from "@/types/product";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const categoryIds = new Set(categories.map((c) => c.id));

export function filterProducts(category?: string | null, q?: string | null) {
  let list = [...products];

  if (category && categoryIds.has(category as ProductCategoryId)) {
    list = list.filter((p) => p.category === category);
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

export function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.name ?? id;
}
