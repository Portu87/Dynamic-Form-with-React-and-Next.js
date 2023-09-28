/**
 * This module exports a Prisma client instance for database operations.
 * In development, it reuses an existing Prisma client or creates a new one if none exists.
 * In production, it always creates a new Prisma client instance.
 */

import { PrismaClient } from "@prisma/client";

// Use `global` to store the Prisma client globally across requests.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Reuse existing Prisma client in development or create a new one.
export const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, store the Prisma client globally to reuse it.
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
