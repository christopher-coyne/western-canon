import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedGenres() {
  const genres = [
    { name: "Romance" },
    { name: "Gothic Fiction" },
    { name: "Social Commentary" },
    { name: "Victorian Literature" },
    { name: "Modernism" },
    { name: "Stream of Consciousness" },
    { name: "Magical Realism" },
    { name: "Surrealism" },
    { name: "Literary Fiction" },
    { name: "Historical Fiction" },
    { name: "Satire" },
  ];

  const createdGenres = await prisma.genre.createMany({
    data: genres,
    skipDuplicates: true,
  });

  console.log(`Created ${createdGenres.count} genres`);

  // Return all created genres for use in seeding relationships
  return await prisma.genre.findMany({
    where: {
      name: {
        in: genres.map((g) => g.name),
      },
    },
  });
}
