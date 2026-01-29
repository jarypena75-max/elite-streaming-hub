import { PrismaClient, ProductGroup, ProductStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@demo.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, name: "Admin", passwordHash },
  });

  // Productos (solo streaming/digital — demo)
  const products = [
    // PERFILES
    { group: "PERFILES", category: "Música", brand: "Spotify", plan: "1 mes", durationMonths: 1, priceMXN: 41, status: "AGOTADO" },
    { group: "PERFILES", category: "Streaming", brand: "Netflix", plan: "Perfil", durationMonths: 1, priceMXN: 62, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "Netflix", plan: "Perfil privado", durationMonths: 1, priceMXN: 103, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "Crunchyroll", plan: "Perfil", durationMonths: 1, priceMXN: 14, status: "AGOTADO" },
    { group: "PERFILES", category: "Streaming", brand: "Apple TV", plan: "Perfil (3 meses)", durationMonths: 3, priceMXN: 27, status: "AGOTADO" },
    { group: "PERFILES", category: "Streaming", brand: "Prime Video", plan: "Perfil", durationMonths: 1, priceMXN: 10, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "Disney+ Premium", plan: "Perfil", durationMonths: 1, priceMXN: 27, status: "AGOTADO" },
    { group: "PERFILES", category: "Streaming", brand: "HBO Max", plan: "Estándar Perfil", durationMonths: 1, priceMXN: 10, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "HBO Max", plan: "Platino Perfil", durationMonths: 1, priceMXN: 21, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "Paramount+", plan: "Perfil", durationMonths: 1, priceMXN: 7, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "Plex", plan: "Perfil", durationMonths: 1, priceMXN: 17, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Streaming", brand: "VIX+", plan: "Perfil", durationMonths: 1, priceMXN: 4, status: "DISPONIBLE" },
    { group: "PERFILES", category: "Diseño", brand: "Canva Pro", plan: "Perfil", durationMonths: 1, priceMXN: 24, status: "AGOTADO" },

    // CUENTAS COMPLETAS
    { group: "CUENTAS_COMPLETAS", category: "Música", brand: "YouTube Premium", plan: "1 mes", durationMonths: 1, priceMXN: 48, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Música", brand: "YouTube Premium", plan: "3 meses", durationMonths: 3, priceMXN: 110, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Netflix", plan: "Cuenta completa", durationMonths: 1, priceMXN: 247, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Crunchyroll", plan: "Cuenta completa", durationMonths: 1, priceMXN: 41, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Apple TV", plan: "Cuenta completa", durationMonths: 1, priceMXN: 62, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Prime Video", plan: "Cuenta completa", durationMonths: 1, priceMXN: 35, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Disney+ Estándar", plan: "Cuenta completa", durationMonths: 1, priceMXN: 41, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Disney+ Premium", plan: "2 pantallas", durationMonths: 1, priceMXN: 103, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "HBO Max", plan: "Estándar Cuenta completa", durationMonths: 1, priceMXN: 35, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "HBO Max", plan: "Platino Cuenta completa", durationMonths: 1, priceMXN: 96, status: "AGOTADO" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Paramount+", plan: "Cuenta completa", durationMonths: 1, priceMXN: 21, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Streaming", brand: "Plex", plan: "Cuenta completa", durationMonths: 1, priceMXN: 35, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "TV / IPTV", brand: "IPTV Smarters Pro", plan: "1 mes", durationMonths: 1, priceMXN: 27, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Diseño", brand: "Canva", plan: "Año completo (cuenta)", durationMonths: 12, priceMXN: 55, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Otros", brand: "VIX+", plan: "Mes completo", durationMonths: 1, priceMXN: 14, status: "DISPONIBLE" },
    { group: "CUENTAS_COMPLETAS", category: "Otros", brand: "VIX+", plan: "2 meses completo", durationMonths: 2, priceMXN: 21, status: "AGOTADO" },
  ] as const;

  // Idempotente: borra y vuelve a insertar (demo)
  await prisma.product.deleteMany({});
  await prisma.product.createMany({
    data: products.map((p) => ({
      group: p.group as ProductGroup,
      category: p.category,
      brand: p.brand,
      plan: p.plan,
      durationMonths: p.durationMonths,
      priceMXN: p.priceMXN,
      status: p.status as ProductStatus,
    })),
  });

  console.log("✅ Seed listo: admin + productos");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
