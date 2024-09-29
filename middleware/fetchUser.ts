import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.env.SSR) {
    return
  }

  const userStore = useUserStore()
  await userStore.fetchUser('noffirl')
})
