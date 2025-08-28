 



"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import ProductModal from "./ProductModal";

export default function ProductCard({ p }: { p: any }) {
  const addLocal = useCartStore((s) => s.add);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      // 1) call your backend (POST /api/cart) to persist
      const res = await fetch("/api/cart/add", {
        method: "POST",
        body: JSON.stringify({ productId: p.id, quantity: 1 }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Failed to add to cart");
      }

      // 2) update local store so UI is responsive
      addLocal({
        productId: p.id,
        title: p.title,
        price: Number(p.price),
        imageUrl: p.imageUrl,
        quantity: 1,
      });

      // 3) (optional) tiny success feedback
      // you can replace with a real toast if you use a toast lib
      console.info("Added to cart ✓");
    } catch (err: any) {
      alert(err.message ?? "Could not add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-xl backdrop-blur
                   transition hover:border-white/20 hover:bg-white/[0.06]"
      >
        <div className="relative w-full overflow-hidden rounded-2xl">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 opacity-0 transition group-hover:opacity-100" />
          <div className="relative aspect-[4/3]">
            <Image
              src={p.imageUrl}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur
                       transition group-hover:opacity-100 hover:bg-black/70"
          >
            Quick view
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="line-clamp-1 text-[15px] font-medium">{p.title}</div>
          <div className="line-clamp-2 text-sm text-zinc-400">{p.description}</div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[15px] font-semibold">$ {Number(p.price).toFixed(2)}</span>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={adding}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm transition
                         hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-100 disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add to cart"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <ProductModal open={open} onClose={() => setOpen(false)} product={p} />
    </>
  );
}

