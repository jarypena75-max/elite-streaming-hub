import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ProductGroup, ProductStatus } from "@prisma/client";

export async function GET() {
  const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const data = {
    group: body.group as ProductGroup,
    category: String(body.category ?? "").trim(),
    brand: String(body.brand ?? "").trim(),
    plan: String(body.plan ?? "").trim(),
    durationMonths: Number(body.durationMonths ?? 1),
    priceMXN: Number(body.priceMXN ?? 0),
    status: body.status as ProductStatus,
  };

  if (!data.category || !data.brand || !data.plan) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const created = await prisma.product.create({ data });
  return NextResponse.json(created, { status: 201 });
}
