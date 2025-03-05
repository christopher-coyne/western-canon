import { PrismaClient, TechnologyType } from "@prisma/client";
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
  // Your seed data here

  // tags
  const tags = [
    {
      id: "1",
      name: "React",
      type: TechnologyType.FRAMEWORK,
    },
    {
      id: "2sdf",
      name: "Vue",
      type: TechnologyType.FRAMEWORK,
    },
    {
      id: "3sdfsd",
      name: "Express",
      type: TechnologyType.FRAMEWORK,
    },
    {
      id: "4aa",
      name: "Spring Boot",
      type: TechnologyType.FRAMEWORK,
    },
    {
      id: "5ddd",
      name: "Java",
      type: TechnologyType.LANGUAGE,
    },
    {
      id: "6fff",
      name: "Docker",
      type: TechnologyType.PLATFORM,
    },
  ];
  await prisma.technologyTag.createMany({ data: tags });

  // user
  const user1 = await prisma.user.create({
    data: {
      email: "james@gmail.com",
      name: "James Williams",
      id: "1",
    },
  });

  // project
  const project1 = await prisma.project.create({
    data: {
      id: "1",
      title: "React Router from scratch",
      description: "blah blah blah...",
      creatorId: "1", // james williams,
      // tags: { connect: [{ id: "1" }] },
    },
  });

  // project
  const project2 = await prisma.project.create({
    data: {
      id: "2",
      title: "Node js From scratch",
      description: "blah blah blah...",
      creatorId: "1", // james williams,
      tags: { connect: [{ id: "1" }] },
    },
  });

  console.log("created user: ", user1.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
