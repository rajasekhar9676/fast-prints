import { getCategories, getProducts } from "@/lib/cms/queries";
import { AdminProductsManager } from "@/components/admin/admin-products-manager";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Catalogue & Sizes</p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
            Products & Sizes Management
          </h1>
        </div>
      </div>

      <AdminProductsManager initialProducts={products} categories={categories} />
    </div>
  );
}
