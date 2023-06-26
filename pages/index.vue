<script lang="ts" setup>
import { useProductStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'

const productStore = useProductStore()
const userStore = useUserStore()

const popularProducts = computed(() => {
  return productStore.products.filter(p => p.isPopular)
})

function handleResize() {
  userStore.viewportWidth = window.innerWidth
}

onMounted(async () => {
  userStore.viewportWidth = window.innerWidth
  window.addEventListener('resize', handleResize)

  nextTick(() => {
    productStore.getProducts()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

</script>
<template>
  <NuxtLayout>
    <section class="main space-y-10">
      <CarouselHero />
      <IntroTitle 
        :title="'熱銷推薦'"
        :sub-title="'most popular'"
        :description="'最受好評！贏得無數味蕾讚賞，品質、口感、獨特風味，每一口都令人心醉神迷的人氣商品。'"
      />
      <CarouselProducts :products="popularProducts"/>
      <Hero 
        :title="'品牌故事'"
        :content="'烘焙師們以專業技巧和創造力打造出一道道令人垂涎欲滴的美食藝術品。堅持純天然的食材，注重健康與品質，讓您在品嚐的同時享受到純粹的滿足。'"
        :img-url="`https://source.unsplash.com/RndRFJ1v1kk`"
        :height="'h-[80vh]'"
      />
    </section>
  </NuxtLayout>
</template>