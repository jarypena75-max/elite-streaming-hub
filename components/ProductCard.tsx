"use client";

import Link from "next/link";
import type { Product } from "@/lib/zod";
import { Badge, Button } from "@/components/ui";
import { whatsappUrl } from "@/lib/whatsapp";

function statusBadge(status: Product["status"]) {
  if (status === "DISPONIBLE") return <Badge variant="ok">✅ Disponible</Badge>;
  return <Badge variant="warn">⚠️ Agotado</Badge>;
}

export function ProductCard({ product }: { product: Product }) {
  const wa = whatsappUrl(product);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-zinc-500">{product.category} • {product.group}</div>
          <h3 className="mt-1 text-lg font-black tracking-tight">{product.brand}</h3>
          <p className="mt-1 text-sm text-zinc-700">{product.plan} • {product.durationMonths} mes(es)</p>
        </div>
        {statusBadge(product.status)}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs font-semibold text-zinc-500">Precio</div>
          <div className="text-2xl font-black">${product.priceMXN} <span className="text-sm font-semibold text-zinc-500">MXN</span></div>
        </div>
        <div className="flex gap-2">
          <Button href={`/product/${product.id}`} variant="ghost">Ver</Button>
          <Button
            onClick={() => { if (wa) window.open(wa, "_blank", "noopener,noreferrer"); }}
            disabled={product.status !== "DISPONIBLE" || !wa}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
