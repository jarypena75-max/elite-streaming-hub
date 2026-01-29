"use client";

import type { ProductGroup, ProductStatus } from "@prisma/client";

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
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-5">
        <input
          value={state.q}
          onChange={(e) => onChange({ ...state, q: e.target.value })}
          placeholder="Buscar (Netflix, HBO, Disney...)"
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
        />

        <select
          value={state.group}
          onChange={(e) => onChange({ ...state, group: e.target.value as any })}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="ALL">Todos los grupos</option>
          <option value="PERFILES">Perfiles</option>
          <option value="CUENTAS_COMPLETAS">Cuentas completas</option>
        </select>

        <select
          value={state.category}
          onChange={(e) => onChange({ ...state, category: e.target.value })}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="ALL">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={state.status}
          onChange={(e) => onChange({ ...state, status: e.target.value as any })}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="ALL">Cualquier estado</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="AGOTADO">Agotado</option>
        </select>

        <select
          value={state.sort}
          onChange={(e) => onChange({ ...state, sort: e.target.value as any })}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="NEW">Más nuevos</option>
          <option value="PRICE_ASC">Precio: menor a mayor</option>
          <option value="PRICE_DESC">Precio: mayor a menor</option>
        </select>
      </div>
    </div>
  );
}
