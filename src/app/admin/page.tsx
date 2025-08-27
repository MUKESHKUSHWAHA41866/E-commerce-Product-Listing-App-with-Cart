import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddProductForm from "@/components/AddProductForm";

// ⬇️ add these
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminPage() {

    const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?next=/admin"); // send to login, then back here
  }
  
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
//     <div className="mb-4">
//         <div className="pt-6 flex justify-center gap-4">
//   <Link
//     href="/admin/categories"
//     className="inline-block rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
//   >
//     Manage Categories →
//   </Link>
//   <Link
//     href="/admin/products"
//     className="inline-block rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
//   >
//     Manage Products →
//   </Link>
// </div>

//     <div className="flex min-h-[80vh] items-center justify-center px-4">
//       <div className="w-full max-w-3xl space-y-6 text-center">
//         {/* Title */}
//         <h1 className="text-3xl font-semibold">Add Product</h1>

//         {/* Form */}
//         <AddProductForm categories={categories} />

//         {/* Manage Categories Link */}
//         {/* <div>
//           <Link
//             href="/admin/categories"
//             className="inline-block rounded-lg border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10"
//           >
//             Manage Categories →
//           </Link>
//         </div> */}
//       </div>
//     </div>
//     </div>

<div className="min-h-[80vh] px-4 flex flex-col items-center justify-start py-10">
  {/* Navigation links */}
  <div className="mb-8 flex justify-center gap-4">
    <Link
      href="/admin/categories"
      className="inline-block rounded-lg border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10"
    >
      Manage Categories →
    </Link>
    <Link
      href="/admin/products"
      className="inline-block rounded-lg border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10"
    >
      Manage Products →
    </Link>
  </div>

  {/* Form wrapper */}
  <div className="w-full max-w-3xl space-y-6 text-center">
    <h1 className="text-3xl font-semibold">Add Product</h1>
    <AddProductForm categories={categories} />
  </div>
</div>

  );
}
