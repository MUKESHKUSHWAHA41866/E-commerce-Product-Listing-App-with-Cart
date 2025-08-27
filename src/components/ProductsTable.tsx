"use client";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: { id: string; name: string };
};

export default function ProductsTable({ products }: { products: Product[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditValues({
      title: p.title,
      price: p.price,
      description: p.description,
      imageUrl: p.imageUrl,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = async (id: string) => {
    setBusy(id);
    const res = await fetch(`/api/products/${id}`, {
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

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setBusy(id);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Failed to delete");
      return;
    }
    window.location.reload();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.04] text-zinc-300">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-white/10">
              {/* Title */}
              <td className="px-4 py-3">
                {editingId === p.id ? (
                  <input
                    value={editValues.title || ""}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, title: e.target.value }))
                    }
                    className="w-full rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm"
                  />
                ) : (
                  p.title
                )}
              </td>

              {/* Price */}
              <td className="px-4 py-3">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editValues.price || ""}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, price: Number(e.target.value) }))
                    }
                    className="w-full rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm"
                  />
                ) : (
                  `$${p.price.toFixed(2)}`
                )}
              </td>

              {/* Category */}
              <td className="px-4 py-3 text-zinc-400">
                {p.category?.name ?? "-"}
              </td>

              {/* Image */}
              <td className="px-4 py-3">
                {editingId === p.id ? (
                  <input
                    value={editValues.imageUrl || ""}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, imageUrl: e.target.value }))
                    }
                    className="w-full rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm"
                  />
                ) : (
                  <a
                    href={p.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    View
                  </a>
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-3 text-right space-x-2">
                {editingId === p.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(p.id)}
                      disabled={busy === p.id}
                      className="rounded-lg border border-green-400/30 bg-green-500/10 px-3 py-1.5 text-green-200 hover:bg-green-500/20 disabled:opacity-50"
                    >
                      {busy === p.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded-lg border border-gray-400/30 bg-gray-500/10 px-3 py-1.5 text-gray-200 hover:bg-gray-500/20"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-blue-200 hover:bg-blue-500/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      disabled={busy === p.id}
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-red-200 hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {busy === p.id ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-zinc-400" colSpan={5}>
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
