<script lang="ts" setup>
const user = useSupabaseUser()

onMounted(async () => {
	alert('profile')
})
</script>

<template>
	<div>
		<h1>hello {{ user?.user_metadata.full_name }}</h1>
	</div>
</template>