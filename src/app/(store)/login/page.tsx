import { CustomerLoginForm } from "@/components/customer-login-form";
import { Suspense } from "react";

export const metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7 flex min-h-[60vh] items-center justify-center py-10">
      <Suspense fallback={<p className="text-sm text-ink-500">Loading…</p>}>
        <CustomerLoginForm />
      </Suspense>
    </div>
  );
}
