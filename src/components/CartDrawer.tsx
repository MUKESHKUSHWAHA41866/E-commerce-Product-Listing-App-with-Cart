"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const removeLocal = useCartStore((s) => s.remove);
  const subtotal = useCartStore((s) => s.subtotal());
  const [busy, setBusy] = useState<string | null>(null);

  // Try to remove on the server (find cartItemId by productId), then remove locally
  const removeEverywhere = async (productId: string) => {
    try {
      setBusy(productId);
      // 1) fetch server cart to find the cartItem.id for this product
      const cart = await fetch("/api/cart", { cache: "no-store" }).then((r) => r.json());
      const match = cart?.items?.find((it: any) => it.productId === productId);
      if (match?.id) {
        await fetch("/api/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItemId: match.id }),
        });
      }
    } catch {
      // ignore network errors (we still update local)
    } finally {
      removeLocal(productId); // always update local cart
      setBusy(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#0b0c10] p-4 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button
                onClick={onClose}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-sm hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="mt-10 text-center text-zinc-400">Your cart is empty.</div>
            ) : (
              <div className="space-y-3">
                {items.map((i) => (
                  <div
                    key={i.productId}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                      <Image src={i.imageUrl} alt={i.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{i.title}</div>
                      <div className="text-xs text-zinc-400">Qty: {i.quantity}</div>
                      <div className="text-sm font-semibold">$ {(i.price * i.quantity).toFixed(2)}</div>
                    </div>
                    <button
                      onClick={() => removeEverywhere(i.productId)}
                      disabled={busy === i.productId}
                      className="self-start rounded-lg border border-red-400/30 bg-red-500/10 px-2 py-1 text-xs text-red-200 hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {busy === i.productId ? "Removing..." : "Remove"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">Subtotal</span>
                <span className="text-base font-semibold">$ {subtotal.toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
