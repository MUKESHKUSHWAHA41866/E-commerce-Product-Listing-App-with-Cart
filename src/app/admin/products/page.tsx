// import { prisma } from "@/lib/prisma";
// import ProductsTable from "@/components/ProductsTable";

// export default async function AdminProductsPage() {
//   const products = await prisma.product.findMany({
//     include: { category: true },
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <div className="flex min-h-[80vh] flex-col items-center justify-start px-4 py-8">
//       <h1 className="mb-6 text-3xl font-semibold">Manage Products</h1>
//       <div className="w-full max-w-6xl">
//         <ProductsTable products={products} />
//       </div>
//     </div>
//   );
// }



import { prisma } from "@/lib/prisma";
import ProductsCards from "@/components/ProductsCards";
// ⬇️ add these
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";


export default async function AdminProductsPage() {
    // ⬇️ protect admin route
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?next=/admin/products");
  }
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-start px-4 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Manage Products</h1>
      <div className="w-full max-w-7xl">
        <ProductsCards products={products as any} categories={categories as any} />
      </div>
    </div>
  );
}

