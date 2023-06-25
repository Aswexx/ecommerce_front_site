import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params as { userId: string }
  
  try {
		const result = await prisma.user.findFirst({
			where: { id: userId },
			select: {
				id: true,
				address: true,
				birthday: true,
				email: true,
				name: true,
				phone: true,
				subscription: true
			}
		})

    return result
  } catch (err) {
    console.error(err)
  }
})
