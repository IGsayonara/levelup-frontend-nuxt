import { AuthUtil } from '~/utils/api/auth.util'

const authUtil = new AuthUtil()

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.env.SSR) {
    return
  }

  const authStore = useAuthStore()
  const { getSession, refreshTokens } = authStore

  try {
    if (!authUtil.getAccessToken()) {
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
