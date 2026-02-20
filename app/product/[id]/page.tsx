import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Función para manejar IDs numéricos o strings (CUID)
function parseId(raw: string) {
  return /^\d+$/.test(raw) ? Number(raw) : raw;
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // 1. Resolvemos la promesa de params para evitar el error de compilación
  const resolvedParams = await params;
  const rawId = resolvedParams?.id;

  if (!rawId) return notFound();

  const id = parseId(String(rawId));

  // 2. Buscamos el producto en la base de datos
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-4xl p-4 md:p-6 min-h-screen">
      {/* Contenedor Principal estilo Premium */}
      <div className="rounded-[32px] md:rounded-[40px] border border-zinc-100 bg-white p-6 md:p-12 shadow-sm">
        
        {/* Encabezado con Marca y Plan */}
        <div className="mb-8 text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
            Detalles del Servicio
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 mt-2 leading-tight">
            {product.brand}
          </h1>
          <p className="text-zinc-400 font-medium italic mt-1 text-sm md:text-lg">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>

        {/* Grid de Información Rápida (Adaptado a móvil) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10 text-left">
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Precio</div>
            <div className="mt-1 text-xl md:text-2xl font-black text-zinc-900">${product.priceMXN}</div>
          </div>
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Grupo</div>
            <div className="mt-1 text-xs md:text-sm font-bold text-zinc-700">{product.group}</div>
          </div>
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Categoría</div>
            <div className="mt-1 text-xs md:text-sm font-bold text-zinc-700">{product.category}</div>
          </div>
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Estado</div>
            <div className="mt-1 text-xs md:text-sm font-bold text-emerald-600 uppercase">{product.status}</div>
          </div>
        </div>

        {/* Botón de Compra Final */}
        <div className="mt-8 md:mt-12">
          <a 
            href={`https://wa.me/523344614845?text=Hola, me interesa el servicio de ${product.brand} (${product.plan})`}
            className="block w-full text-center rounded-[20px] md:rounded-[24px] bg-emerald-500 py-5 md:py-6 font-bold text-white hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 text-lg md:text-xl active:scale-[0.98]"
          >
            Adquirir por WhatsApp ahora
          </a>
        </div>
      </div>
    </main>
  );
}