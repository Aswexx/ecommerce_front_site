<script lang="ts" setup>
const user = useSupabaseUser()
</script>

<template>
	<div class="w-3/5">
		<Hero
			:title="`Hello, ${user?.user_metadata.full_name}`"
			:content="''"
			:img-url="`https://source.unsplash.com/5Ne6mMQtIdo`"
			:height="'h-[30vh]'"
		/>
	</div>
</template>