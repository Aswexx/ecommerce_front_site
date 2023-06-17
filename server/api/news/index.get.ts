import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const products = await prisma.news.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				imageUrl: true,
				createdAt: true
      }
    })
    return products
  } catch (err) {
    console.error(err)
  }
})
