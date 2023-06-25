import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
	try {
		await prisma.contact.create({
			data: body
		})
	} catch (err) {
		console.error(err)
	}
})
