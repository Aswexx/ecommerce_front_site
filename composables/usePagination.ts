export default function usePagination(products: any[]) {
	const NUM_PER_PAGE = 12
	const currentPageNum = ref(1)
  const pagedProducts = computed(() => {
    return products.slice(
      (currentPageNum.value - 1) * NUM_PER_PAGE,
      currentPageNum.value * NUM_PER_PAGE
    )
  })
  const numOfPages = computed(() => {
    return Math.ceil(products.length / NUM_PER_PAGE)
  })
  return { currentPageNum, pagedProducts, numOfPages }
}
