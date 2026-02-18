"use client";

import type { Product } from "@/lib/zod";
import { Badge, Button } from "@/components/ui";

function statusBadge(status: Product["status"]) {
  if (status === "DISPONIBLE") return <Badge variant="ok">✅ Disponible</Badge>;
  return <Badge variant="warn">⚠️ Agotado</Badge>;
}

export function ProductCard({ product }: { product: Product }) {
  const phone = "523344614845"; // solo números

  const msg = `Hola, quiero comprar ${product.brand} - ${product.plan} (${product.durationMonths} mes(es)). Precio: $${product.priceMXN} MXN.`;
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const disabled = product.status !== "DISPONIBLE";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/30 p-6 shadow-lg transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_25px_70px_-45px_rgba(0,0,0,0.8)] m-4">
      {/* Glow premium al hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-20 left-1/2 h-60 w-[30rem] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute -bottom-24 right-[-6rem] h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
              {product.category}
            </span>
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
              {product.group}
            </span>
          </div>

          <h3 className="mt-3 truncate text-xl font-black tracking-tight text-white">
            {product.brand}
          </h3>

          <p className="mt-1 truncate text-sm text-zinc-300">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>

        <div className="shrink-0">{statusBadge(product.status)}</div>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-zinc-200">Precio</div>

          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-4xl font-black tracking-tight text-white drop-shadow-[0_6px_20px_rgba(255,255,255,0.35)]">
              ${product.priceMXN}
            </div>
            <div className="text-sm font-bold text-zinc-200">MXN</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button href={`/product/${product.id}`} variant="ghost">
            Ver
          </Button>

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-extrabold text-white shadow-sm transition",
              disabled
                ? "pointer-events-none opacity-50 bg-emerald-500/40"
                : "bg-emerald-500/90 hover:bg-emerald-500 hover:shadow-[0_18px_60px_-25px_rgba(16,185,129,0.8)]",
            ].join(" ")}
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
