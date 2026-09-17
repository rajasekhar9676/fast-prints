import { TestimonialsEditor } from "@/components/admin/testimonials-editor";
import { getTestimonialsContent } from "@/lib/cms/queries";

export default async function AdminTestimonialsPage() {
  const content = await getTestimonialsContent();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Storefront</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
          Testimonials
        </h1>
        <p className="mt-2 text-sm text-ink-500">Manage reviews shown on the homepage and /testimonials page.</p>
      </div>
      <TestimonialsEditor initial={content} />
    </div>
  );
}
