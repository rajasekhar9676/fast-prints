"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCustomerAuth } from "@/context/customer-auth-context";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 shadow-inner transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function CustomerLoginForm() {
  const router = useRouter();
  const { refresh } = useCustomerAuth();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not sign in. Try again.");
      return;
    }

    await refresh();
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-premium mx-auto max-w-md space-y-4 p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Your account</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
          Sign in to order
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Log in to add items to cart, checkout, and track your print orders.
        </p>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="Your password"
          required
          autoComplete="current-password"
        />
      </label>

      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm text-ink-500">
        New here?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
