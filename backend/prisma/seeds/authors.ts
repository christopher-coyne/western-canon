import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedAuthors() {
  const authors = [
    {
      name: "Jane Austen",
      birthYear: 1775,
      birthYearApprox: false,
      deathYear: 1817,
      deathYearApprox: false,
      intro:
        "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. Her plots often explore the dependence of women on marriage in the pursuit of favorable social standing and economic security.",
    },
    {
      name: "Charles Dickens",
      birthYear: 1812,
      birthYearApprox: false,
      deathYear: 1870,
      deathYearApprox: false,
      intro:
        "Charles Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era. His works enjoyed unprecedented popularity during his lifetime and, by the 20th century, critics and scholars had recognized him as a literary genius.",
    },
    {
      name: "Virginia Woolf",
      birthYear: 1882,
      birthYearApprox: false,
      deathYear: 1941,
      deathYearApprox: false,
      intro:
        "Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device. She was a central figure in the influential Bloomsbury Group of intellectuals.",
    },
    {
      name: "Franz Kafka",
      birthYear: 1883,
      birthYearApprox: false,
      deathYear: 1924,
      deathYearApprox: false,
      intro:
        "Franz Kafka was a German-speaking Bohemian novelist and short story writer, widely regarded as one of the major figures of 20th-century literature. His work fuses elements of realism and the fantastic, and typically features isolated protagonists facing bizarre or surrealistic predicaments and incomprehensible socio-bureaucratic powers.",
    },
    {
      name: "Gabriel García Márquez",
      birthYear: 1927,
      birthYearApprox: false,
      deathYear: 2014,
      deathYearApprox: false,
      intro:
        "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known affectionately as Gabo throughout Latin America. Considered one of the most significant authors of the 20th century, particularly in the Spanish language, he was awarded the 1972 Neustadt International Prize for Literature and the 1982 Nobel Prize in Literature.",
    },
  ];

  const createdAuthors = await prisma.author.createMany({
    data: authors,
    skipDuplicates: true,
  });

  console.log(`Created ${createdAuthors.count} authors`);

  // Return all created authors for use in seeding works
  return await prisma.author.findMany({
    where: {
      name: {
        in: authors.map((a) => a.name),
      },
    },
  });
}
