"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCustomerAuth } from "@/context/customer-auth-context";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 shadow-inner transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function CustomerSignupForm() {
  const router = useRouter();
  const { refresh } = useCustomerAuth();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, address, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not create account. Try again.");
      return;
    }

    await refresh();
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-premium mx-auto max-w-md space-y-4 p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Get started</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          We need your details to process orders and keep you updated on print jobs.
        </p>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Full name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
          required
          autoComplete="name"
        />
      </label>

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
        <span className="font-semibold text-ink-800">Phone</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="+91 98765 43210"
          required
          autoComplete="tel"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Delivery address</span>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`${inputClass} h-24`}
          placeholder="Flat, street, area, city, PIN"
          required
          autoComplete="street-address"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="At least 6 characters"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Confirm password</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputClass}
          placeholder="Repeat password"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </label>

      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-bold text-brand-700 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
