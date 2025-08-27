"use client";
import { useEffect, useState } from "react";

export default function UserMenu() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      const j = await r.json();
      setUser(j?.user ?? null);
    })();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  if (!user) {
    return (
      <a href="/login" className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">
        Login
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-zinc-300">{user.email} • {user.role}</span>
      <button onClick={logout} className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">
        Logout
      </button>
    </div>
  );
}
