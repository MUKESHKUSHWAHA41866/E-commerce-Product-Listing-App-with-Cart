"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = { email: form.get("email"), password: form.get("password") };
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    const j = await res.json();
    if (!res.ok) {
      setErr(j?.error ?? "Failed to login");
      return;
    }
    // 👇 check role
    if (j.user?.role === "ADMIN") {
      window.location.href = "/admin";
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next") || "/";
    window.location.href = next;
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white/5 p-8">
      <h1 className="text-2xl font-semibold">Welcome back</h1>

      <div>
        <label className="mb-1 block text-sm">Email</label>
        <input name="email" type="email" required className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1 block text-sm">Password</label>
        <input name="password" type="password" required className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" />
      </div>

      {err && <p className="text-sm text-red-400">{err}</p>}

      <button disabled={loading} className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">
        {loading ? "Signing in..." : "Login"}
      </button>

      <p className="text-sm text-zinc-400">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-cyan-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
