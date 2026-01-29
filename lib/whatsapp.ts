import type { Product } from "@/lib/zod";

export function whatsappUrl(product: Product) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  const msg =
    `Hola, quiero comprar:\n` +
    `• Producto: ${product.brand}\n` +
    `• Plan: ${product.plan}\n` +
    `• Grupo: ${product.group}\n` +
    `• Categoría: ${product.category}\n` +
    `• Duración: ${product.durationMonths} mes(es)\n` +
    `• Precio: $${product.priceMXN} MXN\n` +
    `• ID: ${product.id}\n\n` +
    `¿Está disponible?`;

  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
