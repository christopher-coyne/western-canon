import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Your seed data here
    const user1 = await prisma.user.create({
        data: {
            email: 'james@gmail.com',
            name: 'James Williams',
            credits: 0,
            role: 'USER',
            id: '1'
            // other fields
        },
    })

    console.log('created user: ', user1)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })