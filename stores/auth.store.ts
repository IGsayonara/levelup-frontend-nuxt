import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNuxtApp, useRequestHeaders, useCookie } from '#app'
import type { User } from '~/types/user'

export const useAuthStore = defineStore('AuthStore', () => {
  const { $api } = useNuxtApp()
  const headers = import.meta.server ? useRequestHeaders() : null

  // Use `useCookie` for reactive cookie handling
  const accessToken = import.meta.server
    ? ref(headers?.cookie?.split('; ').find(c => c.startsWith('accessToken='))?.split('=')[1])
    : useCookie('accessToken')
  const refreshToken = import.meta.server
    ? ref(headers?.cookie?.split('; ').find(c => c.startsWith('refreshToken='))?.split('=')[1])
    : useCookie('refreshToken')

  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const isAuthenticated = computed(() => !!user.value)

  const setAccessToken = (token?: string) => {
    accessToken.value = token || ''
    $api.setSecurityData({ token }) // Update the API instance with the token
  }

  const setRefreshToken = (token?: string) => {
    refreshToken.value = token || ''
  }

  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await $api.auth.authControllerLogin({
        username,
        password,
      }).then(r => r.data)

      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)
      await getSession()
    }
    catch (error) {
      console.error('Login failed:', error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const refreshTokens = async () => {
    try {
      isLoading.value = true
      $api.setSecurityData({ token: refreshToken.value })

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await $api.auth.authControllerRefreshTokens()
        .then(r => r.data)

      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)
    }
    catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  const getSession = async () => {
    try {
      isLoading.value = true
      user.value = await $api.users.userControllerFindCurrent().then(r => r.data)
    }
    catch (error) {
      console.error('Fetching session failed:', error)
      user.value = null
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    setAccessToken(undefined)
    setRefreshToken(undefined)
    user.value = null
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    accessToken,
    refreshToken,
    login,
    refreshTokens,
    getSession,
    logout,
    setUser,
  }
})
