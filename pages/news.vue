<script setup lang="ts">
const { data: news } = await useFetch('/api/news')
</script>

<template>
  <NuxtLayout>
    <div class="flex-1">
      <Hero
        :title="'新品與優惠'"
        :content="'每天現做麵包、蛋糕和甜點，保證絕佳品質。嚴選食材，品味頂級烘焙美味。不斷推陳出新，滿足您的味蕾，每天充滿甜蜜。定期優惠活動，實惠品味佳餚。關注最新消息，品味新鮮美味、優質食材!'"
        :img-url="`${useRuntimeConfig().public.HOST_URL}/_nuxt/assets/images/view4.jpg`"
        :height="'h-[30vh]'"
        />
      <IntroTitle
        class="my-4"
        :title="'最新消息'"
      />
      <div class="flex flex-col space-y-4 justify-center items-center">

        <NewsItem 
          v-for="item in news" :key="item.id"
          :message="item"
        />

      </div>
    </div>
  </NuxtLayout>
</template>