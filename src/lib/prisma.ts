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
    try {
      const sourcePaths = [
        path.join(process.cwd(), "public/db/dev.db"),
        path.join(process.cwd(), "prisma/dev.db"),
        path.join(__dirname, "../../../public/db/dev.db"), // Just in case
      ];

      let copied = false;
      for (const sourcePath of sourcePaths) {
        if (fs.existsSync(sourcePath)) {
            if (!fs.existsSync(dbPath)) {
                fs.copyFileSync(sourcePath, dbPath);
                console.log(`Successfully copied database from ${sourcePath} to ${dbPath}`);
            } else {
                console.log(`Database already exists at ${dbPath}`);
            }
            copied = true;
            break;
        }
      }

      if (!copied) {
          console.error("Could not find source database file to copy to /tmp. Checked paths:", sourcePaths);
          console.log("Current directory contents:", fs.readdirSync(process.cwd()));
          if (fs.existsSync(path.join(process.cwd(), "public"))) {
             console.log("Public directory contents:", fs.readdirSync(path.join(process.cwd(), "public")));
          }
      }

    } catch (e) {
      console.error("Failed to copy database to /tmp", e)
    }
  }
}

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
