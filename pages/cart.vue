<script lang="ts" setup>
import  { useProductStore }  from '@/stores/product'
const { cartItems } = useProductStore()

const deliveryFee = 90
const summaryItems = computed(() => {
	const productSubTotal = cartItems.reduce((accumulator, currentItem) => {
				return accumulator + (currentItem.price * currentItem.count)
	}, 0)

	return [
		{
			title: '商品金額',
			fee: productSubTotal
		},
		{
			title: '運費',
			fee: deliveryFee
		},
		{
			title: '總計',
			fee: productSubTotal + deliveryFee
		}
	]
})

function handleCount(currentCount: number, productId: string) {
	cartItems.some((item, index) => {
		if (item.id === productId) {
			cartItems[index].count = currentCount
			return true
		}
		return false
	})
}

function removeItem(productId: string) {
	const index = cartItems.findIndex(item => item.id === productId)
	cartItems.splice(index, 1)
}

</script>
<template>
	<NuxtLayout>
		<div class="flex-1 flex flex-col items-center p-4">
			<h1>Cart</h1>
			<h1>{{ cartItems }}</h1>

			<div class="overflow-x-auto">
				<table class="table">
					<!-- head -->
					<thead>
						<tr class="text-center">
							<th>品項</th>
							<th>數量</th>
							<th>小計</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						<tr v-for="item in cartItems" :key="item.id">
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar">
										<div class="mask mask-squircle w-16 h-16">
											<UnLazyImage class="object-cover" :blurhash="`L6PZfSi_.AyE_3t7t7R**0o#DgR4`" :src="item.imageUrl" />
										</div>
									</div>
									<div>
										<div class="font-bold">{{ item.name }}</div>
									</div>
								</div>
							</td>
							<td>
								<Counter
									:init-count="item.count"
									:product-id="item.id"
									:button-styles="'btn-xs'"
									@count="handleCount"
								/>
							</td>
							<td>$ {{ item.count * item.price }}</td>
							<td>
								<Icon class="cursor-pointer mb-1" name="akar-icons:trash-can" size="18" color="#3D72C7"
									@click="removeItem(item.id)"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<ul class="border border-red-400 w-3/5">
				<li class="border-b border-dotted border-gray-500 py-2 flex justify-between"
					v-for="item in summaryItems" :key="item.title"
				>
					<span class="pl-48">{{ item.title }}:</span>
					<span class="text-red-500">$ {{ item.fee }}</span>
				</li>
			</ul>

		</div>
	</NuxtLayout>
</template>