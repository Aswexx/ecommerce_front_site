<script lang="ts" setup>
const props = defineProps<{
  title: string | string[],
  subTitle?: string,
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex w-3/4 items-center justify-center">
      <span class="h-[1px] flex-1 bg-gradient-to-r from-white via-[#4d1939] to-white"></span>
      <h2 class="text-2xl font-bold">{{ props.title }}</h2>
      <span class="h-[1px] flex-1 bg-gradient-to-r from-white via-[#4d1939] to-white"></span>
    </div>
    <h3 class="text-sm font-bold">{{ props.subTitle?.toUpperCase() }}</h3>
    <p class="mt-2 text-[#c3ae8b]">
      {{ props.description }}
    </p>
  </div>
</template>
