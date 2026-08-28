import { placeholderJobs } from "./placeholder-data";

import { PrismaClient } from "../lib/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });
};

const prisma = prismaClientSingleton();

async function main() {
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await prisma.job.upsert({
        where: {
          slug: job.slug,
        },
        update: job,
        create: job,
      });
    })
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
