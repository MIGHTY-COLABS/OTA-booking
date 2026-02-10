import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const isProduction = process.env.NODE_ENV === "production"

// In Vercel serverless environment, only /tmp is writable.
// If using SQLite, we copy the database file there on startup.
if (isProduction && process.env.DATABASE_URL?.startsWith("file:")) {
  const dbPath = process.env.DATABASE_URL.replace("file:", "")
  if (dbPath.startsWith("/tmp")) {
    const sourcePath = path.join(process.cwd(), "public/db/dev.db")
    try {
      if (fs.existsSync(sourcePath) && !fs.existsSync(dbPath)) {
        fs.copyFileSync(sourcePath, dbPath)
        console.log(`Copied database from ${sourcePath} to ${dbPath}`)
      }
    } catch (e) {
      console.error("Failed to copy database to /tmp", e)
    }
  }
}

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
