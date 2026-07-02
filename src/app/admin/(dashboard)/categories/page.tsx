import { CategoriesEditor } from "@/components/admin/categories-editor";
import { getCategories } from "@/lib/cms/queries";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Catalogue</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">Categories</h1>
        <p className="mt-2 text-sm text-ink-500">Manage shop categories shown on the storefront and filters.</p>
      </div>
      <CategoriesEditor initial={categories} />
    </div>
  );
}
