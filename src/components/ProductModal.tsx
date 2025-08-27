"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function ProductModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: any;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* dialog */}
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center px-4"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d12]/95 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{product.description}</p>
                  <div className="mt-4 text-lg font-semibold">
                    $ {Number(product.price).toFixed(2)}
                  </div>

                  {product?.category?.name && (
                    <div className="mt-2 text-xs text-zinc-400">
                      Category: <span className="text-zinc-200">{product.category.name}</span>
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
                    >
                      Close
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-2xl border border-purple-300/30 bg-purple-500/15 px-4 py-2 text-sm text-purple-100 transition hover:bg-purple-500/25"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
