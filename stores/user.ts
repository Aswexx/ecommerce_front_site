import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
	const user = useSupabaseUser()
	const viewportWidth = ref(0)
	watch(
    () => user.value?.id,
    (newVal) => {
      if (newVal) {
        upsertUser()
      }
    }
  )

  const interactAlerts = reactive<{ type: string, content: string}[]>([
  ])

  watch(interactAlerts, (newVal) => {
    if (newVal.length) {
      setTimeout(() => {
        interactAlerts.shift()
      }, 2000)
    }
  })


  async function upsertUser() {
    const userInfo = await useFetch('/api/users', {
      method: 'post',
      body: {
        userId: user.value?.id,
        email: user.value?.email
      }
    })
  }

  return { viewportWidth, user, interactAlerts }
})
