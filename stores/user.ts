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

  async function upsertUser() {
    const userInfo = await useFetch('/api/users', {
      method: 'post',
      body: {
        userId: user.value?.id,
        email: user.value?.email
      }
    })
    console.log(userInfo)
  }

  return { viewportWidth, user }
})
