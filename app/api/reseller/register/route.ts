import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const email = String(body.email ?? "").toLowerCase().trim();
  const password = String(body.password ?? "");
  const name = String(body.name ?? "Revendedor").trim();

  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Datos inválidos. La contraseña debe tener mínimo 6 caracteres." },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Ese email ya está registrado." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role: "RESELLER",
    },
  });

  return NextResponse.json({ ok: true });
}
