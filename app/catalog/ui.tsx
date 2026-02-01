"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/zod";
import { Filters, type FiltersState } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";

export default function CatalogClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: string[];
}) {
  const [state, setState] = useState<FiltersState>({
    q: "",
    group: "ALL",
    category: "ALL",
    status: "ALL",
    sort: "NEW",
  });

  const filtered = useMemo(() => {
    const q = state.q.trim().toLowerCase();

    let items = initialProducts.filter((p) => {
      if (state.group !== "ALL" && p.group !== state.group) return false;
      if (state.category !== "ALL" && p.category !== state.category) return false;
      if (state.status !== "ALL" && p.status !== state.status) return false;

      if (q) {
        const hay = `${p.brand} ${p.plan} ${p.category} ${p.group}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    if (state.sort === "PRICE_ASC") items = items.sort((a, b) => a.priceMXN - b.priceMXN);
    if (state.sort === "PRICE_DESC") items = items.sort((a, b) => b.priceMXN - a.priceMXN);
    // NEW ya viene del server por createdAt

    return items;
  }, [initialProducts, state]);

  return (
    <div className="space-y-4">
      {/* Contenedor oscuro para filtros */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-4 shadow-sm backdrop-blur">
        <Filters state={state} categories={categories} onChange={setState} />
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-300">
        <div>
          Mostrando <span className="font-semibold text-white">{filtered.length}</span> producto(s)
        </div>

        {state.q?.trim() ? (
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
            Búsqueda: <span className="text-white">{state.q}</span>
          </div>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center shadow-sm">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl">
            🔎
          </div>
          <h3 className="mt-4 text-lg font-black text-white">Sin resultados</h3>
          <p className="mt-2 text-sm text-zinc-300">
            Prueba cambiando filtros o escribiendo otra palabra.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}