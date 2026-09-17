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
        <div className="flex min-h-screen flex-1 flex-col bg-[#f6f4ef]">
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 md:px-6 md:py-7">{children}</main>
          <SiteFooter />
        </div>
      </CustomerAuthProvider>
    </StoreDataProvider>
  );
}
