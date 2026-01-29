import { prisma } from "@/lib/prisma";
import AdminClient from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black tracking-tight">Panel Admin</h1>
        <p className="mt-2 text-zinc-600">Crea, edita o elimina productos del catálogo.</p>
      </div>

      <AdminClient initialProducts={products as any} />
    </div>
  );
}
