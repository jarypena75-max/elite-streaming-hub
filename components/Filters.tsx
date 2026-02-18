"use client";

import type { ProductGroup, ProductStatus } from "@prisma/client";

export type FiltersState = {
  q: string;
  group: ProductGroup | "ALL";
  category: string | "ALL";
  status: ProductStatus | "ALL";
  sort: "NEW" | "PRICE_ASC" | "PRICE_DESC";
};

export function Filters({ state, categories, onChange }: { 
  state: FiltersState; 
  categories: string[]; 
  onChange: (next: FiltersState) => void; 
}) {
  const inputBase = "w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10";
  
  return (
    <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-zinc-780 uppercase tracking-wide">Filtros</h2>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Personaliza tu búsqueda.</p>
        </div>

        <button
          type="button"
          onClick={() => onChange({ q: "", group: "ALL", category: "ALL", status: "ALL", sort: "NEW" })}
          className="rounded-xl bg-[#a855f7] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#9333ea] transition-all shadow-md active:scale-95"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="relative md:col-span-2">
          <input
            value={state.q}
            onChange={(e) => onChange({ ...state, q: e.target.value })}
            placeholder="Buscar servicio..."
            className={inputBase}
          />
        </div>

        <select 
          value={state.group} 
          onChange={(e) => onChange({...state, group: e.target.value as any})}
          className={`${inputBase} cursor-pointer`}
        >
          <option value="ALL">Todos los grupos</option>
          <option value="PERFILES">Perfiles</option>
          <option value="CUENTAS_COMPLETAS">Cuentas</option>
        </select>

        <select 
          value={state.category} 
          onChange={(e) => onChange({...state, category: e.target.value})}
          className={`${inputBase} cursor-pointer`}
        >
          <option value="ALL">Categorías</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select 
          value={state.sort} 
          onChange={(e) => onChange({...state, sort: e.target.value as any})}
          className={`${inputBase} cursor-pointer`}
        >
          <option value="NEW">Más nuevos</option>
          <option value="PRICE_ASC">Precio: bajo a alto</option>
        </select>
      </div>
    </div>
  );
}