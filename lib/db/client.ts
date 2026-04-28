/**
 * Prisma client singleton para Next.js con adapter pg (Prisma 7).
 *
 * Prisma 7 requiere pasar un adapter de base de datos al constructor del
 * PrismaClient. Usamos @prisma/adapter-pg (node-postgres) que funciona
 * perfectamente con Neon en entornos Node.js / Vercel.
 *
 * El patrón globalThis evita recrear el cliente en cada hot-reload de dev.
 *
 * Docs: https://pris.ly/d/config-datasource
 */

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "[db] DATABASE_URL no está definida. Agrega la variable en .env.local"
    );
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
