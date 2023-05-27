import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
	const products = ref<any[]>([])

  async function getProducts() {
    const { data, error } = await useFetch('/api/products')
    if (data.value) {
      products.value.push(...data.value)
    }

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: 'fail to fetch products data'
      })
    }
	}

	return { products, getProducts }
})