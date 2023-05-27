import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
	const viewportWidth = ref(0)
  return { viewportWidth }
})
