"use client";

import type { SiteSettings } from "@/types/admin";
import type { ProductCategory } from "@/types/product";
import { createContext, useContext } from "react";

type StoreDataContextValue = {
  categories: ProductCategory[];
  settings: SiteSettings;
};

const StoreDataContext = createContext<StoreDataContextValue | null>(null);

export function StoreDataProvider({
  categories,
  settings,
  children,
}: StoreDataContextValue & { children: React.ReactNode }) {
  return <StoreDataContext.Provider value={{ categories, settings }}>{children}</StoreDataContext.Provider>;
}

export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error("useStoreData must be used within StoreDataProvider");
  }
  return context;
}
