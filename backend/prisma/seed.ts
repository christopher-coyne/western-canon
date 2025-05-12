import { PrismaClient, Role } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { WorkMedium } from "@prisma/client";

const prisma = new PrismaClient();

type GenreData = {
  id: string;
  name: string;
};

type SnippetData = {
  id: string;
  title: string;
  content: string;
};

type WorkData = {
  id: string;
  title: string;
  publishYear: number;
  genre: string;
  genreId: string;
  medium: string;
  snippets: SnippetData[];
};

type AuthorData = {
  id: string;
  name: string;
  birthYear: number;
  birthYearApprox: boolean;
  deathYear: number;
  deathYearApprox: boolean;
  intro: string;
  works: WorkData[];
};

type MasterData = {
  texts: AuthorData[];
  genres: GenreData[];
};

function readJsonFileSync(filePath: string) {
  const fileData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileData) as MasterData;
}

async function main() {
  const skipExisting = true;
  const masterData = readJsonFileSync(path.join(__dirname, "master.json"));
  const masterDataTexts = masterData.texts;
  const masterDataGenres = masterData.genres;

  // find existing authors
  const existingAuthorIds = (
    await prisma.author.findMany({
      select: {
        id: true,
      },
    })
  ).map((author) => author.id);
  const existingWorkIds = (
    await prisma.work.findMany({
      select: {
        id: true,
      },
    })
  ).map((work) => work.id);
  const existingSnippetIds = (
    await prisma.snippet.findMany({
      select: {
        id: true,
      },
    })
  ).map((snippet) => snippet.id);

  const existingGenreIds = (
    await prisma.genre.findMany({
      select: {
        id: true,
      },
    })
  ).map((genre) => genre.id);

  const existingMediums = Object.values(WorkMedium);

  // seed genres
  for (const genre of masterDataGenres) {
    if (existingGenreIds.includes(genre.id)) {
      await prisma.genre.update({
        where: { id: genre.id },
        data: genre,
      });
    } else {
      await prisma.genre.create({
        data: genre,
      });
    }
  }

  // seed authors
  let authors = masterDataTexts.map((text) => text);
  if (skipExisting) {
    for (const author of masterDataTexts) {
      const { works, ...authorData } = author;
      if (existingAuthorIds.includes(author.id)) {
        continue;
      } else {
        await prisma.author.create({
          data: authorData,
        });
      }
    }
  } else {
    // Update existing authors and create new ones
    for (const author of masterDataTexts) {
      const { works, ...authorData } = author;
      if (existingAuthorIds.includes(author.id)) {
        await prisma.author.update({
          where: { id: author.id },
          data: authorData,
        });
      } else {
        await prisma.author.create({
          data: authorData,
        });
      }
    }
  }

  // seed works
  for (const text of masterDataTexts) {
    for (const work of text.works) {
      const workData = {
        id: work.id,
        title: work.title,
        publishYear: work.publishYear,
        medium:
          work.medium in existingMediums ? (work.medium as WorkMedium) : null,
        authorId: text.id,
        introduction: text.intro,
      };

      if (skipExisting && existingWorkIds.includes(work.id)) {
        continue;
      }

      if (existingWorkIds.includes(work.id)) {
        await prisma.work.update({
          where: { id: work.id },
          data: workData,
        });
      } else {
        await prisma.work.create({
          data: workData,
        });
      }

      // seed snippets for this work
      for (const snippet of work.snippets) {
        const snippetData = {
          id: snippet.id,
          content: snippet.content,
          workId: work.id,
        };

        if (skipExisting && existingSnippetIds.includes(snippet.id)) {
          continue;
        }

        if (existingSnippetIds.includes(snippet.id)) {
          await prisma.snippet.update({
            where: { id: snippet.id },
            data: snippetData,
          });
        } else {
          await prisma.snippet.create({
            data: snippetData,
          });
        }
      }
    }
  }

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
