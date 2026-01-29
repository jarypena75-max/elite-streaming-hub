"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/zod";
import { Filters, type FiltersState } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";

export default function CatalogClient({ initialProducts, categories }: { initialProducts: Product[]; categories: string[] }) {
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
      <Filters state={state} categories={categories} onChange={setState} />
      <div className="text-sm text-zinc-600">
        Mostrando <span className="font-semibold">{filtered.length}</span> producto(s)
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
