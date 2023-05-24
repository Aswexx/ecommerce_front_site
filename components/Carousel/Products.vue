<script lang="ts" setup>
import Flicking from '@egjs/vue3-flicking'
import { Pagination } from '@egjs/flicking-plugins'
import '@egjs/flicking-plugins/dist/pagination.css'
const plugins = [new Pagination({ type: 'scroll' })]

const { products } = defineProps<{ products: Product[] }>()

function showDetail() {
  alert('hello')
}

</script>

<template>
  <Flicking class="mx-auto w-full" :options="{ bound: true, panelsPerView: 5 }" :plugins="plugins">
    <div
      v-for="(product, idx) in products"
      :key="idx"
      class="mb-10 flex cursor-pointer flex-col items-center justify-center"
      @click="showDetail"
    >
      <UnLazyImage class="mx-5 w-[200px] h-[200px] object-cover" :blurhash="`L6PZfSi_.AyE_3t7t7R**0o#DgR4`" :src="product.imageUrl" />
      <h2>{{ product.name }}</h2>
      <p>${{ product.price }}</p>
    </div>
    <template #viewport>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>
