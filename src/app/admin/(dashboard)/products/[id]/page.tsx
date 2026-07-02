import { ProductForm } from "@/components/admin/product-form";
import { getCategories, getProducts } from "@/lib/cms/queries";
import type { Product } from "@/types/product";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

const emptyProduct = (categories: Awaited<ReturnType<typeof getCategories>>): Product => ({
  id: crypto.randomUUID(),
  slug: "",
  name: "",
  shortDescription: "",
  description: "",
  basePrice: 499,
  turnaround: "2–3 days",
  image: "/images/visiting-cards.png",
  category: categories[0]?.id ?? "business-essentials",
  options: { sizes: ["Standard"], finishes: ["Matte"], quantities: [100, 250, 500] },
});

export default async function AdminProductEditPage({ params }: PageProps) {
  const { id } = await params;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const isNew = id === "new";
  const product = isNew ? emptyProduct(categories) : products.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Catalogue</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
          {isNew ? "Add product" : `Edit ${product.name}`}
        </h1>
      </div>
      <ProductForm product={product} categories={categories} mode={isNew ? "create" : "edit"} />
    </div>
  );
}
