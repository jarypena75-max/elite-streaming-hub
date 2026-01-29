"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function ResellerRegister() {
  const [name, setName] = useState("Revendedor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await fetch("/api/reseller/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setErr(data?.error ?? "No se pudo crear la cuenta.");
      return;
    }

    const login = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (login?.error) {
      setErr("Cuenta creada. Ahora inicia sesión desde Acceso.");
      return;
    }

    window.location.href = "/reseller/dashboard";
  }

  return (
    <main className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black">Crear cuenta de revendedor</h1>
        <p className="mt-2 text-zinc-600 text-sm">Crea tu cuenta para acceder al panel.</p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label className="text-xs font-semibold text-zinc-600">Nombre</label>
            <input
              className="mt-1 w-full rounded-2xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600">Email</label>
            <input
              className="mt-1 w-full rounded-2xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-600">Contraseña (mín 6)</label>
            <input
              className="mt-1 w-full rounded-2xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          {err && <div className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{err}</div>}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </main>
  );
}
