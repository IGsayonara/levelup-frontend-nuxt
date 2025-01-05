import type { User } from '~/types/user'
import { useNuxtApp } from '#app'

export const useUserStore = defineStore('UserStore', () => {
  const { $api } = useNuxtApp()
  const user = ref<User | null>(null)

  const fetchUser = async (username: string) => {
    try {
      user.value = await $api.users.userControllerFindOne(username).then(r => r.data)
    }
    catch {
      user.value = null
    }
  }

  return {
    user,
    fetchUser,
  }
})
