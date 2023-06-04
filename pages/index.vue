<script lang="ts" setup>
import { useProductStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'

const productStore = useProductStore()
const userStore = useUserStore()

const popularProducts = computed(() => {
  return productStore.products.filter(p => p.isPopular)
})


if (process.server) {
  await productStore.getProducts()
}

function handleResize() {
  userStore.viewportWidth = window.innerWidth
}

onMounted(() => {
  userStore.viewportWidth = window.innerWidth
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

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
