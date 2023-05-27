<script lang="ts" setup>
import Flicking from '@egjs/vue3-flicking'
import { Pagination } from '@egjs/flicking-plugins'
import '@egjs/flicking-plugins/dist/pagination.css'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const panelsPerView = computed(() => {
  return userStore.viewportWidth < 640 ? 3 : 5
})

const plugins = [new Pagination({ type: 'scroll' })]

const { products } = defineProps<{ products: Product[] }>()

</script>

<template>
  <Flicking class="mx-auto w-full h-[320px]" :options="{ bound: true, panelsPerView: panelsPerView }" :plugins="plugins">

    <ProductCard 
      v-for="(product, idx) in products" 
      :key="idx" 
      :product="product"
      :feature-icon="true"
    />

    <template #viewport>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>
