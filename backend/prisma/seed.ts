import { PrismaClient, Role } from "@prisma/client";
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

  // user
  const user1 = await prisma.user.create({
    data: {
      email: "james@gmail.com",
      name: "James Williams",
      id: "1",
      password: "test password",
      role: Role.ADMIN,
    },
  });

  // insert test author
  const author1 = await prisma.author.create({
    data: {
      name: "William Shakespeare",
      intro: "william shakespeare was a...",
    },
  });

  /*
    id           String     @id @default(uuid())
  title        String
  introduction String     @db.Text
  pageCount    Int?
  publishYear  Int?
  authorId     String
  */
  const work1 = await prisma.work.create({
    data: {
      title: "Hamlet",
      introduction: "Hamlet tells the story of...",
      pageCount: 200,
      publishYear: 1623,
      authorId: author1.id,
    },
  });

  /*
    content   String     @db.Text
  analysis  String?    @db.Text
  workId    String
  */
  const snippet = await prisma.snippet.create({
    data: {
      content: "to be or not to be...",
      analysis: "this passage shows the ....",
      workId: work1.id,
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
