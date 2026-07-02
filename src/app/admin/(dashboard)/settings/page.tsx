import { SettingsForm } from "@/components/admin/settings-form";
import { getSettings } from "@/lib/cms/queries";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Storefront</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">Site settings</h1>
        <p className="mt-2 text-sm text-ink-500">Contact details, promo text, and map shown on the website.</p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
