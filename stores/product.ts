import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const products = ref<any[]>([])

  const cartItems = reactive<CartItem[]>([])

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
  
  function addToCart(cartItem: CartItem) {
    const isItemDuplicate = cartItems.some((item, index) => {
      if (item.id === cartItem.id) {
        cartItems[index].count += cartItem.count
        return true
      }
      return false
    })

    if (!isItemDuplicate) {
      cartItems.push(cartItem)
    }
  }

	return { products, getProducts, cartItems, addToCart }
})