import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params as { userId: string }
  try {
    const result = await prisma.order.findMany({
      where: { registeredUserId: userId as string },
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
      },
    })

    return result
  } catch (err) {
    console.log(err)
  }
})
