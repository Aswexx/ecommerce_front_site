<script lang="ts" setup>
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay, Pagination } from '@egjs/flicking-plugins'
import '@egjs/flicking-plugins/dist/pagination.css'

const images = [
  'https://source.unsplash.com/Emhz3miT6mo',
  'https://source.unsplash.com/r0DusB-OgRM',
  'https://source.unsplash.com/dZKiXR9FYcM'
]

const plugins = [
  new AutoPlay({ duration: 3000, animationDuration: 3000, direction: 'NEXT', stopOnHover: true }),
  new Pagination({ type: 'scroll' })
]
</script>

<template>
  <Flicking
    class="mx-auto w-full"
    :options="{ panelsPerView: 1, circular: true }"
    :plugins="plugins"
  >
    <div
      v-for="(img, idx) in images"
      :key="idx"
      class="mb-10 flex cursor-pointer flex-col items-center justify-center"
    >
      <img class="mx-5 w-full aspect-5/1.75 object-cover" :src="img" />
    </div>
    <template #viewport>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>
