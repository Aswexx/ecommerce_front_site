import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	try {
		const products = await prisma.product.findMany({
			select: {
				id: true,
				categoryId: true,
				name: true,
				imageUrl: true,
				price: true,
				stock: true,
				isPopular: true,
				features: true
			}
		})
		return products
	} catch (err) {
		console.error(err)
	}
})
