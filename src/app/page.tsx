 



import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import FadeUp from "@/components/FadeUp";

export default async function Page() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-8">
      <FadeUp as="header" className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Browse, filter, and add items to your cart.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.1} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar />
        <div className="sm:ml-auto">
          <CategoryFilter categories={categories} />
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <ProductGrid products={products} />
      </FadeUp>
    </div>
  );
}
