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
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* HERO PREMIUM */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute -bottom-24 right-[-8rem] h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950/70" />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                ⚡ Acceso inmediato · Soporte rápido
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-white">
                Elite Streaming Hub
              </h1>

              <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-300">
                Servicios verificados. Compra en segundos y abre WhatsApp con el mensaje listo.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="#catalogo"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-zinc-950 hover:bg-zinc-100"
                >
                  Ver catálogo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Cómo funciona
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Entrega inmediata", "Pago fácil", "Soporte por WhatsApp"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
              <p className="font-semibold text-white">Modo</p>
              <p className="mt-1">
                {isReseller ? "Revendedor" : "Cliente"} · Precios actualizados
              </p>

              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
                Tip: busca “Netflix”, “HBO”, “Disney+”…
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO CON MÁS CONTRASTE */}
      <section
        id="catalogo"
        className="rounded-3xl border border-white/40 bg-white/80 backdrop-blur-lg shadow-[0_25px_70px_-45px_rgba(0,0,0,0.35)] p-6 sm:p-8"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight text-zinc-900">Catálogo</h2>
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
            {isReseller ? "Revendedor" : "Cliente"}
          </span>
        </div>

        <CatalogClient initialProducts={products as any} categories={categories} />
      </section>
    </div>
  );
}
