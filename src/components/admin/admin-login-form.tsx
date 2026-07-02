"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid password. Try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-premium mx-auto max-w-md space-y-4 p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Admin access</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
          Fast Prints control panel
        </h1>
        <p className="mt-2 text-sm text-ink-500">Sign in to manage products, orders, and site settings.</p>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          placeholder="Enter admin password"
          required
        />
      </label>

      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-xs text-ink-400">
        Default dev password: <code className="rounded bg-ink-50 px-1">admin123</code> — change via{" "}
        <code className="rounded bg-ink-50 px-1">ADMIN_PASSWORD</code> in <code className="rounded bg-ink-50 px-1">.env.local</code>
      </p>
    </form>
  );
}
