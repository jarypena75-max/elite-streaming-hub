"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AccessPage() {
  const [mode, setMode] = useState<"ADMIN" | "RESELLER">("ADMIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setErr("Credenciales inválidas.");
      return;
    }

    window.location.href = mode === "ADMIN" ? "/admin" : "/reseller/dashboard";
  }

  return (
    <main className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black">Acceso — Elite Streaming Hub</h1>
        <p className="mt-2 text-zinc-600 text-sm">Elige tu tipo de cuenta e inicia sesión.</p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("ADMIN")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold border ${
              mode === "ADMIN" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200"
            }`}
            type="button"
          >
            Administrador
          </button>
          <button
            onClick={() => setMode("RESELLER")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold border ${
              mode === "RESELLER" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200"
            }`}
            type="button"
          >
            Revendedor
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
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
            <label className="text-xs font-semibold text-zinc-600">Contraseña</label>
            <input
              className="mt-1 w-full rounded-2xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          {err && (
            <div className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">
              {err}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-5 text-sm text-zinc-600">
          ¿No tienes cuenta de revendedor?{" "}
          <Link href="/reseller/register" className="font-semibold text-zinc-900 hover:underline">
            Crear cuenta
          </Link>
        </div>

        <div className="mt-3 text-xs text-zinc-400">
          Admin demo: admin@demo.com / admin123
        </div>
      </div>
    </main>
  );
}
