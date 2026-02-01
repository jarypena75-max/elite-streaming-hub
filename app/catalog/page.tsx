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
      {/* Fondo streaming premium */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-sm">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute -bottom-24 right-[-8rem] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950/60" />
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                ⚡
              </span>
              Catálogo Premium
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white">
              {isReseller ? "Catálogo para Revendedores" : "Catálogo"}
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
              Elige un servicio, revisa disponibilidad y presiona{" "}
              <span className="font-semibold text-white">Comprar</span> para abrir WhatsApp con el mensaje listo.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                Entrega inmediata
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                Soporte rápido
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                Pago fácil
              </span>
            </div>
          </div>

          <div className="text-sm text-zinc-300">
            Modo:{" "}
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-white">
              {isReseller ? "Revendedor" : "Cliente"}
            </span>
          </div>
        </div>
      </div>

      <CatalogClient initialProducts={products as any} categories={categories} />
    </div>
  );
}