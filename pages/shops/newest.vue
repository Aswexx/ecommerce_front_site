<script lang="ts" setup>
const { data } = await useFetch('/api/products/newest')
const newestProducts = data.value || []
const { currentPageNum, pagedProducts, numOfPages } = usePagination(newestProducts)

</script>

<template>
  <div class="flex flex-col items-center">
    <IntroTitle
      class="self-stretch"
      :title="'最新商品'"
    />

    <div class="flex-1 grid grid-cols-2 gap-1 sm:grid-cols-4 ">
      <ProductCard v-for="product in pagedProducts" :key="product.id" 
        :product="product"
        :feature-icon="true"
      />
    </div>

    <div class="join">
      <button class="join-item btn btn-primary btn-sm"
        :class="{'btn-active': n === currentPageNum }"
        @click="currentPageNum = n"
        v-for="n in numOfPages" :key="n" > {{ n }}
      </button>
    </div>
  </div>
</template>