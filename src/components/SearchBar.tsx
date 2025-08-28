 


"use client";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";

export default function SearchBar() {
  const { search, setSearch } = useSearchFilterStore();

  return (
    <div className="relative w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pl-11 text-sm shadow-inner outline-none transition
                   placeholder:text-zinc-400 focus:border-purple-400/40 focus:bg-white/10 focus:ring-4 focus:ring-purple-500/15"
      />
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </div>
  );
}
