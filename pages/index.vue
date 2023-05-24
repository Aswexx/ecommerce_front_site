<script lang="ts" setup>
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()

const popularProducts = computed(() => {
  return productStore.products.filter(p => p.isPopular)
})

if (process.server) {
  await productStore.getProducts()
}
</script>
<template>
  <NuxtLayout>
    <section class="main space-y-10 pt-4">
      <CarouselHero />
      <IntroTitle />
      <CarouselProducts :products="popularProducts"/>
      <Hero />
    </section>
  </NuxtLayout>
</template>
