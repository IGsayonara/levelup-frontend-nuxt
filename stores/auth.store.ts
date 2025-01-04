import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useNuxtApp } from '#app'
import type { User } from '~/types/user'

export const useAuthStore = defineStore('AuthStore', () => {
  const { $api } = useNuxtApp() // Get the `api` instance from the plugin
  const user = ref<User | null>(null) // User state
  const isLoading = ref(false) // Loading state for async actions
  const accessToken = ref<string | undefined>(Cookies.get('accessToken')) // Access token from cookies
  const refreshToken = ref<string | undefined>(Cookies.get('refreshToken')) // Refresh token from cookies
  const isAuthenticated = computed(() => !!user.value) // Check if the user is authenticated

  // Set access token in state and cookies
  const setAccessToken = (token?: string) => {
    accessToken.value = token
    Cookies.set('accessToken', token || '')
    $api.setSecurityData({ token }) // Update the API instance with the token
  }

  // Set refresh token in state and cookies
  const setRefreshToken = (token?: string) => {
    refreshToken.value = token
    Cookies.set('refreshToken', token || '')
  }

  // Login function to authenticate user
  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await $api.auth.authControllerLogin({
        username,
        password,
      }).then(r => r.data)

      setAccessToken(newAccessToken) // Set the new access token
      setRefreshToken(newRefreshToken) // Set the new refresh token
      await getSession() // Fetch session details after login
    }
    catch (error) {
      console.error('Login failed:', error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  // Refresh the access and refresh tokens
  const refreshTokens = async () => {
    try {
      isLoading.value = true
      $api.setSecurityData({ token: refreshToken.value }) // Set the refresh token in the API

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await $api.auth.authControllerRefreshTokens()
        .then(r => r.data)

      setAccessToken(newAccessToken) // Set the new access token
      setRefreshToken(newRefreshToken) // Set the new refresh token
    }
    catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  // Fetch the current user's session
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

  // Logout the user and clear tokens
  const logout = async () => {
    setAccessToken(undefined) // Clear the access token
    setRefreshToken(undefined) // Clear the refresh token
    user.value = null // Clear the user state
  }

  // Set the user state manually
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
