<script setup lang="ts">
const userId = useSupabaseUser().value?.id
const { data, error } = await useFetch(`/api/favorites/${userId}`)

if (error.value) {
	throw createError({
		...error.value,
		statusMessage: 'fail to fetch favProducts data'
	})
}

const favProducts = data.value?.map(d => {
	return {
		...d.product
	}
})
</script>

<template>
	<div class="h-[60vh] overflow-auto">
		<div class="border border-red-400 grid grid-cols-2 gap-4 sm:grid-cols-4 ">
			<ProductCard v-for="product in favProducts" :key="product.id" :product="product" :feature-icon="false"/>
		</div>
	</div>
</template>