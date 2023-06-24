import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const { userId } = event.context.params as { userId: string }
	const profileToUpdate = await readBody(event)

	try {
		const result = await prisma.user.update({
      where: { id: userId },
      data: profileToUpdate
		})
		
		return result
	} catch (err) {
		console.log(err)
	}
})
