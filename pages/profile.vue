<script lang="ts" setup>

</script>
<template>
	<NuxtLayout>
		<div class="flex-1 flex flex-col items-center p-4">
			<div class="border-b-2 border-black flex justify-center w-[70%]">
				
				<div class="w-[10%] h-[1px]"></div>
				<Nuxt-link to="/profile/orders" class="border-2 border-black border-b-0 rounded-tl-lg px-4 py-1" active-class="bg-active-color text-white">訂單紀錄</Nuxt-link>
				<Nuxt-link to="/profile/setting" class="border-black border-t-2 px-4 py-1" active-class="bg-active-color text-white">資料修改</Nuxt-link>
				<Nuxt-link to="/profile/favorites" class="border-2 border-black border-b-0 rounded-tr-lg px-4 py-1" active-class="bg-active-color text-white">喜愛商品</Nuxt-link>
				<div class="w-[32px] h-[1px]"></div>
				
			</div>
			<NuxtPage class="p-4"/>
		</div>
	</NuxtLayout>
</template>