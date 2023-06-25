import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const { email, phone } = await readBody(event)
	
  try {
    const result = await prisma.order.findMany({
      where: { tradeUserEmail: email, tradeUserPhone: phone },
      select: {
        id: true,
        createdAt: true,
        progress: true,
        tradeAmount: true,
        tradeUserEmail: true,
        tradeUserPhone: true,
        recieverName: true,
        recieverAddress: true,
        purchase: {
          select: {
            product: {
              select: {
                name: true,
                imageBlurHash: true,
                imageUrl: true
              }
            },
            count: true
          }
        }
      }
    })

    return result
  } catch (err) {
    console.error(err)
  }
})
