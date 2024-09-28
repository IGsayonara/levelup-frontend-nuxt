import { defineStore } from 'pinia'
import type { User } from '~/types/user'
import { AuthUtil } from '~/utils/api/auth.util'

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref<User | null>()
  const isLoading = ref(false)
  const isAuthenticated = computed(() => !!user.value)

  const authUtil = new AuthUtil()

  const getSession = async (): User => {
    try {
      isLoading.value = true
      user.value = await authUtil.fetchSession()
    }
    catch {
      user.value = null
    }
    finally {
      isLoading.value = false
    }
  }

  const refreshTokens = async () => {
    try {
      isLoading.value = true
      await authUtil.refreshTokens()
    }
    catch (error) {
      console.log(error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true
      await authUtil.login(username, password)
      await getSession()
    }
    catch (error) {
      console.log(error)
      throw (error)
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    user.value = null
    await authUtil.logout()
  }

  return {
    isAuthenticated, user, getSession, refreshTokens, login, logout, isLoading,
  }
})
