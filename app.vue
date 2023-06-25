<script setup lang="ts">
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()

watch(productStore.cartItems, (newVal) => {
  localStorage.setItem('cartItems', JSON.stringify(newVal))
})


onMounted(() => {
  const cartItems = localStorage.getItem('cartItems')
  if (!cartItems) return

  const parsedCartItems = JSON.parse(cartItems)
  productStore.cartItems.push(...parsedCartItems)
})


</script>

<template>
  <NuxtPage />
  <Toast/>
</template>