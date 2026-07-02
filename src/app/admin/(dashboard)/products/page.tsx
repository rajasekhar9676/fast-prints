import { getCategories, getProducts } from "@/lib/cms/queries";
import { formatINR } from "@/lib/currency";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Catalogue</p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          Add product
        </Link>
      </div>

      <div className="panel-light overflow-x-auto p-4">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-ink-500">
              <th className="px-2 py-2 font-semibold">Product</th>
              <th className="px-2 py-2 font-semibold">Category</th>
              <th className="px-2 py-2 font-semibold">Price</th>
              <th className="px-2 py-2 font-semibold">Flags</th>
              <th className="px-2 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-ink-50">
                <td className="px-2 py-3">
                  <p className="font-semibold text-ink-950">{product.name}</p>
                  <p className="text-xs text-ink-500">{product.slug}</p>
                </td>
                <td className="px-2 py-3 text-ink-600">{categoryMap.get(product.category) ?? product.category}</td>
                <td className="px-2 py-3 font-semibold text-ink-950">{formatINR(product.basePrice)}</td>
                <td className="px-2 py-3 text-xs text-ink-600">
                  {product.bestseller ? "Bestseller · " : ""}
                  {product.popular ? "Popular · " : ""}
                  {product.newLaunch ? "New" : ""}
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/products/${product.id}`} className="rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-bold hover:border-brand-400">
                      Edit
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
