import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params as { userId: string }
  try {
    const favProducts = await prisma.favorite.findMany({
      where: { userId },
      select: {
        product: {
          select: {
            id: true,
            categoryId: true,
            name: true,
            imageUrl: true,
            imageBlurHash: true,
            price: true,
            stock: true,
            isPopular: true,
            features: true
          }
        }
      }
    })
    console.log('fav', userId)
    console.log('fav', favProducts)
    return favProducts
  } catch (err) {
    console.error(err)
  }
})
