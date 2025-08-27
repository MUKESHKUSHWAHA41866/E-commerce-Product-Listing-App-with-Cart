"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartDrawer from "./CartDrawer";
// import CartDrawer from "";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const count = useCartStore((s) => s.count());

  useEffect(() => setMounted(true), []);
  const label = mounted ? `Cart • ${count}` : "Cart";  
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
      >
        Cart • {label}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
