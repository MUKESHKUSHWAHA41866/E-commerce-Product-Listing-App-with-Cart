import { prisma } from "@/lib/prisma";
import AddCategoryForm from "@/components/AddCategoryForm";
import CategoriesList from "@/components/CategoriesList";
// ⬇️ add these
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CategoriesAdminPage() {
    // protect: only admins
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?next=/admin/categories");
  }
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-start px-4 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Manage Categories</h1>
      <AddCategoryForm />
      <div className="w-full max-w-4xl">
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
}
