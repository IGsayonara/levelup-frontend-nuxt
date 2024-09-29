export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.env.SSR) {
    return
  }

  const userStore = useUserStore()
  await userStore.fetchUser('noffirl')
})
