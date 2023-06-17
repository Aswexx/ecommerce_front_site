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
      <IntroTitle 
        :title="'熱銷推薦'"
        :sub-title="'most popular'"
        :description="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione?'"
      />
      <CarouselProducts :products="popularProducts"/>
      <Hero 
        :title="'品牌故事'"
        :content="'烘焙師們以專業技巧和創造力打造出一道道令人垂涎欲滴的美食藝術品。堅持純天然的食材，注重健康與品質，讓您在品嚐的同時享受到純粹的滿足。'"
        :img-url="`${useRuntimeConfig().public.HOST_URL}/_nuxt/assets/images/view4.jpg`"
        :height="'h-[80vh]'"
      />
    </section>
  </NuxtLayout>
</template>