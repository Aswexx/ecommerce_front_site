<script lang="ts" setup>
import  { useProductStore }  from '@/stores/product'
const { productId } = useRoute().params
// TODO: make pinia state persist
// TODO: fix server side 500 error when page reload
const { products, addToCart } = useProductStore()
const product = products.find(p => p.id === productId) as Product

const count = ref(1)

function handleCount(numOfProduct: number) {
	count.value = numOfProduct
}

function addProductToCart() {
	useToast('alert-success', `已新增 ${product.name} ${count.value} 個至購物車`)
	addToCart({
		id: product.id,
		name: product.name,
		price: product.price,
		imageUrl: product.imageUrl,
		stock: product.stock,
		count: count.value
	})
}

function addToCartThenNavToCart() {
	addToCart({
		id: product.id,
		name: product.name,
		price: product.price,
		imageUrl: product.imageUrl,
		stock: product.stock,
		count: count.value
	})

	navigateTo('/cart')
}
</script>

<template>
	<div class="flex flex-col sm:flex-row">
		<UnLazyImage class="mx-auto sm:mx-5 w-1/2 aspect-[4/3] object-cover self-start" :blurhash="`L6PZfSi_.AyE_3t7t7R**0o#DgR4`" :src="product.imageUrl" />
		
		<div class="flex-1 sm:flex-auto flex flex-col justify-between">
			<div class="pt-5 pb-5 sm:pt-0">
				<h1 class="text-2xl">{{ product.name }}</h1>
				<span class="text-xl text-color-primary font-bold">${{ product.price }}</span>
			</div>

			<p class="p-4 border-t-2 border-dotted border-gray">{{ product.description }}</p>

			<ul class="flex-1">
				<li class="italic" v-for="feature in product.features" :key="feature">- {{ feature }}</li>
			</ul>

			<div class="flex-1 flex justify-center items-center space-x-5">
				<span>數量</span>
				<Counter
					:initCount="1"
					:maxCount="product.stock"
					:productId="product.id"
					@count="handleCount"
				/>
				<span class="text-gray-500 font-bold">還剩 {{ product.stock }} 件</span>
			</div>

			<div class="flex justify-center space-x-4">
				<button class="btn btn-primary" @click="addProductToCart">
					<Icon class="cursor-pointer mr-2" name="ph:shopping-cart-simple" size="32" color="#C3AE8B" />加入購物車
				</button>
				<button class="btn" @click="addToCartThenNavToCart">立即結帳</button>
			</div>
		</div>

	</div>
</template>
