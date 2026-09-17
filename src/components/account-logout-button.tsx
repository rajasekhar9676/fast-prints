"use client";

import { useCustomerAuth } from "@/context/customer-auth-context";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AccountLogoutButton() {
  const { logout } = useCustomerAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-600 transition hover:bg-ink-50"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      Sign out
    </button>
  );
}
