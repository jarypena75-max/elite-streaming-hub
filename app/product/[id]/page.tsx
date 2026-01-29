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
    <main className="mx-auto max-w-4xl p-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">{product.brand}</h1>
        <p className="mt-2 text-zinc-600">{product.category}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-4">
            <div className="text-xs font-semibold text-zinc-500">Plan</div>
            <div className="mt-1 font-semibold">{product.plan}</div>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4">
            <div className="text-xs font-semibold text-zinc-500">Grupo</div>
            <div className="mt-1 font-semibold">{product.group}</div>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4">
            <div className="text-xs font-semibold text-zinc-500">Duración</div>
            <div className="mt-1 font-semibold">{product.durationMonths} mes(es)</div>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4">
            <div className="text-xs font-semibold text-zinc-500">Precio</div>
            <div className="mt-1 text-lg font-black">${product.priceMXN} MXN</div>
          </div>
        </div>
      </div>
    </main>
  );
}
