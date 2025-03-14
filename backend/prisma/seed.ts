import { PrismaClient, Role } from "@prisma/client";
import { seedAuthors } from "./seeds/authors";
import { seedWorks } from "./seeds/works";
import { seedSnippets } from "./seeds/snippets";

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

  // Seed authors
  console.log("Seeding authors...");
  const authors = await seedAuthors();
  console.log(`Created ${authors.length} authors`);

  // Seed works
  console.log("Seeding works...");
  const works = await seedWorks(authors);
  console.log(`Created ${works.length} works`);

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
