import { ServicesEditor } from "@/components/admin/services-editor";
import { getServices } from "@/lib/cms/queries";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Capabilities</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">Services</h1>
        <p className="mt-2 text-sm text-ink-500">Edit the full services list shown on the Services page.</p>
      </div>
      <ServicesEditor initial={services} />
    </div>
  );
}
