import { PrismaClient, Role } from "@prisma/client";
import { seedAuthors } from "./seeds/authors";
import { seedWorks } from "./seeds/works";
import { seedSnippets } from "./seeds/snippets";
import { seedGenres } from "./seeds/genres";
import * as fs from "fs";
import * as path from "path";
import { processedAuthors } from "./texts/processed-authors";

import { work as aristophanesWork } from "./texts/aristophanes/work";
import { work as homerWork } from "./texts/homer/work";
import { work as sophoclesWork } from "./texts/sophocles/work";
import { work as thucydidesWork } from "./texts/thucydides/work";
import { work as platoWork } from "./texts/plato/work";
import { work as aristotleWork } from "./texts/aristotle/work";
import { work as herodotusWork } from "./texts/herodotus/work";
import { work as euripidesWork } from "./texts/euripides/work";

import { snippets as aristophanesSnippets } from "./texts/aristophanes/snippets";
import { snippets as homerSnippets } from "./texts/homer/snippets";
import { snippets as sophoclesSnippets } from "./texts/sophocles/snippets";
import { snippets as thucydidesSnippets } from "./texts/thucydides/snippets";
import { snippets as platoSnippets } from "./texts/plato/snippets";
import { snippets as aristotleSnippets } from "./texts/aristotle/snippets";
import { snippets as herodotusSnippets } from "./texts/herodotus/snippets";
import { snippets as euripidesSnippets } from "./texts/euripides/snippets";

const prisma = new PrismaClient();

/*
model User {
  id                String             @id @default(cuid())
  email             String             @unique
  name              String?
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  studyGuides       StudyGuide[] // Created study guides
  favoriteGuides    UserFavorite[]
  favoriteQuestions QuestionFavorite[]
  Project           Project[]
}
  */
