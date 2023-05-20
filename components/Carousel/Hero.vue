<script lang="ts" setup>
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay, Pagination } from '@egjs/flicking-plugins'
import '@egjs/flicking-plugins/dist/pagination.css'

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGV3qKodgoLi7b8S3BW4LS7jdVcgKsjpiHj7clB7FY0fMpBYqAbYpKuxK7eGvURcFmV0&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcSXaEb5ctKtE6R1qDodiP0CEP20Xqfw7BtqZZbtN1oswvukde-OJbr48W6JSwebyrF5c&usqp=CAU',
  'https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?b=1&s=612x612&w=0&k=20&c=oPozX-rSN1bsabrtN3fTPFbzXLaD2RgnGPR6Y2bta-0=',
  'http://localhost:3000/_nuxt/assets/images/view3.jpg'
]

const plugins = [
  new AutoPlay({ duration: 3000, animationDuration: 3000, direction: 'NEXT', stopOnHover: true }),
  new Pagination({ type: 'scroll' })
]
</script>

<template>
  <Flicking
    class="mx-auto w-full"
    :options="{ bound: true, panelsPerView: 1, circular: true }"
    :plugins="plugins"
  >
    <div
      v-for="(img, idx) in images"
      :key="idx"
      class="mb-10 flex cursor-pointer flex-col items-center justify-center"
    >
      <img class="mx-5 w-[500px]" :src="img" />
    </div>
    <template #viewport>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>
