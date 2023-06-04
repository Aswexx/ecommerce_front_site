import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId, productId } = await readBody(event)
  try {
		const result = await prisma.favorite.create({
			data: {
				userId,
				productId
			}
		})
    return result
  } catch (err) {
    console.error(err)
  }
})
