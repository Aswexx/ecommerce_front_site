<script lang="ts" setup>
definePageMeta({
	middleware: ['auth']
})

</script>
<template>
	<NuxtLayout>
		<div class="flex-1 flex flex-col items-center p-4">
			<div class="border-b-2 border-black flex justify-center w-[70%]">
				
				<div class="w-[10%] h-[1px]"></div>
				<Nuxt-link to="/profile/orders" class="border-2 border-black border-b-0 bg-[#F1EDEF] rounded-tl-lg px-4 py-1" active-class="nav-active">訂單紀錄</Nuxt-link>
				<Nuxt-link to="/profile/setting" class="border-black border-t-2 bg-[#F1EDEF] px-4 py-1" active-class="nav-active">資料修改</Nuxt-link>
				<Nuxt-link to="/profile/favorites" class="border-2 border-black border-b-0 rounded-tr-lg bg-[#F1EDEF] px-4 py-1" active-class="nav-active">喜愛商品</Nuxt-link>
				<div class="w-[10%] h-[1px]"></div>
				
			</div>
			<NuxtPage class="p-4"/>
		</div>
	</NuxtLayout>
</template>