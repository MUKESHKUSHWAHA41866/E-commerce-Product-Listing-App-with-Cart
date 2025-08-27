// "use client";
// import Image from "next/image";
// import { useState } from "react";

// type Category = { id: string; name: string };
// type Product = {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   category?: Category | null;
//   categoryId?: string; // in case you want to edit category
// };

// export default function ProductsCards({
//   products,
//   categories,
// }: {
//   products: Product[];
//   categories: Category[];
// }) {
//   const [busy, setBusy] = useState<string | null>(null);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editValues, setEditValues] = useState<Partial<Product>>({});

//   const startEdit = (p: Product) => {
//     setEditingId(p.id);
//     setEditValues({
//       title: p.title,
//       price: p.price,
//       imageUrl: p.imageUrl,
//       description: p.description,
//       categoryId: p.category?.id ?? p.categoryId ?? "",
//     });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditValues({});
//   };

//   const saveEdit = async (id: string) => {
//     setBusy(id);
//     const res = await fetch(`/api/products/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(editValues),
//     });
//     setBusy(null);
//     if (!res.ok) {
//       const j = await res.json().catch(() => ({}));
//       alert(j?.error ?? "Failed to update");
//       return;
//     }
//     setEditingId(null);
//     window.location.reload();
//   };

//   const remove = async (id: string) => {
//     if (!confirm("Delete this product?")) return;
//     setBusy(id);
//     const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
//     setBusy(null);
//     if (!res.ok) {
//       const j = await res.json().catch(() => ({}));
//       alert(j?.error ?? "Failed to delete");
//       return;
//     }
//     window.location.reload();
//   };

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
//       {products.map((p) => {
//         const isEditing = editingId === p.id;
//         return (
//           <div
//             key={p.id}
//             className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-xl backdrop-blur transition hover:border-white/20"
//           >
//             {/* Image */}
//             <div className="relative overflow-hidden rounded-2xl">
//               <div className="relative aspect-[4/3]">
//                 <Image
//                   src={isEditing ? (editValues.imageUrl || p.imageUrl) as string : p.imageUrl}
//                   alt={p.title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                 />
//               </div>
//             </div>

//             {/* Content */}
//             <div className="mt-4 space-y-3">
//               {/* Title */}
//               {isEditing ? (
//                 <input
//                   value={(editValues.title as string) ?? ""}
//                   onChange={(e) => setEditValues((v) => ({ ...v, title: e.target.value }))}
//                   className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none"
//                   placeholder="Title"
//                 />
//               ) : (
//                 <div className="text-[15px] font-semibold">{p.title}</div>
//               )}

//               {/* Description */}
//               {isEditing ? (
//                 <textarea
//                   value={(editValues.description as string) ?? ""}
//                   onChange={(e) =>
//                     setEditValues((v) => ({ ...v, description: e.target.value }))
//                   }
//                   className="w-full min-h-24 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none"
//                   placeholder="Description"
//                 />
//               ) : (
//                 <div className="text-sm text-zinc-400 line-clamp-2">{p.description}</div>
//               )}

//               {/* Category */}
//               {isEditing ? (
//                 <select
//                   value={(editValues.categoryId as string) ?? ""}
//                   onChange={(e) => setEditValues((v) => ({ ...v, categoryId: e.target.value }))}
//                   className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none"
//                 >
//                   <option value="" disabled>
//                     Select category
//                   </option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <div className="text-xs text-zinc-400">
//                   {p.category?.name ? `Category: ${p.category.name}` : "No category"}
//                 </div>
//               )}

//               {/* Price */}
//               {isEditing ? (
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={(editValues.price as number | string) ?? ""}
//                   onChange={(e) =>
//                     setEditValues((v) => ({ ...v, price: Number(e.target.value) }))
//                   }
//                   className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm outline-none"
//                   placeholder="Price"
//                 />
//               ) : (
//                 <div className="font-semibold">$ {Number(p.price).toFixed(2)}</div>
//               )}

//               {/* Actions */}
//               <div className="mt-2 flex items-center justify-end gap-2">
//                 {isEditing ? (
//                   <>
//                     <button
//                       onClick={() => saveEdit(p.id)}
//                       disabled={busy === p.id}
//                       className="rounded-lg border border-green-400/30 bg-green-500/10 px-3 py-1.5 text-sm text-green-200 hover:bg-green-500/20 disabled:opacity-50"
//                     >
//                       {busy === p.id ? "Saving..." : "Save"}
//                     </button>
//                     <button
//                       onClick={cancelEdit}
//                       className="rounded-lg border border-gray-400/30 bg-gray-500/10 px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-500/20"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => startEdit(p)}
//                       className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-200 hover:bg-blue-500/20"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => remove(p.id)}
//                       disabled={busy === p.id}
//                       className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/20 disabled:opacity-50"
//                     >
//                       {busy === p.id ? "Deleting..." : "Delete"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       {products.length === 0 && (
//         <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-zinc-400">
//           No products yet.
//         </div>
//       )}
//     </div>
//   );
// }





"use client";
import Image from "next/image";
import { useState } from "react";
import ProductEditModal from "./ProductEditModal";

type Category = { id: string; name: string };
type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: Category | null;
};

export default function ProductsCards({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [modalOpenId, setModalOpenId] = useState<string | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Failed to delete");
      return;
    }
    window.location.reload();
  };

  const currentProduct =
    modalOpenId ? products.find((p) => p.id === modalOpenId) ?? null : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-xl backdrop-blur transition hover:border-white/20"
          >
            {/* image */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* content */}
            <div className="mt-4 space-y-2">
              <div className="text-[15px] font-semibold">{p.title}</div>
              <div className="text-sm text-zinc-400 line-clamp-2">
                {p.description}
              </div>
              <div className="text-xs text-zinc-400">
                {p.category?.name ? `Category: ${p.category.name}` : "No category"}
              </div>
              <div className="mt-2 font-semibold">$ {Number(p.price).toFixed(2)}</div>
            </div>

            {/* actions */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setModalOpenId(p.id)}
                className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-200 hover:bg-blue-500/20 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p.id)}
                className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/20 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-zinc-400">
            No products yet.
          </div>
        )}
      </div>

      {/* modal */}
      {currentProduct && (
        <ProductEditModal
          open={!!modalOpenId}
          onClose={() => setModalOpenId(null)}
          product={currentProduct}
          categories={categories}
          onSaved={() => window.location.reload()}
        />
      )}
    </>
  );
}
