"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

const schema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().min(5, "Description is too short"),
  imageUrl: z.string().url("Enter a valid image URL"),
  price: z.coerce.number().min(0, "Price must be >= 0"),
  categoryId: z.string().min(1, "Pick a category"),
});

type FormValues = z.infer<typeof schema>;

type Category = { id: string; name: string };
type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: { id: string; name: string } | null;
};

export default function ProductEditModal({
  open,
  onClose,
  product,
  categories,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
  categories: Category[];
  onSaved?: () => void; // called after successful save
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      categoryId: product.category?.id ?? "",
    },
  });

  // keep defaults in sync if product changes
  // (useEffect avoided for brevity; modal mounts fresh per open in our usage)

  const onSubmit = async (values: FormValues) => {
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Failed to update");
      return;
    }
    reset(values);
    onClose();
    onSaved?.();
  };

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
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c10]/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h3 className="text-lg font-semibold">Edit Product</h3>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 p-6 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-zinc-200">Title</label>
                  <input
                    {...register("title")}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="Product title"
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-200">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="e.g. 19.99"
                  />
                  {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-200">Category</label>
                  <select
                    {...register("categoryId")}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="mt-1 text-xs text-red-400">{errors.categoryId.message}</p>
                  )}
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-zinc-200">Image URL</label>
                  <input
                    {...register("imageUrl")}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && (
                    <p className="mt-1 text-xs text-red-400">{errors.imageUrl.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-zinc-200">Description</label>
                  <textarea
                    {...register("description")}
                    className="w-full min-h-[110px] rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="What makes this awesome?"
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="md:col-span-2 mt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isSubmitting}
                    className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                  >
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
