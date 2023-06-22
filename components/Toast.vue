<script lang="ts" setup>
import  { useUserStore }  from '@/stores/user'
const { interactAlerts } = useUserStore()
</script>

<template>
  <div class="toast toast-end toast-middle">
    <div v-for="alert in interactAlerts" :key="alert.content" 
      class="alert bg-[#F1EDEF] text-[#9E7E4A]" :class="alert.type"
    >
      <Icon 
        v-if="alert.type === 'alert-success'"
        name="ic:twotone-check-circle-outline" size="24" color="#24d317"
      />

      <Icon
        v-else-if="alert.type === 'alert-error'"
        name="radix-icons:cross-circled" size="24" color="#a60717"
      />

      <Icon
        v-else-if="alert.type === 'alert-info'"
        name="bi:exclamation-circle" size="24" color="#1136ee"
      />

      <span>{{ alert.content }}</span>
    </div>
  </div>
</template>