"use client";

import type { Product } from "@/lib/zod";
import { Badge, Button } from "@/components/ui";

function statusBadge(status: Product["status"]) {
  if (status === "DISPONIBLE") return <Badge variant="ok">✅ Disponible</Badge>;
  return <Badge variant="warn">⚠️ Agotado</Badge>;
}

export function ProductCard({ product }: { product: Product }) {
  // ✅ Tu WhatsApp (solo números)
  const phone = "523344614845";

  const msg = `Hola, quiero comprar ${product.brand} - ${product.plan} (${product.durationMonths} mes(es)). Precio: $${product.priceMXN} MXN.`;
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const disabled = product.status !== "DISPONIBLE";

  return (
    <div className="group rounded-3xl border border-white/10 bg-zinc-950 p-5 shadow-sm transition hover:border-white/20 hover:bg-zinc-950/90">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
              {product.category}
            </span>
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
              {product.group}
            </span>
          </div>

          <h3 className="mt-3 truncate text-lg font-black tracking-tight text-white">
            {product.brand}
          </h3>

          <p className="mt-1 truncate text-sm text-zinc-300">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>

        <div className="shrink-0">{statusBadge(product.status)}</div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-zinc-400">Precio</div>
          <div className="mt-1 text-2xl font-black text-white">
            ${product.priceMXN}{" "}
            <span className="text-sm font-semibold text-zinc-400">MXN</span>
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
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-extrabold text-white shadow-sm transition
              ${disabled ? "pointer-events-none opacity-50" : "bg-emerald-500/90 hover:bg-emerald-500"}
            `}
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}