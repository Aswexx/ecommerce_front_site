<script lang="ts" setup>
const { imageUrl, name } = defineProps<{
  name: string
  imageUrl: string
}>()
</script>

<template>
  <div class="flex items-center space-x-3">
    <div class="avatar">
      <div class="mask mask-squircle w-16 h-16">
        <UnLazyImage class="object-cover" 
          :blurhash="`L6PZfSi_.AyE_3t7t7R**0o#DgR4`" 
          :src="imageUrl"
        />
      </div>
    </div>
    <div>
      <div class="font-bold">{{ name }}</div>
    </div>
  </div>
</template>