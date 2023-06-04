export { }

declare global {
	interface Product {
		id: string
		categoryId: string
		name: string
		imageUrl: string
		imageBlurHash: string | null
		price: number
		stock: number
		isPopular: boolean
		features: string[]
	}

	interface Profile {
		id: string
		address: string
		birthday: string
		eamil: string
		name: string
		phone: string
		subscription: boolean
	}
}