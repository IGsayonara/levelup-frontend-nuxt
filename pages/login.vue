<template>
  <div class="login">
    <section class="container">
      <SectionTitle title="Login" />
      <div class="row">
        <div class="col-12 col-md-6">
          <form @submit.prevent="login(username, password)">
            <AppInput
              id="loginUsernameInput"
              v-model="username"
              label="Username"
              placeholder="Username"
            />
            <AppInput
              id="loginPasswordInput"
              v-model="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <AppButton
              class="login-button"
              type="submit"
              :loading="isLoading"
            >
              Log In
            </AppButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth.store'
import SectionTitle from '~/components/common/SectionTitle/index.vue'

definePageMeta({
  layout: 'noheader',
})

const router = useRouter()
const authStore = useAuthStore()
const { login } = authStore
const { user, isLoading } = storeToRefs(authStore)

const username = ref('')
const password = ref('')

console.log(!!user.value)

const unwatch = watch(() => !!user.value, () => {
  if (user.value) {
    router.push('/')
  }
})
onUnmounted(() => {
  unwatch()
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh
}

form {
  display: flex;
  flex-direction: column;

  & > * {
    margin: 2rem 0;
  }

  .login-button {
    width: 50%;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }
}
</style>
