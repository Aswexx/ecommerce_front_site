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
		description: string
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

	interface CartItem {
    id: string
    name: string
		imageUrl: string
		stock: number
		price: number
		count: number
	}
	
	interface Order {
		id: string
		createdAt: string
		progress: string
		tradeAmount: number
		recieverName: string
		recieverAddress: string
		tradeUserEmail: string
		tradeUserPhone: string
		purchase: {
			count: number
			product: {
				name: string
				imageUrl: string
				imageBlurHash: string
			}
		}[]
	}
}