import crypto from 'crypto';
const { newebMerchantId, newebHashKey, newebHashIV } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	console.log(newebHashKey, newebHashIV)

	// TODO: 後端從DB拉商品資料重算一次總金額

	const tradeInfo = {
    MerchantID: newebMerchantId,
    RespondType: 'JSON',
    TimeStamp: Date.now(),
    Version: '2.0',
    MerchantOrderNo: crypto.randomBytes(8).toString('hex'), // 我方定義商店交易訂單號
    Amt: body.total, // 訂單金額
    ItemDesc: 'test', //商品資訊，編碼 utf-8 格式,
    LoginType: 0, // 不須登入藍新金流會員
    OrderComment: '', // 可下訂單備註(例如使用優惠券)，呈現在藍新支付頁面
    Email: body.email, // 付款人 email，交易完成會 email 通知付款人
    ReturnURL: useRuntimeConfig().public.HOST_URL, // 支付完成導向的商店網址
    NotifyURL: `${useRuntimeConfig().public.HOST_URL}/api/newebCallback`, // 回傳支付結果的目標後端 url
    ClientBackURL: `${useRuntimeConfig().public.HOST_URL}/cart` // 使用者自行取消，或者 atm 轉帳查看收款帳號後返回商店
  }

	const encryptedTradeInfo = aesEncryptTradeInfo(tradeInfo)
	console.log('tradeInfo', tradeInfo)
	console.log('encrypted', encryptedTradeInfo)

	const contentToShaEncrypt = `HashKey=${newebHashKey}&${encryptedTradeInfo}&HashIV=${newebHashIV}`

	const shaEncrypted = crypto.createHash('sha256')
		.update(contentToShaEncrypt)
		.digest('hex')
		.toUpperCase()


	return {
    tradeInfo: encryptedTradeInfo,
    sha: shaEncrypted,
    MerchantID: tradeInfo.MerchantID,
  }
})

function aesEncryptTradeInfo(tradeInfo: any): string {
	const cipher = crypto.createCipheriv(
    'aes256',
    newebHashKey,
    newebHashIV
	)

	console.log(formatTradeIfo(tradeInfo))
	
	let encrypted = cipher.update(formatTradeIfo(tradeInfo), 'utf8', 'hex')
	encrypted += cipher.final('hex')

	return encrypted
}

function formatTradeIfo(tradeInfo: object) {
	const tradeInfoArr = Object.entries(tradeInfo)
	const mapedTradeInfoArr = tradeInfoArr.map((t) => {
    return `${t[0]}=${t[1]}`
	})
	
	return mapedTradeInfoArr.join('&')
}