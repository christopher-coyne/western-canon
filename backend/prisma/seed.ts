import { PrismaClient, Role } from "@prisma/client";
import { seedAuthors } from "./seeds/authors";
import { seedWorks } from "./seeds/works";
import { seedSnippets } from "./seeds/snippets";
import { seedGenres } from "./seeds/genres";

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

  // Seed snippets
  console.log("Seeding snippets...");
  const snippets = await seedSnippets(works);
  console.log(`Created ${snippets.length} snippets`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
