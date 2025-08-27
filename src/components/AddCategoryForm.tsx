"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryCreateSchema } from "@/lib/validations";
import { z } from "zod";
import { slugify } from "@/lib/utils";
import { useState } from "react";

type Inputs = z.infer<typeof categoryCreateSchema>;

export default function AddCategoryForm() {
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<Inputs>({ resolver: zodResolver(categoryCreateSchema),
                      defaultValues: { name: "", slug: "" } });

  const onSubmit = async (data: Inputs) => {
    setSubmitting(true);
    const payload = {
      name: data.name.trim(),
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
    };

    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setSubmitting(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Failed to create category");
      return;
    }
    reset({ name: "", slug: "" });
    // Refresh the server page list
    if (typeof window !== "undefined") window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl rounded-2xl bg-white/5 p-8 shadow-xl backdrop-blur-lg space-y-6">

      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-1">Category Name</label>
        <input
          {...register("name")}
          placeholder="e.g. Shoes"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none
                     focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-1">Slug (optional)</label>
        <input
          {...register("slug")}
          placeholder="shoes  (leave empty to auto-generate)"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none
                     focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30"
        />
        {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
      </div>

      <button
        disabled={submitting}
        className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-md
                   hover:opacity-90 disabled:opacity-60 cursor-pointer"
      >
        {submitting ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
}
