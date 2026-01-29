import type { ProductGroup, ProductStatus } from "@prisma/client";

export type Product = {
  id: string;
  group: ProductGroup;
  category: string;
  brand: string;
  plan: string;
  durationMonths: number;
  priceMXN: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
