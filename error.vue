<script lang="ts" setup>
  defineProps(['error'])
</script>

<template>
  <div class="h-[100dvh] flex justify-center items-center">
    <div class="flex flex-col items-center space-y-6 text-xl">
      <p class="text-red-600 text-5xl">{{ error.statusCode }}</p>
      <p>{{ error.message }}</p>
      <button @click="navigateTo('/')" class="btn btn-primary">返回首頁</button>
    </div>
  </div>
</template>