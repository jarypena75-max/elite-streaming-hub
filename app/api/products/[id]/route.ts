import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import type { ProductGroup, ProductStatus } from "@prisma/client";

function parseId(raw: string) {
  return /^\d+$/.test(raw) ? Number(raw) : raw;
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return session;
}

function prismaErrorToJson(e: any) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return { message: e.message, code: e.code, meta: e.meta ?? null };
  }
  if (e instanceof Prisma.PrismaClientValidationError) {
    return { message: e.message, code: "VALIDATION_ERROR", meta: null };
  }
  return { message: String(e?.message ?? e), code: "UNKNOWN", meta: null };
}

type Ctx = { params: { id: string } | Promise<{ id: string }> };

export async function GET(_: Request, ctx: Ctx) {
  const { id: raw } = await Promise.resolve(ctx.params);
  const id = parseId(String(raw)) as any;

  try {
    const item = await prisma.product.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    console.error("GET /api/products/[id] failed:", e);
    const info = prismaErrorToJson(e);
    return NextResponse.json({ error: info.message, code: info.code, meta: info.meta }, { status: 500 });
  }
}

export async function PUT(req: Request, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: raw } = await Promise.resolve(ctx.params);
  const id = parseId(String(raw)) as any;

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

  try {
    const updated = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    console.error("PUT /api/products/[id] failed:", e);
    const info = prismaErrorToJson(e);
    if (info.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: info.message, code: info.code, meta: info.meta }, { status: 500 });
  }
}

export async function DELETE(_: Request, ctx: Ctx) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: raw } = await Promise.resolve(ctx.params);
  const id = parseId(String(raw)) as any;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("DELETE /api/products/[id] failed:", e);
    const info = prismaErrorToJson(e);
    if (info.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: info.message, code: info.code, meta: info.meta }, { status: 500 });
  }
}
