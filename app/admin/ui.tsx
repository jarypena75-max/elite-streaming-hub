"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/zod";
import { Badge, Button } from "@/components/ui";
import { signOut } from "next-auth/react";

type FormState = {
  id?: string;
  group: Product["group"];
  category: string;
  brand: string;
  plan: string;
  durationMonths: number;
  priceMXN: number;
  status: Product["status"];
};

const empty: FormState = {
  group: "PERFILES",
  category: "Streaming",
  brand: "",
  plan: "",
  durationMonths: 1,
  priceMXN: 0,
  status: "DISPONIBLE",
};

export default function AdminClient({ initialProducts }: { initialProducts: Product[] }) {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))).sort(), [items]);

  function badge(status: Product["status"]) {
    return status === "DISPONIBLE" ? <Badge variant="ok">Disponible</Badge> : <Badge variant="warn">Agotado</Badge>;
  }

  async function refresh() {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    setItems(data);
  }

  async function save() {
    setSaving(true);
    setError(null);

    try {
      const payload = {
        group: form.group,
        category: form.category,
        brand: form.brand,
        plan: form.plan,
        durationMonths: Number(form.durationMonths),
        priceMXN: Number(form.priceMXN),
        status: form.status,
      };

      const url = form.id ? `/api/products/${form.id}` : "/api/products";
      const method = form.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? `No se pudo guardar (HTTP ${res.status})`);
      }

      setForm(empty);
      await refresh();
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    setError(null);
    if (!confirm("¿Eliminar este producto?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data?.error ?? `No se pudo eliminar (HTTP ${res.status})`);
      return;
    }

    await refresh();
  }

  function edit(p: Product) {
    setForm({
      id: p.id,
      group: p.group,
      category: p.category,
      brand: p.brand,
      plan: p.plan,
      durationMonths: p.durationMonths,
      priceMXN: p.priceMXN,
      status: p.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black">Producto</h2>
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/catalog" })}>
            Salir
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-600">Grupo</label>
              <select
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value as any })}
              >
                <option value="PERFILES">Perfiles</option>
                <option value="CUENTAS_COMPLETAS">Cuentas completas</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-600">Estado</label>
              <select
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              >
                <option value="DISPONIBLE">Disponible</option>
                <option value="AGOTADO">Agotado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600">Categoría</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              list="cats"
            />
            <datalist id="cats">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600">Marca / Servicio</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="Netflix, HBO Max, Disney+..."
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600">Plan</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              placeholder="Perfil, Cuenta completa, 2 pantallas..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-600">Duración (meses)</label>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                value={form.durationMonths}
                onChange={(e) => setForm({ ...form, durationMonths: Number(e.target.value) })}
                type="number"
                min={1}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-600">Precio (MXN)</label>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                value={form.priceMXN}
                onChange={(e) => setForm({ ...form, priceMXN: Number(e.target.value) })}
                type="number"
                min={0}
              />
            </div>
          </div>

          {error && <div className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

          <div className="flex gap-2">
            <Button onClick={save} disabled={saving}>
              {saving ? "Guardando..." : form.id ? "Guardar cambios" : "Crear producto"}
            </Button>
            <Button variant="ghost" onClick={() => setForm(empty)} disabled={saving}>
              Limpiar
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black">Productos</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-zinc-500">
              <tr>
                <th className="py-2">Servicio</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Grupo</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Estado</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-zinc-200">
                  <td className="py-3">
                    <div className="font-semibold">{p.brand}</div>
                    <div className="text-xs text-zinc-500">{p.category}</div>
                  </td>
                  <td className="py-3">{p.plan}</td>
                  <td className="py-3">{p.group}</td>
                  <td className="py-3 font-semibold">${p.priceMXN}</td>
                  <td className="py-3">{badge(p.status)}</td>
                  <td className="py-3">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" onClick={() => edit(p)}>Editar</Button>
                      <Button variant="danger" onClick={() => remove(p.id)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No hay productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}