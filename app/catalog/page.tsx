import { prisma } from "@/lib/prisma";
import CatalogClient from "./ui";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ mode?: string }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const isReseller = sp.mode === "reseller";

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-8 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              {isReseller ? "Catálogo para Revendedores" : "Catálogo"}
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-600">
              Elige un servicio, revisa disponibilidad y presiona{" "}
              <span className="font-semibold">Comprar</span> para abrir WhatsApp con el mensaje listo.
            </p>
          </div>

          <div className="text-sm text-zinc-600">
            Modo:{" "}
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-semibold text-zinc-800">
              {isReseller ? "Revendedor" : "Cliente"}
            </span>
          </div>
        </div>
      </div>

      <CatalogClient initialProducts={products as any} categories={categories} />
    </div>
  );
}
