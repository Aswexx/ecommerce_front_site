<script lang="ts" setup>
import { useProductStore } from '@/stores/product'
const { addToCart } = useProductStore()

const user = useSupabaseUser()
const { product } = defineProps<{ product: Product, featureIcon: boolean }>()
function showDetail(productId: string) {
	alert('hello')
	navigateTo(`/shops/${productId}`)
}

async function addToFav() {
	if (!user.value) {
		console.log(user.value)
		return alert('請先登入')
	} 

	const favoriteRelation = {
		userId: user.value.id,
		productId: product.id
	}

	await useFetch('/api/favorites', {
		method: 'post',
		body: favoriteRelation
	})

	alert('加到最愛')
}

// function addToCart() {
// 	alert('加到購物車')
// }

</script>


<template>
	<div
		class="group mb-10 flex cursor-pointer flex-col items-center justify-center
			hover:translate-y-[-10px] transition duration-300
		"
		@click="showDetail(product.id)"
	>
		<div class="relative">
			<UnLazyImage class="mx-5 w-[150px] h-[150px] object-cover" :blurhash="`L6PZfSi_.AyE_3t7t7R**0o#DgR4`" :src="product.imageUrl" />
			<div v-if="featureIcon" class="w-full flex items-center justify-center absolute bottom-0 opacity-0 group-hover:opacity-100">
				<span class="bg-color-primary px-2" @click.stop="addToFav">
					<Icon class="cursor-pointer" name="material-symbols:heart-plus-outline" size="32" color="#C3AE8B" />
				</span>
				<span class="bg-color-primary px-2" @click.stop="addToCart({
					id: product.id,
					name: product.name,
					price: product.price,
					imageUrl: product.imageUrl,
					stock: product.stock,
					count: 1
				})">
					<Icon class="cursor-pointer" name="ph:shopping-cart-simple" size="32" color="#C3AE8B" />
				</span>
			</div>
		</div>
		<h2>{{ product.name }}</h2>
		<p>${{ product.price }}</p>
	</div>
</template>