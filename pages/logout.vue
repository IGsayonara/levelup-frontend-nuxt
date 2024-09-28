<template>
  <div />
</template>

<script setup lang="ts">
const { logout } = useAuthStore()
const router = useRouter()

onMounted(async () => {
  await logout()
  await router.push('/login')
})
</script>

<style scoped lang="scss">

</style>
