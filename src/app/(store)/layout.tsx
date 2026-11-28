import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CustomerAuthProvider } from "@/context/customer-auth-context";
import { StoreDataProvider } from "@/context/store-data-context";
import { getCategories, getSettings } from "@/lib/cms/queries";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()]);

  return (
    <StoreDataProvider categories={categories} settings={settings}>
      <CustomerAuthProvider>
        <div className="flex min-h-screen flex-1 flex-col bg-white">
          <SiteHeader />
          <main className="flex-1 w-full">{children}</main>
          <SiteFooter />
        </div>
      </CustomerAuthProvider>
    </StoreDataProvider>
  );
}
