import { CorporateContentEditor } from "@/components/admin/corporate-content-editor";
import { getCorporateContent } from "@/lib/cms/queries";

export default async function AdminCorporatePage() {
  const content = await getCorporateContent();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Storefront</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
          Corporate page
        </h1>
        <p className="mt-2 text-sm text-ink-500">Edit corporate hero, features, and solution cards.</p>
      </div>
      <CorporateContentEditor initial={content} />
    </div>
  );
}
