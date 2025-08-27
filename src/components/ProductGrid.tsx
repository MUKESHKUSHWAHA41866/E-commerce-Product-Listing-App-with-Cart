// import ProductCard from "./ProductCard";

// export default function ProductGrid({ products }: { products: any[] }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map((p) => (
//         <ProductCard key={p.id} p={p} />
//       ))}
//     </div>
//   );
// }


// import ProductCard from "./ProductCard";

// export default function ProductGrid({ products }: { products: any[] }) {
//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {products.map((p) => (
//         <ProductCard key={p.id} p={p} />
//       ))}
//     </div>
//   );
// }




"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  imageUrl: string;
  categoryId?: string | null;
  category?: { id: string; name: string } | null;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const { search, categoryId } = useSearchFilterStore();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);

      const matchesCategory =
        !categoryId || p.categoryId === categoryId || p.category?.id === categoryId;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryId]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-zinc-400">
        No products match your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
