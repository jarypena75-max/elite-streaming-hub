"use client";

import type { Product } from "@/lib/zod";
import { Badge, Button, cn } from "@/components/ui";

export function ProductCard({ product }: { product: Product }) {
  const phone = "523344614845";
  const msg = `Hola, me interesa el ${product.group === 'PERFILES' ? 'Perfil' : 'Cuenta Completa'} de ${product.brand} (${product.plan}).`;
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  const isAvailable = product.status === "DISPONIBLE";

  return (
    <div className="group relative flex flex-col rounded-[32px] border border-zinc-100 bg-white p-4 shadow-sm transition-all hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2">
      {/* Estatus y Categoría */}
      <div className="flex items-center justify-between px-2 pt-2">
        <Badge variant={isAvailable ? "ok" : "warn"}>
          {isAvailable ? "En Stock" : "Agotado"}
        </Badge>
        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">
          {product.category}
        </span>
      </div>

      <div className="flex-1 p-6">
        {/* Selector de Tipo (Visualizador de Grupo) */}
        <div className="mb-4 inline-flex rounded-xl bg-zinc-50 p-1">
          <div className={cn(
            "rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-tight transition-all",
            product.group === "PERFILES" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400"
          )}>
            Perfil
          </div>
          <div className={cn(
            "rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-tight transition-all",
            product.group === "CUENTAS_COMPLETAS" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400"
          )}>
            Cuentas
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest">Streaming Premium</p>
          <h3 className="text-3xl font-black tracking-tighter text-zinc-900 leading-tight">
            {product.brand}
          </h3>
          <p className="text-sm font-medium text-zinc-400 italic">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-bold text-zinc-400">$</span>
            <span className="text-5xl font-black tracking-tighter text-zinc-900">
              {product.priceMXN}
            </span>
            <span className="text-xs font-bold text-zinc-400 ml-1 uppercase">mxn</span>
          </div>
        </div>
      </div>

      {/* Acciones principales */}
      <div className="space-y-2 mt-4">
        {isAvailable ? (
          <Button 
            href={wa} 
            variant="success" 
            className="w-full rounded-2xl py-4 shadow-emerald-200/50"
          >
            <span className="mr-2">⚡</span> Comprar Ahora
          </Button>
        ) : (
          <div className="w-full py-4 text-center rounded-2xl bg-zinc-50 text-zinc-400 text-sm font-bold border border-dashed border-zinc-200">
            Producto Agotado
          </div>
        )}
        
        <Button 
          href={`/product/${product.id}`} 
          variant="ghost" 
          className="w-full rounded-2xl py-4 text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          Ver todos los detalles
        </Button>
      </div>
    </div>
  );
}