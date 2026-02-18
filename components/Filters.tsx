"use client";

import type { ProductGroup, ProductStatus } from "@prisma/client";

// Este "export" es lo que Vercel no encontraba
export type FiltersState = {
  q: string;
  group: ProductGroup | "ALL";
  category: string | "ALL";
  status: ProductStatus | "ALL";
  sort: "NEW" | "PRICE_ASC" | "PRICE_DESC";
};

export function Filters({
  state,
  categories,
  onChange,
}: {
  state: FiltersState;
  categories: string[];
  onChange: (next: FiltersState) => void;
}) {
  const pillBase = "h-12 rounded-full border-none bg-zinc-100 px-6 text-sm font-bold text-zinc-600 transition-all focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none appearance-none cursor-pointer shadow-sm";

  return (
    <div className="rounded-[40px] bg-zinc-50 p-8 mb-10 border border-zinc-100">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">🔎</span>
          <input
            value={state.q}
            onChange={(e) => onChange({ ...state, q: e.target.value })}
            placeholder="¿Qué servicio buscas?"
            className="w-full h-14 rounded-full border-none bg-white px-12 text-sm font-bold shadow-sm placeholder:text-zinc-300 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <select 
            value={state.group} 
            onChange={(e) => onChange({...state, group: e.target.value as any})}
            className={pillBase}
          >
            <option value="ALL">Todo</option>
            <option value="PERFILES">Perfiles</option>
            <option value="CUENTAS_COMPLETAS">Cuentas</option>
          </select>

          <select 
            value={state.category} 
            onChange={(e) => onChange({...state, category: e.target.value})}
            className={pillBase}
          >
            <option value="ALL">Categorías</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            type="button"
            onClick={() => onChange({ q: "", group: "ALL", category: "ALL", status: "ALL", sort: "NEW" })}
            className="h-12 w-12 rounded-full bg-white text-zinc-400 hover:text-rose-500 transition-colors shadow-sm flex items-center justify-center text-xl border border-zinc-100"
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  );
}