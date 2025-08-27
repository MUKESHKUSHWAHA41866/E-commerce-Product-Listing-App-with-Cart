"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      role: form.get("role"), // "ADMIN" or "USER"
    };
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    const j = await res.json();
    if (!res.ok) {
      setErr(j?.error ?? "Failed to signup");
      return;
    }

    // 👇 check role
    if (j.user?.role === "ADMIN") {
      window.location.href = "/admin";
      return;
    }
    
    window.location.href = "/";
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white/5 p-8">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <div>
        <label className="mb-1 block text-sm">Name</label>
        <input name="name" className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1 block text-sm">Email</label>
        <input name="email" type="email" required className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1 block text-sm">Password</label>
        <input name="password" type="password" required className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" />
      </div>

      <div>
  <label className="mb-1 block text-sm">Role</label>
  <select
    name="role"
    className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm
               text-white transition-colors
               hover:bg-white/20 focus:border-purple-400/40 focus:ring-4 focus:ring-purple-500/15
               appearance-none"
    defaultValue="USER"
  >
    <option value="USER" className="bg-zinc-900 text-white hover:bg-purple-600">
      User
    </option>
    <option value="ADMIN" className="bg-zinc-900 text-white hover:bg-purple-600">
      Admin
    </option>
  </select>
  <p className="mt-1 text-xs text-zinc-400">
    For testing you can register an admin here.
  </p>
</div>

      {err && <p className="text-sm text-red-400">{err}</p>}

      <button disabled={loading} className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">
        {loading ? "Creating..." : "Sign up"}
      </button>
       
       <p className="text-sm text-zinc-400">
        Don’t have an account?{" "}
        <Link href="/login" className="text-cyan-400 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
