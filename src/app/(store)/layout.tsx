import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreDataProvider } from "@/context/store-data-context";
import { getCategories, getSettings } from "@/lib/cms/queries";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()]);

  return (
    <StoreDataProvider categories={categories} settings={settings}>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">{children}</main>
      <SiteFooter />
    </StoreDataProvider>
  );
}
