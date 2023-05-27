<script setup lang="ts">
const product = {
	id: '22',
	categoryId: '11',
	name: 'test',
	imageUrl: 'https://source.unsplash.com/kID9sxbJ3BQ',
	price: 39,
	stock: 10,
	isPopular: true,
	features: ['aa','bb','cc']
}

</script>

<template>
	<div class="h-[60vh] overflow-auto">
		<div class="border border-red-400 grid grid-cols-2 gap-4 sm:grid-cols-4 ">
			<ProductCard v-for="n in 9" :key="n" :product="product" :feature-icon="false"/>
		</div>
	</div>
</template>