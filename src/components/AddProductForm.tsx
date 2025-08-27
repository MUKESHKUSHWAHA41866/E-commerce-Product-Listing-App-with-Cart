// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { productCreateSchema, type ProductCreateInput } from "@/lib/validations";

// export default function AddProductForm({
//   categories,
// }: {
//   categories: { id: string; name: string }[];
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ProductCreateInput>({
//     resolver: zodResolver(productCreateSchema),
//   });

//   const onSubmit = async (data: ProductCreateInput) => {
//     await fetch("/api/products", { method: "POST", body: JSON.stringify(data) });
//     location.reload();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-md">
//       <input {...register("title")} placeholder="Title" className="w-full border rounded-xl px-3 py-2" />
//       <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} placeholder="Price" className="w-full border rounded-xl px-3 py-2" />
//       <textarea {...register("description")} placeholder="Description" className="w-full border rounded-xl px-3 py-2" />
//       <input {...register("imageUrl")} placeholder="Image URL" className="w-full border rounded-xl px-3 py-2" />
//       <select {...register("categoryId")} className="w-full border rounded-xl px-3 py-2">
//         {categories.map((c) => (
//           <option key={c.id} value={c.id}>
//             {c.name}
//           </option>
//         ))}
//       </select>
//       <button disabled={isSubmitting} className="rounded-xl border px-4 py-2">
//         Create
//       </button>
//       {Object.values(errors).length > 0 && <p className="text-red-600 text-sm">Please fix validation errors.</p>}
//     </form>
//   );
// }

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productCreateSchema, type ProductCreateInput } from "@/lib/validations";

export default function AddProductForm({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreateInput>({
    resolver: zodResolver(productCreateSchema),
  });

  const onSubmit = async (data: ProductCreateInput) => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
    location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl rounded-2xl bg-white/5 p-10 shadow-xl backdrop-blur-lg space-y-6"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200 text-left">Title</label>
        <input
          {...register("title")}
          placeholder="Product title"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30"
        />
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200 text-left">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          placeholder="e.g. 19.99"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200 text-left">Description</label>
        <textarea
          {...register("description")}
          placeholder="Product description"
          className="w-full min-h-[100px] rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200 text-left">Image URL</label>
        <input
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200 text-left">Category</label>
        <select
          {...register("categoryId")}
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-md hover:opacity-90 cursor-pointer"
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
