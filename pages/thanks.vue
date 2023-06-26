<script lang="ts" setup>
const seconds = ref(10)

onMounted(() => {
  const timer: NodeJS.Timer = setInterval(() => {
    if (!seconds.value) {
      clearInterval(timer)
      navigateTo('/')
      return
    }
    seconds.value--
  },1000)
})
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 flex justify-center items-center">
      <div class="bg-[#F1EDEF] text-[#675a53] p-4 rounded-lg border flex flex-col justify-center items-center space-y-4">
        <h1>謝謝惠顧，我們會盡快處理您的訂購商品!</h1>
        <p>{{ seconds }} 秒後返回首頁</p>
        <button @click="navigateTo('/')" class="btn btn-sm btn-primary">回首頁</button>
      </div>
    </div>
  </NuxtLayout>
</template>