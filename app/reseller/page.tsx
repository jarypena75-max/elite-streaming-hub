import Link from "next/link";

export default function ResellerLanding() {
  return (
    <main className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black">Área de Revendedores</h1>
        <p className="mt-2 text-zinc-600 text-sm">
          Inicia sesión desde Acceso o crea tu cuenta aquí.
        </p>

        <div className="mt-6 flex gap-3">
          <Link className="rounded-2xl bg-zinc-900 px-4 py-2 text-white font-semibold" href="/access">
            Ir a Acceso
          </Link>
          <Link className="rounded-2xl border border-zinc-200 px-4 py-2 font-semibold" href="/reseller/register">
            Crear cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
