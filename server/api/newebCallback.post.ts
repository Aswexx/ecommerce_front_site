export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	// TODO: 修改訂單狀態、商品庫存
	console.log('from neweb', body)

	return { status: 'ok'}
})
