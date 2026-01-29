# StreamStore Pro (Demo universitario)

Catálogo tipo streaming con **Next.js (App Router) + TypeScript + Tailwind + Prisma + NextAuth (Credentials)**.
Incluye panel **Admin** (CRUD) y botón **Comprar por WhatsApp** con mensaje prellenado.

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm

## Instalación rápida
```bash
npm install
cp .env.example .env
npm run setup
npm run dev
```

Luego abre: http://localhost:3000

## Acceso Admin (demo)
- Email: `admin@demo.com`
- Password: `admin123`

> Cambia la contraseña después en `.env` o desde Prisma Studio.

## Notas
- Por defecto usa SQLite (archivo `prisma/dev.db`) para que corra sin configurar Postgres.
- Si quieres Postgres: cambia `DATABASE_URL` en `.env` y el `provider` en `prisma/schema.prisma`.
