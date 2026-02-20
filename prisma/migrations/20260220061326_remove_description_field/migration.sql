-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "catalogHeroImageUrl" TEXT,
    "catalogHeroTitle" TEXT NOT NULL DEFAULT 'Catálogo',
    "catalogHeroSubtitle" TEXT NOT NULL DEFAULT 'Elige, revisa disponibilidad y pide por WhatsApp.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);
