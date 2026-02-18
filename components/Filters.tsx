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
  const inputBase =
    "w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 " +
    "focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/70";

  const selectBase =
    "w-full rounded-2xl border border-zinc-200 bg-white/80 px-3 py-2.5 text-sm outline-none transition " +
    "focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/70";

  return (
    <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-4 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.35)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-black tracking-tight text-zinc-900">Filtros</p>
          <p className="text-xs text-zinc-600">Encuentra rápido el servicio ideal.</p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              q: "",
              group: "ALL",
              category: "ALL",
              status: "ALL",
              sort: "NEW",
            })
          }
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        <div className="relative md:col-span-2">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            🔎
          </span>
          <input
            value={state.q}
            onChange={(e) => onChange({ ...state, q: e.target.value })}
            placeholder="Buscar (Netflix, HBO, Disney...)"
            className={`${inputBase} pl-9`}
          />
        </div>

        <select
          value={state.group}
          onChange={(e) => onChange({ ...state, group: e.target.value as any })}
          className={selectBase}
        >
          <option value="ALL">Todos los grupos</option>
          <option value="PERFILES">Perfiles</option>
          <option value="CUENTAS_COMPLETAS">Cuentas completas</option>
        </select>

        <select
          value={state.category}
          onChange={(e) => onChange({ ...state, category: e.target.value })}
          className={selectBase}
        >
          <option value="ALL">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          <select
            value={state.status}
            onChange={(e) => onChange({ ...state, status: e.target.value as any })}
            className={selectBase}
          >
            <option value="ALL">Cualquier estado</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="AGOTADO">Agotado</option>
          </select>

          <select
            value={state.sort}
            onChange={(e) => onChange({ ...state, sort: e.target.value as any })}
            className={selectBase}
          >
            <option value="NEW">Más nuevos</option>
            <option value="PRICE_ASC">Precio: menor a mayor</option>
            <option value="PRICE_DESC">Precio: mayor a menor</option>
          </select>
        </div>
      </div>
    </div>
  );
}
