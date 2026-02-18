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

    return items;
  }, [initialProducts, state]);

  return (
    <div className="space-y-5">
      {/* Filtros estilo premium */}
      <div className="rounded-3xl border border-zinc-200 bg-white/85 backdrop-blur p-4 shadow-sm">
        <Filters state={state} categories={categories} onChange={setState} />
      </div>

      {/* Barra de info */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-zinc-600">
        <span>
          Mostrando <b className="text-zinc-900">{filtered.length}</b> resultado(s)
        </span>

        <div className="flex flex-wrap gap-2">
          {state.q.trim() ? (
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold">
              🔎 {state.q}
            </span>
          ) : null}
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold">
            ⭐ Premium
          </span>
        </div>
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl">
            🔎
          </div>
          <h3 className="mt-4 text-lg font-black text-zinc-900">Sin resultados</h3>
          <p className="mt-2 text-sm text-zinc-600">
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
