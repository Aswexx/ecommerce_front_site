<script lang="ts" setup>
const { data: categories } = await useFetch<{id: string, name: string}[]>('/api/categories')

const mappedCategories = categories.value?.map(c => {
  return {
    name: c.name,
    route: `/shops/${c.id}-${c.name}`
  }
})

const tabs = [
	{
    name: '全部',
    route: '/shops'
	},
	{
    name: '最新',
    route: '/shops/newest'
  },
  ...mappedCategories!
]

const tabListStyles = {
  tabList: `border border-green-400 text-[#675a53] flex flex-row justify-center sticky
    top-0 z-20 bg-[#F1EDEF]
    sm:flex-col sm:self-start sm:static sm:bg-transparent`,
  tab: 'p-1 text-xs transition duration-500 hover:bg-[#4d1939] hover:text-[#ffffff] sm:p-4 sm-flex-col sm:text-base'
}


</script>
<template>
	<NuxtLayout>
		<div class="border border-red-400 flex-1 flex flex-col sm:flex-row">
			<NavTabs :tabs="tabs" :styles="tabListStyles"/>
			<NuxtPage class="p-4 flex-1"/>
		</div>
	</NuxtLayout>
</template>