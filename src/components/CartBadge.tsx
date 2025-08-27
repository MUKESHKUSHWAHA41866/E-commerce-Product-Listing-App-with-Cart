"use client";
import { useCartStore } from "@/store/useCartStore";

export default function CartBadge() {
  const count = useCartStore((s) => s.count());
  return (
    <div className="rounded-full bg-white/10 px-3 py-1 text-sm">
      Cart: {count}
    </div>
  );
}
