<script lang="ts" setup>
const userId = useSupabaseUser().value?.id
const { data: orders, error } = await useFetch<Order[]>(`/api/orders/${userId}`)
</script>

<template>
  <div class="w-4/5">
    <OrderTable
      :orders="orders || []"
    />
  </div>
</template>