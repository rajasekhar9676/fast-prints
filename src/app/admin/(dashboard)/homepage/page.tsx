import { HomepageContentEditor } from "@/components/admin/homepage-content-editor";
import { getHomepageContent } from "@/lib/cms/queries";

export default async function AdminHomepagePage() {
  const content = await getHomepageContent();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Storefront</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
          Homepage content
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Edit hero banners, perks, how it works, promises, FAQ, shop-by-need, budgets, and print facility.
        </p>
      </div>
      <HomepageContentEditor initial={content} />
    </div>
  );
}
