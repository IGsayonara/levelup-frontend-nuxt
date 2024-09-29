import type { User } from '~/types/user'
import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useUserStore = defineStore('UserStore', () => {
  const user = ref<User | null>(null)

  const fetchUser = async (username: string) => {
    try {
      user.value = await userUtil.fetchUser(username)
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