async function main() {
  // Create test user
  /*
  const user1 = await prisma.user.create({
    data: {
      email: "james@gmail.com",
      name: "James Williams",
      id: "1",
      password: "test password",
      role: Role.ADMIN,
    },
  });
  console.log("Created user: ", user1.name);

  // Seed genres first
  console.log("Seeding genres...");
  const genres = await seedGenres();
  console.log(`Created ${genres.length} genres`);

  // Seed authors
  console.log("Seeding authors...");
  const authors = await seedAuthors();
  console.log(`Created ${authors.length} authors`);

  // Create author-genre relationships
  console.log("Creating author-genre relationships...");
  const authorGenreRelations = [
    {
      authorName: "Jane Austen",
      genres: ["Romance", "Social Commentary", "Literary Fiction"],
    },
    {
      authorName: "Charles Dickens",
      genres: ["Victorian Literature", "Social Commentary", "Gothic Fiction"],
    },
    {
      authorName: "Virginia Woolf",
      genres: ["Modernism", "Stream of Consciousness", "Literary Fiction"],
    },
    {
      authorName: "Franz Kafka",
      genres: ["Surrealism", "Literary Fiction", "Gothic Fiction"],
    },
    {
      authorName: "Gabriel García Márquez",
      genres: ["Magical Realism", "Literary Fiction", "Historical Fiction"],
    },
  ];

  for (const relation of authorGenreRelations) {
    const author = authors.find((a) => a.name === relation.authorName);
    if (!author) {
      console.warn(
        `Author ${relation.authorName} not found, skipping genre relations`
      );
      continue;
    }
    const authorGenres = genres.filter((g) => relation.genres.includes(g.name));

    for (const genre of authorGenres) {
      await prisma.authorGenre.create({
        data: {
          authorId: author.id,
          genreId: genre.id,
        },
      });
    }
  }

  // Seed works
  console.log("Seeding works...");
  const works = await seedWorks(authors);
  console.log(`Created ${works.length} works`);

  // Create work-genre relationships
  console.log("Creating work-genre relationships...");
  const workGenreRelations = [
    {
      workTitle: "Pride and Prejudice",
      genres: ["Romance", "Social Commentary", "Literary Fiction"],
    },
    {
      workTitle: "Sense and Sensibility",
      genres: ["Romance", "Social Commentary"],
    },
    { workTitle: "Emma", genres: ["Romance", "Social Commentary", "Satire"] },
    {
      workTitle: "Great Expectations",
      genres: ["Victorian Literature", "Gothic Fiction", "Social Commentary"],
    },
    {
      workTitle: "A Tale of Two Cities",
      genres: ["Historical Fiction", "Victorian Literature"],
    },
    {
      workTitle: "Oliver Twist",
      genres: ["Victorian Literature", "Social Commentary"],
    },
    {
      workTitle: "Mrs Dalloway",
      genres: ["Modernism", "Stream of Consciousness"],
    },
    {
      workTitle: "To the Lighthouse",
      genres: ["Modernism", "Stream of Consciousness", "Literary Fiction"],
    },
    {
      workTitle: "Orlando: A Biography",
      genres: ["Modernism", "Literary Fiction", "Historical Fiction"],
    },
    {
      workTitle: "The Metamorphosis",
      genres: ["Surrealism", "Literary Fiction"],
    },
    { workTitle: "The Trial", genres: ["Surrealism", "Literary Fiction"] },
    { workTitle: "The Castle", genres: ["Surrealism", "Literary Fiction"] },
    {
      workTitle: "One Hundred Years of Solitude",
      genres: ["Magical Realism", "Historical Fiction"],
    },
    {
      workTitle: "Love in the Time of Cholera",
      genres: ["Magical Realism", "Romance"],
    },
    {
      workTitle: "Chronicle of a Death Foretold",
      genres: ["Magical Realism", "Literary Fiction"],
    },
  ];

  for (const relation of workGenreRelations) {
    const work = works.find((w) => w.title === relation.workTitle);
    if (!work) {
      console.warn(
        `Work ${relation.workTitle} not found, skipping genre relations`
      );
      continue;
    }
    const workGenres = genres.filter((g) => relation.genres.includes(g.name));

    for (const genre of workGenres) {
      await prisma.workGenre.create({
        data: {
          workId: work.id,
          genreId: genre.id,
        },
      });
    }
  }
    */

  console.log("thucidydes work ", thucydidesWork);
  console.log("Processed authors: ", processedAuthors);
  // seed genres
  const genres = ["Greek Comedy", "Greek Tragedy", "Philosophy", "History"];

  for (const genre of genres) {
    await prisma.genre.create({ data: { name: genre } });
  }

  // seed authors

  for (const author of processedAuthors) {
    await prisma.author.create({
      data: author,
    });
  }

  // seed works
  const frogs = await prisma.work.create({
    data: {
      ...aristophanesWork,
      authorId: "81495f0d-d487-4a78-88b4-910c14192f85",
    },
  });

  const iliad = await prisma.work.create({
    data: { ...homerWork, authorId: "6d5030f3-2552-4854-95ab-943347405adb" },
  });

  const oedipus = await prisma.work.create({
    data: {
      ...sophoclesWork,
      authorId: "64866369-caf8-44bf-863c-07bd8dd48b6d",
    },
  });

  const peloponnesianWar = await prisma.work.create({
    data: {
      ...thucydidesWork,
      authorId: "d3524ab8-9281-4dd2-8df1-becd6db44e30",
    },
  });

  const symposium = await prisma.work.create({
    data: {
      ...platoWork,
      authorId: "544d0a50-5268-435d-90d7-21011cd56c0e",
    },
  });

  const bacchae = await prisma.work.create({
    data: {
      ...euripidesWork,
      authorId: "7b41c3ea-e45f-471e-a472-900b1e0ffb63",
    },
  });

  const histories = await prisma.work.create({
    data: {
      ...herodotusWork,
      authorId: "5fee5ee2-bfd8-471a-a133-83f43fc10d7a",
    },
  });

  const poetics = await prisma.work.create({
    data: {
      ...aristotleWork,
      authorId: "08c5a243-55ea-43a2-8d45-9407970d5200",
    },
  });

  // seed snippets
  for (const snippet of aristophanesSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: frogs.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of homerSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: iliad.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of sophoclesSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: oedipus.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of thucydidesSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: peloponnesianWar.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of platoSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: symposium.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of aristotleSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: poetics.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of herodotusSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: histories.id,
        analysis: snippet.analysis,
      },
    });
  }

  for (const snippet of euripidesSnippets) {
    await prisma.snippet.create({
      data: {
        content: snippet.content,
        workId: bacchae.id,
        analysis: snippet.analysis,
      },
    });
  }

  await prisma.user.create({
    data: {
      email: "alexjohnson@gmail.com",
      name: "Alex",
      password: "$2b$10$qudZ6M/R7M31fIHC9Qn9xentyMgxoZeuNRY1PJKC48XqYtFvTM7f.", // "MyPassword123!"
      role: Role.ADMIN,
    },
  });

  // Seed works
  /*
  console.log("Seeding snippets...");
  const snippets = await seedSnippets(works);
  console.log(`Created ${snippets.length} snippets`);
  */
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
