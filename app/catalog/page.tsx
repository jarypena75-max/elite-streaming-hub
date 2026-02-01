import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CatalogClient from "./ui";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ mode?: string }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const isReseller = sp.mode === "reseller";

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-invitart.jpg"
              alt="INVITART"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight text-zinc-900">INVITART</div>
              <div className="text-xs font-semibold text-zinc-500">Elite Streaming Hub</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/catalog"
              className="rounded-2xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
            >
              Catálogo
            </Link>
            <Link
              href="/admin"
              className="rounded-2xl bg-zinc-900 px-3 py-2 text-sm font-black text-white hover:bg-zinc-800"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-bold text-zinc-700">
                {isReseller ? "Modo Revendedor" : "Modo Cliente"}
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-900">
                {isReseller ? "Catálogo para Revendedores" : "Catálogo"}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                Elige un servicio, revisa disponibilidad y presiona{" "}
                <span className="font-semibold text-zinc-900">Comprar</span> para abrir WhatsApp con el mensaje listo.
              </p>
            </div>

            <div className="text-sm text-zinc-600">
              <span className="font-semibold text-zinc-900">Tip:</span> si abres desde celular, se abrirá WhatsApp directo.
            </div>
          </div>
        </div>

        <div className="mt-6">
          <CatalogClient initialProducts={products as any} categories={categories} />
        </div>
      </div>
    </div>
  );
}