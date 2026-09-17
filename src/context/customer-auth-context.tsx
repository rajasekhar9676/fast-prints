"use client";

import type { CustomerPublic } from "@/types/user";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CustomerAuthContextType = {
  user: CustomerPublic | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerPublic | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/customer/me");
    if (res.ok) {
      const data = (await res.json()) as { user: CustomerPublic };
      setUser(data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <CustomerAuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used inside CustomerAuthProvider");
  }
  return context;
}

export function useRequireCustomerLogin() {
  const { user, loading } = useCustomerAuth();

  function gate(nextPath: string, action: () => void) {
    if (loading) return;
    if (!user) {
      const next = encodeURIComponent(nextPath);
      window.location.href = `/login?next=${next}`;
      return;
    }
    action();
  }

  return { user, loading, gate };
}
