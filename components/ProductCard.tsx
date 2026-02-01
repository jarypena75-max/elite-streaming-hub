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

  // Mensaje prellenado con info del producto
  const msg = `Hola, quiero comprar ${product.brand} - ${product.plan} (${product.durationMonths} mes(es)). Precio: $${product.priceMXN} MXN.`;

  // Link correcto de WhatsApp
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const disabled = product.status !== "DISPONIBLE";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-zinc-500">
            {product.category} • {product.group}
          </div>
          <h3 className="mt-1 text-lg font-black tracking-tight">{product.brand}</h3>
          <p className="mt-1 text-sm text-zinc-700">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>
        {statusBadge(product.status)}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs font-semibold text-zinc-500">Precio</div>
          <div className="text-2xl font-black">
            ${product.priceMXN}{" "}
            <span className="text-sm font-semibold text-zinc-500">MXN</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button href={`/product/${product.id}`} variant="ghost">
            Ver
          </Button>

          {/* ✅ Comprar abre WhatsApp */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold ${
              disabled ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
