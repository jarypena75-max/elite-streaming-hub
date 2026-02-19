"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveProduct(data: any) {
  const { id, ...payload } = data;

  const productData = {
    ...payload,
    priceMXN: Number(payload.priceMXN),
    durationMonths: Number(payload.durationMonths),
    description: payload.description, // SE GUARDA EL TEXTO CON EMOJIS
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data: productData,
    });
  } else {
    await prisma.product.create({
      data: productData,
    });
  }

  revalidatePath("/catalog");
  revalidatePath("/admin");
}