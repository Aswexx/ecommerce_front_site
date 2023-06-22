<script setup lang="ts">
const { message } = defineProps<{
	message: {
		id: string
		imageUrl: string
		createdAt: Date
		title: string
		content: string
	}
}>()

const showingDate = computed(() => {
	const date = new Date(message.createdAt)
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	return `${month}.${day}`
})
</script>

<template>
	<div class="w-4/5 flex flex-col sm:flex-row justify-between cursor-pointer
		hover:shadow-lg hover:scale-95 transition duration-500">
		<UnLazyImage class="w-full aspect-video sm:w-1/5 sm:aspect-square object-cover rounded-md" :blurhash="`L6PZfSi_.AyE_3t7t7R**0o#DgR4`" 
			:src="`${message.imageUrl}`" />
		<div class="flex flex-col justify-center items-center p-4 pr-0">
			<div class="text-2xl mb-2">{{ new Date(message.createdAt).getFullYear() }}</div>
			<div class="bg-black text-white text-center w-24">
				{{ showingDate }}
			</div>
		</div>
		<div class="p-4">
			<h1 class="text-primary font-bold text-lg mb-2">{{ message.title }}</h1>
			<p class="text-sm">{{ message.content }}</p>
		</div>
	</div>
</template>