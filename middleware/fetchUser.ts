export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  if (!userStore.user) {
    await userStore.fetchUser('noffirl')
  }
})
