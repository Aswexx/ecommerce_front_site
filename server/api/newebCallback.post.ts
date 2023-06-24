import crypto from 'crypto';
const { newebHashKey, newebHashIV } = useRuntimeConfig()
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const deCipher = crypto.createDecipheriv('aes256', newebHashKey, newebHashIV)
  let decrypted = deCipher.update(body.TradeInfo, 'hex', 'utf8')
  decrypted += deCipher.final('utf8')

  // const tradeInfo = JSON.parse(decrypted)
  const tradeInfo = await new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(decrypted))
    },3000)
  })
  
  console.log('b-parse', decrypted)
  console.log('@', tradeInfo)
  
  await prisma.order.update({
    where: {
      id: tradeInfo.Result.MerchantOrderNo
    },
    data: {
      tradeId: tradeInfo.Result.TradeNo,
      tradeAmount: tradeInfo.Result.Amt,
      tradeTime: new Date(tradeInfo.Result.PayTime),
      progress: '已支付，訂單處理中'
    }
  })

  return { status: 'ok' }
})
