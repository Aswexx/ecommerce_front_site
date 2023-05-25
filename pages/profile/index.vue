<script lang="ts" setup>
const user = useSupabaseUser()

</script>

<template>
	<div>
		<h1>hello {{ user?.user_metadata.full_name }}</h1>
	</div>
</template>