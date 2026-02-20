import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseId(raw: string) {
  return /^\d+$/.test(raw) ? Number(raw) : raw;
}

export default async function ProductDetail({ params }: { params: { id?: string } }) {
  const raw = params?.id;
  if (!raw) return notFound();

  const id = parseId(String(raw)) as any;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-4xl p-4 md:p-6 min-h-screen">
      {/* Contenedor: Ajustamos el redondeado y padding para móvil (p-6) y desktop (md:p-12) */}
      <div className="rounded-[32px] md:rounded-[40px] border border-zinc-100 bg-white p-6 md:p-12 shadow-sm">
        
        {/* Encabezado: Texto más pequeño en móvil (text-3xl) y grande en desktop (md:text-5xl) */}
        <div className="mb-6 md:mb-8 text-left">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-emerald-500">
            Detalles del Servicio
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 mt-2 leading-tight">
            {product.brand}
          </h1>
          <p className="text-zinc-400 font-medium italic mt-1 text-sm md:text-lg">
            {product.plan} • {product.durationMonths} mes(es)
          </p>
        </div>

        {/* Grid de Información: 2 columnas en móvil y 4 en desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Precio</div>
            <div className="mt-1 text-xl md:text-2xl font-black text-zinc-900">${product.priceMXN}</div>
          </div>
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Grupo</div>
            <div className="mt-1 text-[11px] md:text-sm font-bold text-zinc-700 truncate">{product.group}</div>
          </div>
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100 text-center sm:text-left">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Categoría</div>
            <div className="mt-1 text-[11px] md:text-sm font-bold text-zinc-700 truncate">{product.category}</div>
          </div>
          <div className="rounded-2xl md:rounded-3xl bg-zinc-50 p-4 md:p-6 border border-zinc-100">
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Estado</div>
            <div className="mt-1 text-[11px] md:text-sm font-bold text-emerald-600 uppercase">{product.status}</div>
          </div>
        </div>

        {/* SECCIÓN DE DESCRIPCIÓN: Padding reducido en móvil para ganar espacio */}
        <div className="space-y-4 border-t border-zinc-100 pt-6 md:pt-8">
          <h2 className="text-lg font-black text-zinc-900 flex items-center gap-2">
            <span className="bg-zinc-900 text-white px-2 py-1 rounded-lg text-[10px] font-bold">INFO</span>
            Instrucciones
          </h2>
          
          <div className="rounded-[24px] md:rounded-[32px] bg-zinc-50 p-5 md:p-8 border border-zinc-50">
            {product.description ? (
              <p className="whitespace-pre-wrap text-zinc-600 leading-relaxed text-sm md:text-base font-medium">
                {product.description}
              </p>
            ) : (
              <p className="text-zinc-400 italic text-sm">Sin detalles adicionales registrados.</p>
            )}
          </div>
        </div>

        {/* Botón de WhatsApp: Siempre ancho completo y fácil de presionar en celular */}
        <div className="mt-8 md:mt-12">
          <a 
            href={`https://wa.me/523344614845?text=Hola, me interesa ${product.brand} (${product.plan})`}
            className="block w-full text-center rounded-2xl bg-emerald-500 py-5 md:py-6 font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 text-base md:text-xl active:scale-[0.98]"
          >
            Adquirir por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}