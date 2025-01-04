export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { getSession, refreshTokens, accessToken } = authStore

  try {
    if (!accessToken) {
      if (to.name !== 'login') {
        return '/login'
      }
      return
    }

    await refreshTokens()
    await getSession()

    if (to.name === 'login') {
      return '/'
    }
  }
  catch (error) {
    console.error('Authentication check failed', error)
    if (to.name !== 'login') {
      return '/login'
    }
  }
})
