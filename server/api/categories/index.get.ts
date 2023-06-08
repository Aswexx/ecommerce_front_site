import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
		const products = await prisma.category.findMany({
			select: {
				id: true,
				name: true
			}
		})
    return products
  } catch (err) {
    console.error(err)
  }
})
