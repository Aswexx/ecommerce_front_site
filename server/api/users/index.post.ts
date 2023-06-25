import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId, email } = await readBody(event)
  try {
    await prisma.user.upsert({
      where: { id: userId},
      update: {},
      create: {
        id: userId,
        email
      }
    })
    return 'pp'
  } catch (err) {
    console.error(err)
  }
})
