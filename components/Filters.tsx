"use client";

export function Filters({ state, categories, onChange }: any) {
  const inputBase = "w-full rounded-2xl border-none bg-zinc-100 px-5 py-3.5 text-sm font-bold text-zinc-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-zinc-900/5";

  return (
    <div className="rounded-[32px] bg-zinc-50 p-8 mb-12 shadow-inner border border-zinc-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            value={state.q}
            onChange={(e) => onChange({ ...state, q: e.target.value })}
            placeholder="¿Qué servicio buscas?"
            className={inputBase}
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={state.category} 
            onChange={(e) => onChange({...state, category: e.target.value})}
            className={`${inputBase} w-auto min-w-[140px] appearance-none cursor-pointer`}
          >
            <option value="ALL">Categorías</option>
            {categories.map((c: string) => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            onClick={() => onChange({ q: "", group: "ALL", category: "ALL", status: "ALL", sort: "NEW" })}
            className="aspect-square h-[52px] rounded-2xl bg-white text-zinc-400 hover:text-zinc-900 shadow-sm flex items-center justify-center transition-all"
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  );
}