"use client";

import type { Product } from "@/lib/zod";
import { Badge } from "@/components/ui";

function statusBadge(status: Product["status"]) {
  if (status === "DISPONIBLE") return <Badge variant="ok">✅ Disponible</Badge>;
  return <Badge variant="warn">⚠️ Agotado</Badge>;
}

export function ProductCard({ product }: { product: Product }) {
  // ✅ Tu WhatsApp (solo números: +52 33 4461 4845 -> 523344614845)
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "523344614845";

  // Mensaje pro y claro
  const msg =
    `Hola 👋, quiero comprar:\n` +
    `• ${product.brand}\n` +
    `• Plan: ${product.plan}\n` +
    `• Duración: ${product.durationMonths} mes(es)\n` +
    `• Precio: $${product.priceMXN} MXN\n\n` +
    `¿Me ayudas con la entrega?`;

  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  const disabled = product.status !== "DISPONIBLE";

  return (
    <div className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-zinc-500">
            {product.category} • {product.group}
          </div>

          <h3 className="mt-1 truncate text-lg font-black tracking-tight text-zinc-900">
            {product.brand}
          </h3>

          <p className="mt-1 text-sm text-zinc-700">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>

        {statusBadge(product.status)}
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-zinc-500">Precio</div>
          <div className="text-2xl font-black text-zinc-900">
            ${product.priceMXN}{" "}
            <span className="text-sm font-semibold text-zinc-500">MXN</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/product/${product.id}`}
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
          >
            Ver
          </a>

          <a
            href={disabled ? undefined : wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={disabled}
            className={[
              "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-black transition",
              "bg-zinc-900 text-white hover:bg-zinc-800",
              "shadow-sm",
              disabled ? "pointer-events-none opacity-40" : "",
            ].join(" ")}
          >
            Comprar
          </a>
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <p className="mt-3 text-xs text-zinc-500">
        Al presionar <span className="font-semibold">Comprar</span> se abre WhatsApp con el mensaje listo.
      </p>
    </div>
  );
}