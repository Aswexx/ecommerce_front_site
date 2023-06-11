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

const deliveryInfo = reactive({
	email: '',
	name: '',
	phone: '',
	city: '',
	address: ''
})

function checkOut() {
	console.log('checkout', deliveryInfo)
	// validate delivery information
	const deliveryInfoToSubmit = {
		email: deliveryInfo.email,
		name: deliveryInfo.name,
		phone: deliveryInfo.phone,
		address: `${deliveryInfo.city}${deliveryInfo.address}`
	}

	// const { error } = useDataValidate('delivery', deliveryInfoToSubmit)

	// if (error) {
	// 	console.log('xx', error)
	// 	return
	// }

	const order = {
		...deliveryInfoToSubmit,
		contents: cartItems.map(item => {
			return {
				name: item.name,
				count: item.count
			}
		}),
		total: summaryItems.value[2].fee
	}

	console.log('order', order)

	// create order
}

function handleCitySelect(selectedCity: string) {
	deliveryInfo.city = selectedCity
}

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
			<!-- table -->
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
						<!-- row -->
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

			<!-- summary -->
			<ul class="border border-red-400 w-3/5">
				<li class="border-b border-dotted border-gray-500 py-2 flex justify-between"
					v-for="item in summaryItems" :key="item.title"
				>
					<span class="pl-48">{{ item.title }}:</span>
					<span class="text-red-500">$ {{ item.fee }}</span>
				</li>
			</ul>

			<!-- delivery info -->
			<div class="w-full">
				<h2 class="border-b border-black">商品收件資訊</h2>
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">Email</span>
					</label>
					<input type="text" placeholder="輸入訂單資訊收件email" 
						class="input input-bordered input-primary input-sm w-full max-w-xs"
						v-model="deliveryInfo.email"
					/>

					<label class="label">
						<span class="label-text">收件人姓名</span>
					</label>
					<input type="text" placeholder="輸入收件人姓名" 
						class="input input-bordered input-sm w-full max-w-xs"
						v-model="deliveryInfo.name"
					/>

					<label class="label">
						<span class="label-text">聯絡手機</span>
					</label>
					<input type="text" placeholder="輸入收件人聯絡手機" 
						class="input input-bordered input-sm w-full max-w-xs"
						v-model="deliveryInfo.phone"
					/>

					<label class="label">
						<span class="label-text">地址</span>
					</label>
					<CitySelect @city-select="handleCitySelect"/>
					<input type="text" placeholder="輸入收件地址" 
						class="input input-bordered input-sm w-full max-w-xs"
						v-model="deliveryInfo.address"
					/>
				</div>
			</div>

			<button class="btn btn-primary" @click="checkOut">送出訂單</button>

		</div>
	</NuxtLayout>
</template>