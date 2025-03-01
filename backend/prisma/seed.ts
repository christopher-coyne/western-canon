import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
            email: 'james@gmail.com',
            name: 'James Williams',
            id: '1'
            // other fields
        },
    })

    // project
    const project1 = await prisma.project.create({
        data: {
            title: 'test project1',
            description: '#Test project 1',
            creatorId: '1' // james williams
        }
    })

    console.log('created user: ', user1.name)
    console.log('created project 1: ', project1.title)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })