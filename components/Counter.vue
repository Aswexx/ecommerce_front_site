<script lang="ts" setup>
const emits = defineEmits(['count'])
const { initCount, productId, buttonStyles, maxCount } = defineProps<{
	initCount: number,
	maxCount: number
	productId: string,
	buttonStyles?: string
}>()
const count = ref(initCount)
function changeCurrentNum(numToAdd: number) {
	if ((count.value < 2 && numToAdd < 0) || (maxCount <= count.value && numToAdd > 0)) return
	count.value += numToAdd
	emits('count', count.value, productId)
}

</script>

<template>
	<div>
		<button class="btn" :class="buttonStyles" @click="changeCurrentNum(-1)">-</button>
		<span class="px-5">{{ count }}</span>
		<button class="btn" :class="buttonStyles" @click="changeCurrentNum(1)">+</button>
	</div>
</template>
