// "use client";
// import { useState } from "react";

// type Cat = { id: string; name: string; slug: string };

// export default function CategoriesList({ categories }: { categories: Cat[] }) {
//   const [busy, setBusy] = useState<string | null>(null);

//   const remove = async (id: string) => {
//     if (!confirm("Delete this category?")) return;
//     setBusy(id);
//     const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
//     setBusy(null);
//     if (!res.ok) {
//       const j = await res.json().catch(() => ({}));
//       alert(j?.error ?? "Failed to delete");
//       return;
//     }
//     window.location.reload();
//   };

//   return (
//     <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
//       <table className="w-full text-sm">
//         <thead className="bg-white/[0.04] text-zinc-300">
//           <tr>
//             <th className="px-4 py-3 text-left">Name</th>
//             <th className="px-4 py-3 text-left">Slug</th>
//             <th className="px-4 py-3 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((c) => (
//             <tr key={c.id} className="border-t border-white/10">
//               <td className="px-4 py-3">{c.name}</td>
//               <td className="px-4 py-3 text-zinc-400">{c.slug}</td>
//               <td className="px-4 py-3 text-right">
//                 <button
//                   onClick={() => remove(c.id)}
//                   disabled={busy === c.id}
//                   className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-red-200 hover:bg-red-500/20 disabled:opacity-50"
//                 >
//                   {busy === c.id ? "Deleting..." : "Delete"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {categories.length === 0 && (
//             <tr>
//               <td className="px-4 py-6 text-center text-zinc-400" colSpan={3}>
//                 No categories yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




"use client";
import { useState } from "react";

type Cat = { id: string; name: string; slug: string };

export default function CategoriesList({ categories }: { categories: Cat[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; slug: string }>({
    name: "",
    slug: "",
  });

  const remove = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    setBusy(id);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Failed to delete");
      return;
    }
    window.location.reload();
  };

  const startEdit = (cat: Cat) => {
    setEditingId(cat.id);
    setEditValues({ name: cat.name, slug: cat.slug });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", slug: "" });
  };

  const saveEdit = async (id: string) => {
    setBusy(id);
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(editValues),
    });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Failed to update");
      return;
    }
    setEditingId(null);
    window.location.reload();
  };

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.04] text-zinc-300">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Slug</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-t border-white/10">
              <td className="px-4 py-3">
                {editingId === c.id ? (
                  <input
                    value={editValues.name}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, name: e.target.value }))
                    }
                    className="w-full rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm"
                  />
                ) : (
                  c.name
                )}
              </td>
              <td className="px-4 py-3 text-zinc-400">
                {editingId === c.id ? (
                  <input
                    value={editValues.slug}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, slug: e.target.value }))
                    }
                    className="w-full rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm"
                  />
                ) : (
                  c.slug
                )}
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(c.id)}
                      disabled={busy === c.id}
                      className="rounded-lg border border-green-400/30 bg-green-500/10 px-3 py-1.5 text-green-200 hover:bg-green-500/20 disabled:opacity-50 cursor-pointer"
                    >
                      {busy === c.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded-lg border border-gray-400/30 bg-gray-500/10 px-3 py-1.5 text-gray-200 hover:bg-gray-500/20 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(c)}
                      className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-blue-200 hover:bg-blue-500/20 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(c.id)}
                      disabled={busy === c.id}
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-red-200 hover:bg-red-500/20 disabled:opacity-50 cursor-pointer"
                    >
                      {busy === c.id ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-zinc-400" colSpan={3}>
                No categories yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
