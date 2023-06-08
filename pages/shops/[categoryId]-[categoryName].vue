<script lang="ts" setup>
const { categoryId, categoryName } = useRoute().params
const { data } = await useFetch(`/api/products/category/${categoryId}`)
const categoryProduct = data.value || []
const { currentPageNum, pagedProducts, numOfPages } = usePagination(categoryProduct)

</script>

<template>
  <div class="border border-blue-400 flex flex-col items-center">
    <IntroTitle
      class="self-stretch"
      :title="categoryName"
    />

    <div class="flex-1 border border-red-400 grid grid-cols-2 gap-1 sm:grid-cols-4 ">
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