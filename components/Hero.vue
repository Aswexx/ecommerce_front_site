<script lang="ts" setup>
const { title, content, imgUrl } = defineProps<{
  title?: string
  content: string
  imgUrl: string
  height: string
}>()
</script>

<template>
  <div class="hero"
    :class="height"
    :style="`background-image: url(${imgUrl})`"
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content ml-20 mr-auto text-start text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">{{ title }}</h1>
        <p class="mb-5">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>