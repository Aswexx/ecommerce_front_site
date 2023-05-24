export { }

declare global {
	interface Product {
		id: string
		categoryId: string
		name: string
		imageUrl: string
		price: number
		stock: number
		isPopular: boolean
		features: string[]
	}
}